import { Pass } from '../types';
import { frequencies } from '../data';

const getDateTime = (timestamp: number) => {
  const dateTime = new Date(timestamp * 1000).toLocaleString().split(' ');
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
      <h1>{id === 'ISS' ? 'International Space Station' : id}</h1>
      <div className="pass-data__info">
        Downlink: <em>{frequencies[id]} MHz</em>
      </div>

      <h2>Next passes</h2>
      <div className="scroll-wrapper">
        <table>
          <thead>
            <tr>
              <th colSpan={3}>Start</th>
              <th className="first" colSpan={4}>Apogee</th>
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
              <tr key={index}>
                <td>{getDateTime(passage.startUTC)[0]}</td>
                <td>{getDateTime(passage.startUTC)[1]}</td>
                <td>{passage.startAzCompass} {passage.startAz}°</td>

                <td className="first">{getDateTime(passage.maxUTC)[0]}</td>
                <td>{getDateTime(passage.maxUTC)[1]}</td>
                <td>{passage.maxAzCompass} {passage.maxAz}°</td>
                <td>{passage.maxEl}°</td>

                <td className="first">{getDateTime(passage.endUTC)[0]}</td>
                <td>{getDateTime(passage.endUTC)[1]}</td>
                <td>{passage.endAzCompass} {passage.endAz}°</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { PassData };
