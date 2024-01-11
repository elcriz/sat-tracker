import { Fragment } from 'react';
import { Pass } from '../types';
import { downlinkData } from '../data';
import { getDateTime, getDurationMinutesSeconds, roundAzimuth } from '../utils';
import { Tracker } from './Tracker';

interface PassDataProps {
  id: string;
  data: Pass[];
  onSelect?: (id: string) => void;
  isVisible: boolean;
}

function PassData({ id, data, onSelect, isVisible }: PassDataProps) {
  const isAll = id === 'all';

  return (
    <div className={`pass-data${isVisible ? '' : ' is-hidden'}`}>
      <h1>
        {isAll ? 'All receivable satellites' : id}
      </h1>

      <Tracker
        id={id}
        passes={data}
        onSelect={onSelect}
      />

      {!isAll && (
        <div className="pass-data__info">
          <dl>
            {Object.keys(downlinkData[id]).map((key, index) => (
              <Fragment key={index}>
                <dt>{key.charAt(0).toUpperCase() + key.slice(1)}</dt><dd>{downlinkData[id][key]}</dd>
              </Fragment>
            ))}
          </dl>
        </div>
      )}

      <h2>{isAll ? 'First upcoming passes' : 'Next passes'} <span>Scroll for more data &rarr;</span></h2>
      <div className="scroll-wrapper">
        <table>
          <thead>
            <tr>
              {isAll && <th />}
              <th className={isAll ? 'first' : undefined} colSpan={3}>Start</th>
              <th className="first" colSpan={4}>Maximum altitude</th>
              <th className="first" colSpan={3}>End</th>
              <th className="first">Totals</th>
            </tr>
            <tr>
              {isAll && <th>Satellite</th>}
              <th className={isAll ? 'first' : undefined}>Date</th>
              <th>Time</th>
              <th>Azimuth</th>

              <th className="first">Date</th>
              <th>Time</th>
              <th>Azimuth</th>
              <th>Elevation</th>

              <th className="first">Date</th>
              <th>Time</th>
              <th>Azimuth</th>

              <th className="first">Duration</th>
            </tr>
          </thead>
          <tbody>
            {data.map((passage, index) => (
              <tr key={index} data-today={getDateTime(passage.startUTC)[0] === 'Today' || undefined}>
                {isAll && onSelect && (
                  <td
                    className="heading"
                    onClick={() => onSelect(passage.id || 'all')}
                    role="button"
                  >
                    {passage.id}
                  </td>
                )}
                <td className={isAll ? 'first' : undefined}>{getDateTime(passage.startUTC)[0]}</td>
                <td>{getDateTime(passage.startUTC)[1]}</td>
                <td><span>{passage.startAzCompass}</span>&nbsp;{roundAzimuth(passage.startAz)}°</td>

                <td className="first">{getDateTime(passage.maxUTC)[0]}</td>
                <td>{getDateTime(passage.maxUTC)[1]}</td>
                <td><span>{passage.maxAzCompass}</span>&nbsp;{roundAzimuth(passage.maxAz)}°</td>
                <td>{passage.maxEl}°</td>

                <td className="first">{getDateTime(passage.endUTC)[0]}</td>
                <td>{getDateTime(passage.endUTC)[1]}</td>
                <td><span>{passage.endAzCompass}</span>&nbsp;{roundAzimuth(passage.endAz)}°</td>

                <td className="first">{getDurationMinutesSeconds(passage.startUTC, passage.endUTC)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { PassData };
