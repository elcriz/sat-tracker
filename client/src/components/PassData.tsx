import { Pass } from '../types';
import { frequencies } from '../data';

const today = new Date(Date.now()).toLocaleDateString();

const getDateTime = (timestamp: number) => {
  const dateTime = new Date(timestamp * 1000).toLocaleString().split(' ');
  if (dateTime[0] === today) {
    return ['Today', dateTime[1]];
  }
  return dateTime;
};

interface PassDataProps {
  id: string;
  data: Pass[];
  isVisible: boolean;
}

function PassData({ id, data, isVisible }: PassDataProps) {
  return (
    <div className={`pass-data${isVisible ? '' : ' is-hidden'}`}>
      <h1>{id === 'ISS' ? 'International Space Station (ISS)' : id}</h1>
      <div className="pass-data__info">
        Downlink: <em>{frequencies[id]} MHz</em>
      </div>

      <h2>Next passes <span>Scroll to see more &rarr;</span></h2>
      <div className="scroll-wrapper">
        <table>
          <thead>
            <tr>
              <th colSpan={3}>Start</th>
              <th className="first" colSpan={4}>Maximum altitude</th>
              <th className="first" colSpan={3}>End</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { PassData };
