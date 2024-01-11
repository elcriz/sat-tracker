import { useEffect, useState } from 'react';
import { Pass } from '../types';
import { getPercentage, getDateTime, roundAzimuth, getNow } from '../utils';

interface TrackerProps {
  id: string;
  passes: Pass[];
  onSelect?: (id: string) => void;
}

function Tracker({ id, passes, onSelect }: TrackerProps) {
  const [currentPass, setCurrentPass] = useState<Pass>();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = getNow();

      // Find the current most pass
      const found = passes.find((pass) => {
        return (now >= pass.startUTC) && (now <= pass.endUTC);
      });

      // Calculate passage progress, if applicable
      setProgress(found
        ? getPercentage((now - found.startUTC), (found.endUTC - found.startUTC))
        : 0
      );

      setCurrentPass(found);
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [passes]);

  console.log({ passes, id });

  if (!currentPass || progress === 0) {
    return (
      <div
        className="tracker is-hidden"
        aria-hidden="true"
      />
    );
  }

  return (
    <div className="tracker">
      <div className="tracker__inner">
        {currentPass.id && onSelect ? (
          <h3 onClick={() => onSelect(currentPass.id || 'all')}>{currentPass.id} is currently passing</h3>
        ) : (
          <h3>Current pass at <span>{progress}%</span></h3>
        )}
        <div className="tracker__data-box">
          <ul className="tracker__data tracker__data--start">
            <li>{getDateTime(currentPass.startUTC)[1]}</li>
            <li><span>{currentPass.startAzCompass}</span> {roundAzimuth(currentPass.startAz)}°</li>
          </ul>
          <ul className="tracker__data tracker__data--max">
            <li>{currentPass.maxEl}°</li>
            <li><span>{currentPass.maxAzCompass}</span> {roundAzimuth(currentPass.maxAz)}°</li>
          </ul>
          <ul className="tracker__data tracker__data--end">
            <li>{getDateTime(currentPass.endUTC)[1]}</li>
            <li><span>{currentPass.endAzCompass}</span> {roundAzimuth(currentPass.endAz)}°</li>
          </ul>
        </div>
        <div
          role="progressbar"
          title="Passage progress"
          className="tracker__progress-bar"
          style={{ width: `${progress}%` }}
          aria-valuemin={0}
          aria-valuenow={progress}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

export { Tracker };
