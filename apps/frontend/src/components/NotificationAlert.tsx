"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bell } from "lucide-react";

interface NotificationAlertProps {
  notification: string | null;
}

export function NotificationAlert({ notification }: NotificationAlertProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsOpen(true);
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <TooltipProvider>
      <Tooltip open={isOpen}>
        <TooltipTrigger asChild>
          <AnimatePresence>
            {notification && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed bottom-4 right-4 z-50"
              >
                <Bell className="h-6 w-6 text-primary cursor-pointer" />
              </motion.div>
            )}
          </AnimatePresence>
        </TooltipTrigger>
        <TooltipContent side="left" align="end">
          <p>{notification}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
