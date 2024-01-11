export function getDateTime(timestamp: number) {
  const today = new Date(Date.now()).toLocaleDateString('nl-NL');
  const dateTime = new Date(timestamp * 1000).toLocaleString('nl-NL').split(' ');

  if (dateTime[0] === today) {
    return ['Today', dateTime[1]];
  }
  return dateTime;
}

export function getDurationMinutesSeconds(startTimestamp: number, endTimestamp: number) {
  const duration = endTimestamp - startTimestamp;
  const minutes = Math.floor(duration / 60);
  const seconds = parseInt(((duration % 60) / 1).toFixed(0));

  return seconds === 60
    ? `${minutes + 1} m`
    : `${minutes} m ${seconds} s`;
}

export function roundAzimuth(azimuth: string | number) {
  return Math.round(typeof azimuth === 'number' ? azimuth : parseInt(azimuth));
}

export function getPercentage(x: number, y: number, fixed?: number): number {
  return Number(((x / y) * 100).toFixed(fixed));
}

export function getNow(): number {
  return Math.round(Date.now() / 1000);
}
