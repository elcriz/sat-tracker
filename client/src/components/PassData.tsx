import { Pass } from '../types';
import { frequencies } from '../data';

const getDateTime = (timestamp: number) => {
  const today = new Date(Date.now()).toLocaleDateString('nl-NL');
  const dateTime = new Date(timestamp * 1000).toLocaleString('nl-NL').split(' ');

  if (dateTime[0] === today) {
    return ['Today', dateTime[1]];
  }
  return dateTime;
};

const getDurationMinutesSeconds = (startTimestamp: number, endTimestamp: number) => {
  const duration = endTimestamp - startTimestamp;
  const minutes = Math.floor(duration / 60);
  const seconds = parseInt(((duration % 60) / 1).toFixed(0));

  return seconds === 60
    ? `${minutes + 1} m`
    : `${minutes} m ${seconds} s`;
};

interface PassDataProps {
  id: string;
  data: Pass[];
  isVisible: boolean;
}

function PassData({ id, data, isVisible }: PassDataProps) {
  const downlinks = Array.isArray(frequencies[id])
    ? frequencies[id].toString().replace(',', ' MHz, ')
    : frequencies[id];

  return (
    <div className={`pass-data${isVisible ? '' : ' is-hidden'}`}>
      <h1>{id === 'ISS' ? 'International Space Station (ISS)' : id}</h1>
      <div className="pass-data__info">
        Downlink: <em>{downlinks} MHz</em>
      </div>

      <h2>Next passes <span>Scroll to see more &rarr;</span></h2>
      <div className="scroll-wrapper">
        <table>
          <thead>
            <tr>
              <th colSpan={3}>Start</th>
              <th className="first" colSpan={4}>Maximum altitude</th>
              <th className="first" colSpan={3}>End</th>
              <th className="first">Totals</th>
            </tr>
            <tr>
              <th>Date</th>
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
                <td>{getDateTime(passage.startUTC)[0]}</td>
                <td>{getDateTime(passage.startUTC)[1]}</td>
                <td><span>{passage.startAzCompass}</span>&nbsp;{passage.startAz}°</td>

                <td className="first">{getDateTime(passage.maxUTC)[0]}</td>
                <td>{getDateTime(passage.maxUTC)[1]}</td>
                <td><span>{passage.maxAzCompass}</span>&nbsp;{passage.maxAz}°</td>
                <td>{passage.maxEl}°</td>

                <td className="first">{getDateTime(passage.endUTC)[0]}</td>
                <td>{getDateTime(passage.endUTC)[1]}</td>
                <td><span>{passage.endAzCompass}</span>&nbsp;{passage.endAz}°</td>

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
