type Pass = {
  id?: string;
  startAz: number;
  startAzCompass: string;
  startUTC: number;
  maxAz: number;
  maxAzCompass: string;
  maxEl: number;
  maxUTC: number;
  endAz: number;
  endAzCompass: string;
  endUTC: number;
};

type Passes = {
  'NOAA 19': Pass[];
  'NOAA 15': Pass[];
  'NOAA 18': Pass[];
};

type Position = {
  latitude: number;
  longitude: number;
};

export type { Pass, Passes, Position };
