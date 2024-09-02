import { Metadata } from "next";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
  title: "Earthquakes | Dashboard",
  description: "View and manage earthquake data",
};

export default function EarthquakesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="">{children}</div>;
}
