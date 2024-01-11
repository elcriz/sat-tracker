import { ChangeEvent, useEffect, useState } from 'react';
import { PassData } from './PassData';
import { Passes, Pass } from '../types';
import { satellites } from '../data';
import { getNow } from '../utils';

interface OverviewProps {
  passes: Passes | undefined;
}

function Overview({ passes }: OverviewProps) {
  const [upcoming, setUpcoming] = useState<Pass[]>();
  const [current, setCurrent] = useState<string>('all');

  useEffect(() => {
    if (passes) {
      const allSorted: Pass[] = Object.keys(passes)
        .map(id => ({ id, ...passes[id as keyof Passes]

          // Filter out passes from the past
          .filter(pass => pass.endUTC >= getNow())[0],
        }))
        .sort((a, b) => a.startUTC - b.startUTC);
      setUpcoming(allSorted);
    }
  }, [passes]);

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrent(event.target.value);
  };

  if (!passes || !upcoming) {
    return (
      <div className="no-results">
        No satellite data was found...
      </div>
    );
  }

  return (
    <div className="overview">
      <div className="select">
        <select title="Select an object" value={current} onChange={handleSelect}>
          <option>Please select an object:</option>
          <option value="all">All satellites</option>
          {Object.keys(satellites).map((id) => (
            <option value={id}>{id}</option>
          ))}
        </select>
      </div>
      {upcoming && (
        <PassData
          id="all"
          data={upcoming}
          onSelect={setCurrent}
          isVisible={current === 'all'}
        />
      )}
      {Object.keys(passes).map((id) => (
        <PassData
          key={id}
          id={id}
          data={passes[id as keyof Passes].filter(pass => pass.endUTC >= getNow())}
          isVisible={current === id}
        />
      ))}
      <span className="source">
        Created by: <a href="https://christiaanhemerik.com/" target="_blank">Christiaan Hemerik</a> | Data source: <a href="https://www.n2yo.com/" target="_blank">N2YO.com</a><br />
        All shown times are local. Passes are fetched using the last known position. If you don't see any passes, try to refetch below. A refetch is done automatically if the last fetch was over 24 hours ago.
      </span>
    </div>
  );
}

export { Overview };
