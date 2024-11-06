"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CircleAlert, CircleCheck, Info } from "lucide-react";
import { cn } from "@/lib/utils";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Log = {
  id: string;
  status: "SUCCESS" | "INFO" | "ERROR";
  timestamp: string;
  message: string;
};

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const columns: ColumnDef<Log>[] = [
  {
    accessorKey: "status",
    header: "Stato",
    cell: ({ row }) => {
      const status: string = capitalizeFirstLetter(row.getValue("status"));
      const icon =
        row.getValue("status") === "SUCCESS" ? (
          <CircleCheck className="h-4 stroke-3" />
        ) : row.getValue("status") === "INFO" ? (
          <Info className="h-4 stroke-3" />
        ) : (
          <CircleAlert className="h-4 stroke-3" />
        );
      const color: string =
        row.getValue("status") === "SUCCESS"
          ? "dark:text-green-400 text-green-600"
          : row.getValue("status") === "INFO"
          ? "dark:text-blue-400 text-blue-600"
          : "dark:text-red-400 text-gree-600";
      return (
        <div className={cn("flex flex-row gap-2 items-center", color)}>
          {icon} {status}
        </div>
      );
    },
  },
  {
    accessorKey: "timestamp",
    header: () => <div className="text-left">Data</div>,
    cell: ({ row }) => {
      const time: string = row.getValue("timestamp");
      return <div className="text-left font-medium">{time}</div>;
    },
  },
  {
    accessorKey: "message",
    header: "Log",
    cell: ({ row }) => {
      return (
        <div className="max-w-[500px] truncate font-medium">
          {row.getValue("message")}
        </div>
      );
    },
  },
];
