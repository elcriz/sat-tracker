import { useEffect, useState } from 'react';
import { Pass } from '../types';
import { getPercentage, getDateTime, roundAzimuth } from '../utils';

interface TrackerProps {
  passes: Pass[];
  id: string;
}

function Tracker({ passes, id }: TrackerProps) {
  const [currentPass, setCurrentPass] = useState<Pass>();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Math.round(Date.now() / 1000);

      // Find the current most pass
      const found = passes.find((pass) => {
        return (now >= pass.startUTC) && (now <= pass.endUTC);
      });

      // Calculate passage progress, if applicable
      if (found) {
        setProgress(getPercentage(
          (now - found.startUTC), (found.endUTC - found.startUTC)
        ));
      }

      setCurrentPass(found);
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [passes]);

  useEffect(() => {
    if (progress < 0 || progress > 100) {
      setCurrentPass(undefined);
    }
  }, [progress])

  if (!currentPass) {
    return null;
  }

  return (
    <div className="tracker">
      <div className="tracker__inner">
        <h3>Current pass: {id && id !== 'all' ? id : ''} <span>{progress}%</span></h3>
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
