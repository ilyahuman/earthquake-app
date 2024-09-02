import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Earthquake } from "@/types";
import { getMagnitudeColor } from "@/lib/earthquakeUtils";

interface EarthquakeListProps {
  earthquakes: Earthquake[];
  selectedEarthquake: Earthquake | null;
  onSelectEarthquake: (earthquake: Earthquake) => void;
}

export function EarthquakeList({
  earthquakes,
  selectedEarthquake,
  onSelectEarthquake,
}: EarthquakeListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-6rem)]">
      <AnimatePresence>
        {earthquakes.map((earthquake) => (
          <motion.div
            key={earthquake.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className={`mb-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                selectedEarthquake?.id === earthquake.id ? "border-primary" : ""
              }`}
              onClick={() => onSelectEarthquake(earthquake)}
            >
              <CardContent className="p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-sm">
                      {earthquake.location}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {earthquake.dateTime}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={`${getMagnitudeColor(earthquake.magnitude)}`}
                    >
                      {earthquake.magnitude.toFixed(1)}
                    </Badge>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {earthquake.magType}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </ScrollArea>
  );
}
