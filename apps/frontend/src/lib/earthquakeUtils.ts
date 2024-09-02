export const getMagnitudeColor = (magnitude: number): string => {
  if (magnitude < 2) return "bg-green-500 text-white";
  if (magnitude < 4) return "bg-yellow-500 text-black";
  if (magnitude < 6) return "bg-orange-500 text-white";
  return "bg-red-500 text-white";
};

export const formatDateTime = (dateTime: string): string => {
  const date = new Date(dateTime);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });
};
