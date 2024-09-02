import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPinIcon,
  RulerIcon,
  ActivityIcon,
  BuildingIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import { Earthquake } from "@/types";
import { getMagnitudeColor } from "@/lib/earthquakeUtils";
import { EarthquakeMap } from "./EarthquakeMap";
import { MagnitudeChart, DepthChart, SourceChart } from "./Charts";
import { GET_EARTHQUAKE_DETAILS } from "@/apollo/queries";

interface EarthquakeDetailsProps {
  earthquakeId: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function EarthquakeDetails({
  earthquakeId,
  onEdit,
  onDelete,
}: EarthquakeDetailsProps) {
  const { loading, error, data, refetch } = useQuery(GET_EARTHQUAKE_DETAILS, {
    variables: { id: parseInt(earthquakeId) },
  });

  useEffect(() => {
    refetch();
  }, [earthquakeId, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const earthquake: Earthquake = data.getEarthquake;

  const timeOfDayMagnitude = JSON.parse(earthquake.timeOfDayMagnitude!);
  const depthRangeCount = JSON.parse(earthquake.depthRangeCount!);
  const earthquakeSourceCount = JSON.parse(earthquake.earthquakeSourceCount!);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{earthquake.location}</CardTitle>
        <CardDescription>{earthquake.dateTime}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center">
            <MapPinIcon className="mr-2 h-4 w-4" />
            <span className="text-sm">
              Lat: {earthquake.latitude?.toFixed(4)}, Long:{" "}
              {earthquake.longitude?.toFixed(4)!}
            </span>
          </div>
          <div className="flex items-center">
            <RulerIcon className="mr-2 h-4 w-4" />
            <span className="text-sm">
              Depth: {earthquake.depth?.toFixed(2)} km
            </span>
          </div>
          <div className="flex items-center">
            <ActivityIcon className="mr-2 h-4 w-4" />
            <span className="text-sm">
              Magnitude:
              <Badge
                className={`${getMagnitudeColor(earthquake.magnitude)} ml-1`}
              >
                {earthquake.magnitude.toFixed(1)}
              </Badge>
              ({earthquake.magType})
            </span>
          </div>
          <div className="flex items-center">
            <BuildingIcon className="mr-2 h-4 w-4" />
            <span className="text-sm">Stations: {earthquake.nbStations}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div>Gap: {earthquake.gap?.toFixed(2)}°</div>
          <div>Distance: {earthquake.distance?.toFixed(2)} km</div>
          <div>RMS: {earthquake.rms?.toFixed(3)}</div>
          <div>Source: {earthquake.source}</div>
        </div>
        <Tabs defaultValue="map" className="w-full">
          <TabsList>
            <TabsTrigger value="map">Map</TabsTrigger>
            <TabsTrigger value="magnitude">Magnitude Over Time</TabsTrigger>
            <TabsTrigger value="depth">Depth Distribution</TabsTrigger>
            <TabsTrigger value="source">Earthquakes by Source</TabsTrigger>
          </TabsList>
          <TabsContent value="map">
            <EarthquakeMap
              latitude={earthquake.latitude!}
              longitude={earthquake.longitude!}
            />
          </TabsContent>
          <TabsContent value="magnitude">
            <MagnitudeChart data={timeOfDayMagnitude} />
          </TabsContent>
          <TabsContent value="depth">
            <DepthChart data={depthRangeCount} />
          </TabsContent>
          <TabsContent value="source">
            <SourceChart data={earthquakeSourceCount} />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={onEdit} className="mr-2">
          <PencilIcon className="mr-2 h-4 w-4" /> Edit
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          <TrashIcon className="mr-2 h-4 w-4" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
