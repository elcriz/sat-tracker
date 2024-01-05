import { useState, useEffect, useRef } from 'react';
import { ApiKeyForm } from './components/ApiKeyForm';
import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';
import { Overview } from './components/Overview';
import { satellites, cacheTimeout, config } from './data';
import { Pass, Passes, Position } from './types';

function App() {
  const [position, setPosition] = useState<Position>();
  const [passes, setPasses] = useState<Passes>();
  const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey'));
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const dataFetch = useRef(false);
  const hasGeolocation = 'geolocation' in navigator;

  const storeDefaultPosition = () => {
    const { latitude, longitude } = config.observer;
    setPosition({ latitude, longitude });
  };

  // Try to receive user's position from device and/or browser
  if (hasGeolocation) {
    navigator.geolocation.getCurrentPosition((devicePosition) => {
      const { latitude, longitude } = devicePosition.coords;
      setPosition({ latitude, longitude });
    }, (geolocationError) => {
      storeDefaultPosition();
      console.error(geolocationError);
    });
  }

  if (!hasGeolocation) {
    storeDefaultPosition();
  }

  useEffect(() => {
    if (dataFetch.current) {
      return;
    }

    if (apiKey && position) {
      const cache = localStorage.getItem('cache');
      const storedPassages = localStorage.getItem('data');
      const isExpired = !cache || cache && Date.now() - parseInt(cache) > cacheTimeout;

      // Fetch radio passes for a single satellite
      const fetchPasses = async (satelliteId: number): Promise<Pass[]> => {
        const { altitude, minElevation } = config.observer;
        const { latitude, longitude } = position;

        // Retrieve data
        const response = await fetch(
          `/api/satellites?satelliteId=${satelliteId}&latitude=${latitude}&longitude=${longitude}&altitude=${altitude}&minElevation=${minElevation}&apiKey=${apiKey}`
        );

        if (!response.ok) {
          throw `Fetching for satellite ${satelliteId} failed...`;
        }

        return await response.json() || [];
      };

      if (!isExpired && storedPassages) {
        setPasses(JSON.parse(storedPassages));
        return;
      }

      setIsLoading(true);
      const fetches = Object.values(satellites).map(satelliteId => fetchPasses(satelliteId));
      Promise.all(fetches).then((results) => {

        // Format data for all satellites
        const data =  Object.keys(satellites)
          .reduce((previous, current, index) => ({
            ...previous,
              [current]: results[index],
          }), {} as Passes);

        // Save data
        setPasses(data);

        // Store for simple caching
        localStorage.setItem('data', JSON.stringify(data));
        localStorage.setItem('cache', Date.now().toString());
      })
      .catch((error) => {
        setError(error);
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

      dataFetch.current = true;
    }
  }, [apiKey, position]);

  const handleChangeApiKey = (value: string) => {
    localStorage.setItem('apiKey', value);
    setApiKey(value);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all api data?')) {
      localStorage.removeItem('data');
      localStorage.removeItem('cache');
      localStorage.removeItem('apiKey');
      location.reload();
    }
  };

  const handleRefetch = () => {
    if (confirm('Are you sure you want to refetch data?')) {
      localStorage.removeItem('data');
      localStorage.removeItem('cache');
      location.reload();
    }
  };

  if (!apiKey) {
    return <ApiKeyForm onChange={handleChangeApiKey} />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <main>
      <Header>
        {position && (
          <div>
            {hasGeolocation ? 'Device (GPS)' : 'Default'} last position used:<br />
            <em>lat. {position.latitude}</em> <em>lon. {position.longitude}</em>
          </div>
        )}
      </Header>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <Overview passes={passes} />
          <div className="reset">
            <button onClick={handleRefetch}>
              Refetch passes
            </button>
            <button onClick={handleReset}>
              Reset api
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export { App };
