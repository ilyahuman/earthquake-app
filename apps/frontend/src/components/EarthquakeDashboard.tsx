"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { EarthquakeList } from "./EarthquakeList";
import { EarthquakeDetails } from "./EarthquakeDetails";
import { EarthquakeForm } from "./EarthquakeForm";
import { NotificationAlert } from "./NotificationAlert";
import { Earthquake } from "@/types";
import {
  GET_EARTHQUAKES_LIST,
  EARTHQUAKE_ADDED,
  DELETE_EARTHQUAKE,
} from "@/apollo/queries";

export function EarthquakeDashboard() {
  const [selectedEarthquake, setSelectedEarthquake] =
    useState<Earthquake | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const { loading, error, data, refetch } = useQuery(GET_EARTHQUAKES_LIST);
  const [deleteEarthquake] = useMutation(DELETE_EARTHQUAKE, {
    update(cache, { data: { deleteEarthquake } }) {
      const existingEarthquakes = cache.readQuery<{
        getEarthquakes: Earthquake[];
      }>({ query: GET_EARTHQUAKES_LIST });
      if (existingEarthquakes) {
        cache.writeQuery({
          query: GET_EARTHQUAKES_LIST,
          data: {
            getEarthquakes: existingEarthquakes.getEarthquakes.filter(
              (eq) => eq.id !== deleteEarthquake,
            ),
          },
        });
      }
    },
  });

  useSubscription(EARTHQUAKE_ADDED, {
    onData: ({ data }) => {
      setNotification("New earthquake data received");
      refetch();
    },
  });

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSelectEarthquake = (earthquake: Earthquake) => {
    setSelectedEarthquake(earthquake);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    if (selectedEarthquake?.id) {
      try {
        await deleteEarthquake({
          variables: { id: parseInt(selectedEarthquake.id) },
        });
        setSelectedEarthquake(null);
        setNotification("Earthquake deleted successfully");
        refetch();
      } catch (error) {
        setNotification("Error deleting earthquake");
      }
    }
  };

  const handleAddNew = () => {
    setSelectedEarthquake(null);
    setIsEditing(true);
  };

  const handleFormSubmitSuccess = () => {
    setIsEditing(false);
    setNotification(
      selectedEarthquake
        ? "Earthquake updated successfully"
        : "New earthquake added successfully",
    );
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-1/3 p-4 border-r border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Earthquakes</h2>
          <Button onClick={handleAddNew} size="sm">
            Add New
          </Button>
        </div>
        <EarthquakeList
          earthquakes={data.getEarthquakes}
          selectedEarthquake={selectedEarthquake}
          onSelectEarthquake={handleSelectEarthquake}
        />
      </div>
      <div className="w-2/3 p-4">
        {selectedEarthquake && !isEditing ? (
          <EarthquakeDetails
            earthquakeId={selectedEarthquake.id!}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <EarthquakeForm
            earthquake={isEditing ? selectedEarthquake : null}
            onSubmitSuccess={handleFormSubmitSuccess}
          />
        )}
      </div>
      <NotificationAlert notification={notification} />
    </div>
  );
}
