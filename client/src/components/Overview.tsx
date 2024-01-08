import { useEffect, useState } from 'react';
import { PassData } from './PassData';
import { Passes, Pass } from '../types';
import { satellites } from '../data';

interface OverviewProps {
  passes: Passes | undefined;
}

function Overview({ passes }: OverviewProps) {
  const [upcoming, setUpcoming] = useState<Pass[]>();
  const [current, setCurrent] = useState<string>('all');

  useEffect(() => {
    if (passes) {
      const allSorted: Pass[] = Object.keys(passes)
        .map(id => ({ id, ...passes[id as keyof Passes][0] }))
        .sort((a, b) => a.startUTC - b.startUTC);
      setUpcoming(allSorted);
    }
  }, [passes]);

  if (!passes || !upcoming) {
    return (
      <div className="no-results">
        No satellite data was found...
      </div>
    );
  }

  return (
    <div className="overview">
      <nav>
        <button
          className={current === 'all' ? 'is-current' : undefined}
          onClick={() => setCurrent('all')}
          disabled={!upcoming}
        >
          All
        </button>
        {Object.keys(satellites).map((id) => (
          <button
            key={id}
            className={id === current ? 'is-current' : undefined}
            onClick={() => setCurrent(id)}
          >
            {id}
          </button>
        ))}
      </nav>
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
          data={passes[id as keyof Passes]}
          isVisible={current === id}
        />
      ))}
      <span className="source">
        Created by: <a href="https://christiaanhemerik.com/" target="_blank">Christiaan Hemerik</a> | Source: <a href="https://www.n2yo.com/" target="_blank">N2YO.com</a>
      </span>
    </div>
  );
}

export { Overview };
