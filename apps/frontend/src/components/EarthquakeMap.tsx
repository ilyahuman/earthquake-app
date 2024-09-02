import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface EarthquakeMapProps {
  latitude: number;
  longitude: number;
}

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

export function EarthquakeMap({ latitude, longitude }: EarthquakeMapProps) {
  return (
    <div className="h-[300px] w-full">
      <LoadScript googleMapsApiKey="AIzaSyBuaxuJHg-G0-T7nxQivRzaMcvu05YuxX4">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{ lat: latitude, lng: longitude }}
          zoom={8}
        >
          <Marker position={{ lat: latitude, lng: longitude }} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
