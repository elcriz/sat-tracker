const satellites = {
  ISS: 25544,
  'NOAA 19': 33591,
  'NOAA 15': 25338,
  'NOAA 18': 28654,
};

type Frequencies = {
  [key: string]: number | number[];
}

const frequencies: Frequencies = {
  'NOAA 19': 137.100,
  'NOAA 15': 137.620,
  'NOAA 18': 137.9125,
  ISS: 145.800,
};

const cacheTimeout = 86400000; // 24 hours

const config = {
  observer: {
    altitude: 10,
    latitude: 52.66, // @NOTE Defaults to Coevorden, Netherlands
    longitude: 6.74, // @NOTE Defaults to Coevorden, Netherlands
    minElevation: 70,
  },
};

export { satellites, frequencies, cacheTimeout, config };
