import { gql } from "@apollo/client";

export const GET_EARTHQUAKES_LIST = gql`
  query GetEarthquakesList {
    getEarthquakes {
      id
      dateTime
      location
      magnitude
      magType
    }
  }
`;

export const GET_EARTHQUAKE_DETAILS = gql`
  query GetEarthquakeDetail($id: Int!) {
    getEarthquake(id: $id) {
      id
      dateTime
      latitude
      longitude
      depth
      magnitude
      location
      magType
      nbStations
      gap
      distance
      rms
      source
      timeOfDayMagnitude
      depthRangeCount
      earthquakeSourceCount
    }
  }
`;

export const EARTHQUAKE_ADDED = gql`
  subscription OnEarthquakeAdded {
    earthquakeAdded {
      id
      dateTime
      latitude
      longitude
      depth
      magnitude
      location
      magType
      nbStations
      gap
      distance
      rms
      source
    }
  }
`;

export const EARTHQUAKE_UPDATED = gql`
  subscription OnEarthquakeUpdated {
    earthquakeUpdated {
      id
      dateTime
      latitude
      longitude
      depth
      magnitude
      location
      magType
      nbStations
      gap
      distance
      rms
      source
    }
  }
`;

export const CREATE_EARTHQUAKE = gql`
  mutation CreateEarthquake($input: CreateEarthquakeInput!) {
    createEarthquake(input: $input) {
      dateTime
      latitude
      longitude
      depth
      magnitude
      location
      magType
      nbStations
      gap
      distance
      rms
      source
    }
  }
`;

export const UPDATE_EARTHQUAKE = gql`
  mutation UpdateEarthquake($id: Int!, $input: UpdateEarthquakeInput!) {
    updateEarthquake(id: $id, input: $input) {
      id
      dateTime
      latitude
      longitude
      depth
      magnitude
      location
      magType
      nbStations
      gap
      distance
      rms
      source
    }
  }
`;

export const DELETE_EARTHQUAKE = gql`
  mutation DeleteEarthquake($id: Int!) {
    deleteEarthquake(id: $id)
  }
`;
