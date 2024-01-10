const cacheTimeout = 86400000; // 24 hours

const config = {
  observer: {
    altitude: 10,
    latitude: 52.66, // @NOTE Defaults to Coevorden, Netherlands
    longitude: 6.74, // @NOTE Defaults to Coevorden, Netherlands
    minElevation: 60,
  },
};

const satellites = {
  ISS: 25544,
  'NOAA 19': 33591,
  'NOAA 15': 25338,
  'NOAA 18': 28654,
  'METOP-B': 38771,
};

const downlinkData: {
  [key: string]: {
    [key: string]: string | number | string[] | number[]
  };
} = {
  'ISS': {
    frequencies: '145.800 MHz',
  },
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
  'METOP-B': {
    frequency: '137.100 MHz',
    service: 'LRPT',
    bandwith: '150 kHz',
    'data rate': '72 kbps'
  }
};

export { satellites, downlinkData, cacheTimeout, config };
