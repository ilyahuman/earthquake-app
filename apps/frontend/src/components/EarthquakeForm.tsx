"use client";

import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Earthquake } from "@/types";
import {
  CREATE_EARTHQUAKE,
  UPDATE_EARTHQUAKE,
  GET_EARTHQUAKES_LIST,
} from "@/apollo/queries";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface EarthquakeFormProps {
  earthquake: Earthquake | null;
  onSubmitSuccess: () => void;
}

export function EarthquakeForm({
  earthquake,
  onSubmitSuccess,
}: EarthquakeFormProps) {
  const [formData, setFormData] = useState<Earthquake>({
    dateTime: "",
    latitude: 0,
    longitude: 0,
    depth: 0,
    magnitude: 0,
    magType: "",
    nbStations: 0,
    gap: 0,
    distance: 0,
    rms: 0,
    source: "",
    eventID: "",
    location: "",
  });
  const [date, setDate] = useState<Date | undefined>(undefined);

  const [createEarthquake] = useMutation(CREATE_EARTHQUAKE, {
    update(cache, { data: { createEarthquake } }) {
      const existingEarthquakes = cache.readQuery<{
        getEarthquakes: Earthquake[];
      }>({ query: GET_EARTHQUAKES_LIST });
      if (existingEarthquakes) {
        cache.writeQuery({
          query: GET_EARTHQUAKES_LIST,
          data: {
            getEarthquakes: [
              ...existingEarthquakes.getEarthquakes,
              createEarthquake,
            ],
          },
        });
      }
    },
  });

  const [updateEarthquake] = useMutation(UPDATE_EARTHQUAKE, {
    update(cache, { data: { updateEarthquake } }) {
      const existingEarthquakes = cache.readQuery<{
        getEarthquakes: Earthquake[];
      }>({ query: GET_EARTHQUAKES_LIST });
      if (existingEarthquakes) {
        cache.writeQuery({
          query: GET_EARTHQUAKES_LIST,
          data: {
            getEarthquakes: existingEarthquakes.getEarthquakes.map((eq) =>
              eq.id === updateEarthquake.id ? updateEarthquake : eq,
            ),
          },
        });
      }
    },
  });

  useEffect(() => {
    if (earthquake) {
      setFormData(earthquake);
      setDate(new Date(earthquake.dateTime));
    }
  }, [earthquake]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const input = {
        ...formData,
        dateTime: date ? date.toISOString() : "",
        magnitude: Number(formData.magnitude),
      };
      if (earthquake) {
        await updateEarthquake({
          variables: {
            id: parseInt(earthquake.id!),
            input,
          },
        });
      } else {
        await createEarthquake({
          variables: {
            input,
          },
        });
      }
      onSubmitSuccess();
    } catch (error) {
      console.error("Error submitting earthquake data:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {earthquake ? "Edit Earthquake" : "Add New Earthquake"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateTime">Date & Time (required)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, "PPP HH:mm:ss")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                  <div className="p-3 border-t">
                    <Input
                      type="time"
                      step="1"
                      value={date ? format(date, "HH:mm:ss") : ""}
                      onChange={(e) => {
                        const [hours, minutes, seconds] =
                          e.target.value.split(":");
                        const newDate = new Date(date || new Date());
                        newDate.setHours(
                          parseInt(hours),
                          parseInt(minutes),
                          parseInt(seconds),
                        );
                        setDate(newDate);
                      }}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location (required)</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="magnitude">Magnitude (required)</Label>
              <Input
                id="magnitude"
                name="magnitude"
                type="number"
                step="1"
                value={formData.magnitude}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                name="latitude"
                type="number"
                step="0.000001"
                value={formData.latitude}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                name="longitude"
                type="number"
                step="0.000001"
                value={formData.longitude}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="depth">Depth (km)</Label>
              <Input
                id="depth"
                name="depth"
                type="number"
                step="0.1"
                value={formData.depth}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="magType">Magnitude Type</Label>
              <Input
                id="magType"
                name="magType"
                value={formData.magType}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nbStations">Number of Stations</Label>
              <Input
                id="nbStations"
                name="nbStations"
                type="number"
                value={formData.nbStations}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gap">Gap (degrees)</Label>
              <Input
                id="gap"
                name="gap"
                type="number"
                step="0.1"
                value={formData.gap}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="distance">Distance (km)</Label>
              <Input
                id="distance"
                name="distance"
                type="number"
                step="0.1"
                value={formData.distance}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rms">RMS</Label>
              <Input
                id="rms"
                name="rms"
                type="number"
                step="0.001"
                value={formData.rms}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Input
                id="source"
                name="source"
                value={formData.source}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventID">Event ID</Label>
              <Input
                id="eventID"
                name="eventID"
                value={formData.eventID}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <Button type="submit" className="mt-4">
            {earthquake ? "Save Changes" : "Add Earthquake"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
