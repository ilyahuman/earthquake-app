export type Earthquake = {
  dateTime: string;
  latitude?: number;
  longitude?: number;
  depth?: number;
  magnitude: number;
  magType?: string;
  nbStations?: number;
  gap?: number;
  distance?: number;
  rms?: number;
  source?: string;
  eventID?: string;
  id?: string;
  location: string;
  timeOfDayMagnitude?: string;
  depthRangeCount?: string;
  earthquakeSourceCount?: string;
};
