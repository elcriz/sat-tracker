import { useState } from 'react';
import { PassData } from './PassData';
import { Passes } from '../types';
import { satellites } from '../data';

interface OverviewProps {
  passes: Passes | undefined;
}

function Overview({ passes }: OverviewProps) {
  const [current, setCurrent] = useState<string>(Object.keys(satellites)[0]);

  if (!passes) {
    return (
      <div className="no-results">
        No satellite data was found...
      </div>
    );
  }

  return (
    <div className="overview">
      <nav>
        {Object.keys(satellites).map((id) => (
          <button
            key={id}
            onClick={() => setCurrent(id)}
            className={id === current ? 'is-current' : undefined}
          >
            {id}
          </button>
        ))}
      </nav>
      {Object.keys(passes).map((id) => (
        <PassData
          key={id}
          id={id}
          data={passes[id as keyof Passes]}
          isVisible={id === current}
        />
      ))}
      <span className="source">
        By: <a href="https://christiaanhemerik.com/" target="_blank">Christiaan Hemerik</a> | Source: <a href="https://www.n2yo.com/" target="_blank">N2YO.com</a>
      </span>
    </div>
  );
}

export { Overview };
