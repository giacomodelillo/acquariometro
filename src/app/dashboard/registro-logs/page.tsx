"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { supabase, useLogsState } from "@/app";

import PageContainer from "@/components/layout/page-container";
import { Log, columns } from "./components/columns";
import { CustomDataTable } from "@/components/DataTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CustomJsonViewer } from "@/components/JsonViewer";
import { Separator } from "@/components/ui/separator";
import { useSupabaseData } from "@/hooks/getSupabaseData";
function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // Use Intl.DateTimeFormat for a custom format
  return new Intl.DateTimeFormat("it-IT", {
    year: "numeric",
    month: "short", // e.g., October
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false, // Toggle for 12-hour format
    timeZoneName: "short", // Show time zone if needed
  }).format(date);
}

interface LogsDataObject {
  id: string;
  status: string;
  message: string;
  timestamp: string;
}

export default function RegistroLogs() {
  const { supabaseData, getSupabaseData } = useSupabaseData();
  const { setLogId, logID } = useLogsState();

  supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "ESP32" },
      (payload) => {
        console.log(payload);
        getSupabaseData();
      }
    )
    .subscribe();

  useEffect(() => {
    getSupabaseData();
  }, []);

  // const router = useRouter();
  const logsDatArray: LogsDataObject[] = supabaseData.map((obj) => ({
    id: obj.id,
    status: obj.logs[0].status,
    message: obj.logs[0].message,
    timestamp: formatDate(obj.created_at),
  }));

  const selectedJsonData = supabaseData
    ? supabaseData.find(
        (obj) =>
          obj.id === (logID.length === 0 ? setLogId(supabaseData[0].id) : logID)
      )
    : null;

  return (
    <PageContainer scrollable={false}>
      <div className="space-y-4">
        <div className="flex flex-col justify-between space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Registro Logs</h2>
          <p className="text-muted-foreground">
            Visualizza i log completi del dispositivo per tracciare eventi,
            errori e attività recenti.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 h-full">
          <div className="col-span-1">
            {logsDatArray ? (
              <CustomDataTable columns={columns} data={logsDatArray} />
            ) : (
              <p>Loading</p>
            )}
          </div>
          <div className="col-span-1">
            <Card className="drop-shadow-sm flex flex-col">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground font-medium font-mono uppercase">
                  Corpo risposta
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full flex flex-col gap-4">
                {selectedJsonData ? (
                  <>
                    <CustomJsonViewer
                      jsonData={selectedJsonData}
                      className="h-[37rem]"
                    />

                    <Separator />
                    <p className="text-sm text-muted-foreground font-medium font-mono uppercase">
                      Dettagli
                    </p>
                    <div className="flex flex-col gap-2">
                      <p className="text-muted-foreground text-sm flex gap-2">
                        Stato:
                        <code className="rounded bg-muted px-[0.3rem] font-mono text-sm">
                          {selectedJsonData.logs[0].status}
                        </code>
                      </p>
                      <p className="text-muted-foreground text-sm flex gap-2">
                        Creato:{" "}
                        <span className="text-foreground">
                          {formatDate(selectedJsonData.created_at)}
                        </span>
                      </p>
                      <p className="text-muted-foreground text-sm flex gap-2">
                        ID risposta:
                        <code className="rounded bg-muted px-[0.3rem] font-mono text-sm">
                          {selectedJsonData.id}
                        </code>
                      </p>
                    </div>
                  </>
                ) : (
                  <p>Loading</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}