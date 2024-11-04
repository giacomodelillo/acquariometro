"use client";

import JsonView from "@uiw/react-json-view";
import { ScrollArea } from "./ui/scroll-area";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const dark = {
  "--w-rjv-color": "#9cdcfe",
  "--w-rjv-key-number": "#737373",
  "--w-rjv-key-string": "#ffffffff",
  "--w-rjv-background-color": "",
  "--w-rjv-line-color": "#404040",
  "--w-rjv-arrow-color": "#838383",
  "--w-rjv-info-color": "#9c9c9c7a",
  "--w-rjv-curlybraces-color": "#d4d4d4ff",
  "--w-rjv-colon-color": "#d4d4d4",
  "--w-rjv-brackets-color": "#d4d4d4",
  "--w-rjv-ellipsis-color": "#a7f3d0",
  "--w-rjv-quotes-color": "#ffffff7a",
  "--w-rjv-quotes-string-color": "#6ee7b7",
  "--w-rjv-type-string-color": "#6ee7b7",
  "--w-rjv-type-int-color": "#84cc16",
  "--w-rjv-type-float-color": "#84cc16",
  "--w-rjv-type-bigint-color": "#84cc16",
  "--w-rjv-type-boolean-color": "#3b82f6",
  "--w-rjv-type-date-color": "#4ade80",
  "--w-rjv-type-url-color": "#3b89cf",
  "--w-rjv-type-null-color": "#fbbf24",
  "--w-rjv-type-nan-color": "#e11d48",
  "--w-rjv-type-undefined-color": "#fbbf24",
};
const light = {
  "--w-rjv-color": "#9cdcfe",
  "--w-rjv-key-number": "#737373",
  "--w-rjv-key-string": "#0a0a0a",
  "--w-rjv-background-color": "",
  "--w-rjv-line-color": "#e5e5e5",
  "--w-rjv-arrow-color": "#838383",
  "--w-rjv-info-color": "#9c9c9c",
  "--w-rjv-curlybraces-color": "#a3a3a3",
  "--w-rjv-colon-color": "#d4d4d4",
  "--w-rjv-brackets-color": "#a3a3a3",
  "--w-rjv-ellipsis-color": "#22c55e",
  "--w-rjv-quotes-color": "#0a0a0a7a",
  "--w-rjv-quotes-string-color": "#15803d",
  "--w-rjv-type-string-color": "#15803d",
  "--w-rjv-type-int-color": "#0d9488",
  "--w-rjv-type-float-color": "#0d9488",
  "--w-rjv-type-bigint-color": "#0d9488",
  "--w-rjv-type-boolean-color": "#3b82f6",
  "--w-rjv-type-date-color": "#4ade80",
  "--w-rjv-type-url-color": "#3b89cf",
  "--w-rjv-type-null-color": "#d97706",
  "--w-rjv-type-nan-color": "#e11d48",
  "--w-rjv-type-undefined-color": "#d97706",
};

export interface DeviceData {
  id: number;
  created_at: string; // ISO date string format
  devices: {
    wifi: {
      id: string;
      name: string;
      rssi: number;
      hidden: string; // Assuming hidden is a string that holds "false" or "true"
      channel: number;
    }[];
    bluetooth: {
      rssi: number;
      mac_address: string;
    }[];
  };
  logs: {
    status: string;
    message: string;
    timestamp: string; // Date and time in ISO format
  }[];
}

export function CustomJsonViewer({
  jsonData,
  className,
}: {
  className?: string;
  jsonData?: object;
}) {
  const { theme } = useTheme();
  return (
    <ScrollArea
      className={cn(
        "p-1 dark:bg-neutral-950/20 bg-muted/60 rounded-sm",
        className
      )}
    >
      <JsonView
        value={jsonData}
        style={theme === "light" ? light : dark}
        collapsed={3}
        shortenTextAfterLength={0}
        highlightUpdates={true}
        enableClipboard={false}
      />
    </ScrollArea>
  );
}
