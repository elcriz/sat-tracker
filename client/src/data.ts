const cacheTimeout = 86400000; // 24 hours

const config = {
  observer: {
    altitude: 10,
    latitude: 52.66, // @NOTE Defaults to Coevorden, Netherlands
    longitude: 6.74, // @NOTE Defaults to Coevorden, Netherlands
    minElevation: 50,
  },
};

const satellites = {
  'NOAA 19': 33591,
  'NOAA 15': 25338,
  'NOAA 18': 28654,
};

const downlinkData: {
  [key: string]: {
    [key: string]: string | number | string[] | number[]
  };
} = {
  'NOAA 15': {
    frequency: '137.620 MHz',
    service: 'NOAA APT',
    bandwith: '+/- 34 kHz',
  },
  'NOAA 18': {
    frequency: '137.9125 MHz',
    service: 'NOAA APT',
    bandwith: '+/- 34 kHz',
  },
  'NOAA 19': {
    frequency: '137.100 MHz',
    service: 'NOAA APT',
    bandwith: '+/- 34 kHz',
  },
};

export { satellites, downlinkData, cacheTimeout, config };
