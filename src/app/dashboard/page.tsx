"use client";
import { useEffect } from "react";

import {
  Wifi,
  Bluetooth,
  Database,
  Activity,
  CircleCheck,
  CircleAlert,
  CircleX,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import { CustomMultipleLineChart } from "@/components/LineCharts";

import PageContainer from "@/components/layout/page-container";
import { CustomRadialChart } from "@/components/radialChart";
import { CustomMultipleBarChart } from "@/components/BarCharts";
import { CustomRadarChart } from "@/components/RadarChart";
import { Separator } from "@/components/ui/separator";
import Esp32 from "@/components/SvgS";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/app";
import { useSupabaseData } from "@/hooks/getSupabaseData";
import { LoadingStateFull } from "@/components/LoadingState";
import { RandomEmoji, RandomWelcomePhrases } from "@/components/random-data";

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // Use Intl.DateTimeFormat for a custom format
  return new Intl.DateTimeFormat("it-IT", {
    year: "numeric",
    month: "short", // e.g., October
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
    hour12: false, // Toggle for 12-hour format
    // timeZoneName: "short", // Show time zone if needed
  }).format(date);
}

type GroupedDataByDay = { day: string; wifi: number; bluetooth: number };
type GroupedDataByExactTime = { time: string; wifi: number; bluetooth: number };

type RssiGroupedData = { id: number; wifi: number; bluetooth: number };
// Helper function to get day of the week in Italian
const getItalianDay = (date: Date): string => {
  const days = [
    "Lunedi",
    "Martedi",
    "Mercoledi",
    "Giovedi",
    "Venerdi",
    "Sabato",
    "Domenica",
  ];
  return days[date.getDay()];
};
// Helper function to map days of the week to sort order
const daySortOrder: Record<string, number> = {
  Lunedi: 0,
  Martedi: 1,
  Mercoledi: 2,
  Giovedi: 3,
  Venerdi: 4,
  Sabato: 5,
  Domenica: 6,
};

// Function to group by day
const groupByDay = (data: any[]): GroupedDataByDay[] => {
  const groupedByDay: Record<string, { wifi: number; bluetooth: number }> = {};

  data.forEach(({ devices }) => {
    const date = new Date(devices.timestamp);
    const day = getItalianDay(date);

    if (!groupedByDay[day]) groupedByDay[day] = { wifi: 0, bluetooth: 0 };
    groupedByDay[day].wifi += devices.wifi.length;
    groupedByDay[day].bluetooth += devices.bluetooth.length;
  });

  return Object.entries(groupedByDay)
    .map(([day, counts]) => ({
      day,
      ...counts,
    }))
    .sort((a, b) => daySortOrder[a.day] - daySortOrder[b.day]);
};
// Function to group by hour within the same day
const groupByExactTime = (data: any[]): GroupedDataByExactTime[] => {
  return data
    .map(({ devices }) => {
      const date = new Date(devices.timestamp);
      const formattedTime = `${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

      return {
        time: formattedTime,
        wifi: devices.wifi.length,
        bluetooth: devices.bluetooth.length,
      };
    })
    .sort((a, b) => (a.time > b.time ? -1 : 1)); // Sort in descending order by time
};
// Function to group RSSI values into paired objects, excluding entries with both values as 0
const groupByRssi = (data: any[]): RssiGroupedData[] => {
  const result: RssiGroupedData[] = [];
  let idCounter = 1;

  data.forEach(({ devices }) => {
    const wifiRssiValues = devices.wifi.map((device) => device.rssi);
    const bluetoothRssiValues = devices.bluetooth.map((device) => device.rssi);

    // Ensure even lengths by adding `0` if odd
    if (wifiRssiValues.length % 2 !== 0) wifiRssiValues.push(0);
    if (bluetoothRssiValues.length % 2 !== 0) bluetoothRssiValues.push(0);

    // Create pairs of Wi-Fi and Bluetooth RSSI values
    const maxLength = Math.max(
      wifiRssiValues.length,
      bluetoothRssiValues.length
    );
    for (let i = 0; i < maxLength; i++) {
      const wifiRssi = wifiRssiValues[i] || 0;
      const bluetoothRssi = bluetoothRssiValues[i] || 0;

      // Skip entries where both wifi and bluetooth are 0
      if (wifiRssi !== 0 || bluetoothRssi !== 0) {
        result.push({
          id: idCounter++,
          wifi: wifiRssi,
          bluetooth: bluetoothRssi,
        });
      }
    }
  });

  return result;
};

export default function Dashboard() {
  const { supabaseDataESP32, getSupabaseDataESP32 } = useSupabaseData();

  supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "ESP32" },
      (payload) => {
        console.log(payload);
        getSupabaseDataESP32();
      }
    )
    .subscribe();

  useEffect(() => {
    getSupabaseDataESP32();
  }, []);

  // Map through dataArray and sort the `devices` arrays for each item
  const sortedDataArray = supabaseDataESP32.map((item) => ({
    devices: {
      timestamp: item.created_at,
      wifi: [...item.devices.wifi].sort((a, b) => b.rssi - a.rssi), // Sort wifi by rssi descending
      bluetooth: [...item.devices.bluetooth].sort((a, b) => b.rssi - a.rssi), // Sort bluetooth by rssi descending
    },
  }));

  console.log(sortedDataArray);

  const byDay = groupByDay(sortedDataArray);
  const groupedByExactTime = groupByExactTime(sortedDataArray);
  const groupedByRssi = groupByRssi(sortedDataArray);

  console.log("Grouped by RSSI:", groupedByRssi);
  console.log(groupedByExactTime);
  console.log(byDay);

  const latest_data = supabaseDataESP32[0];
  const latest_data_date = latest_data
    ? formatDate(latest_data.created_at)
    : undefined;

  const total_device_wifi = latest_data
    ? latest_data.devices.wifi.length
    : null;
  const total_device_bluetooth = latest_data
    ? latest_data.devices.bluetooth.length
    : null;
  const latest_data_log_stauts = latest_data
    ? latest_data.logs[0]
      ? latest_data.logs[0].status
      : null
    : null;

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <div className="flex flex-col justify-between space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Monitora lo stato del dispositivo, visualizza i dati e controlla le
            connessioni in tempo reale.
          </p>
        </div>
        <div className="space-y-4 ">
          {supabaseDataESP32 ? (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Segnali Wifi
                    </CardTitle>
                    <Wifi className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {total_device_wifi}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {latest_data_date}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Dispositivi Bluetooth
                    </CardTitle>
                    <Bluetooth className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {total_device_bluetooth}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {latest_data_date}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Stato dispositivo
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold flex items-center gap-2">
                      {latest_data_log_stauts === "SUCCESS" ? (
                        <>
                          Attivo
                          <span className="flex h-4 w-4 rounded-full bg-green-500" />
                        </>
                      ) : (
                        <>
                          Errore
                          <span className="flex h-4 w-4 rounded-full bg-red-500" />
                        </>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {latest_data_date}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="italic h-full flex items-center p-4">
                    <div>
                      <RandomWelcomePhrases />
                      <span className="not-italic ms-2">
                        <RandomEmoji />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-8 max-h-min ">
                <div className="col-span-2 ">
                  <CustomRadialChart
                    title="Presenza attuale"
                    description="Valore percentuale"
                    lastUpdate={latest_data_date}
                  />
                </div>
                <div className="col-span-4 ">
                  <CustomMultipleLineChart
                    title="Andamento nel tempo"
                    description="Dispositivi rilevati nell'arco della giornata"
                    lastUpdate={latest_data_date}
                    chartData={groupedByExactTime}
                  />
                </div>
                <Card className="col-span-2 row-span-2 flex flex-col">
                  <CardHeader className="bg-muted">
                    <CardTitle className="flex flex-row">Dispositivo</CardTitle>
                    <CardDescription>Stato e condizioni ESP32</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pt-4">
                    <div className="aspect-auto relative h-[15rem] w-full mb-6 items-center ">
                      <Esp32 className="w-full h-full fill-black dark:fill-white " />
                    </div>
                    <div className="flex flex-col gap-4">
                      <p className="font-medium">Informazioni Tecniche</p>
                      <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                          <div className="flex felx-row items-center justify-between">
                            <div className="flex flex-row items-center gap-2">
                              <p className="text-muted-foreground text-sm">
                                Memoria Flash:
                              </p>
                              <p className="font-mono text-sm">5/16 MB</p>
                            </div>
                            <CircleCheck className="h-4" />
                          </div>
                          <Progress
                            value={5 * (100 / 16)}
                            markers={[12 * (100 / 16)]}
                            className={
                              5 < 12 - 2
                                ? "bg-green-500"
                                : 5 > 12
                                ? "bg-red-500"
                                : "bg-yellow-500"
                            }
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex felx-row items-center justify-between">
                            <div className="flex flex-row items-center gap-2">
                              <p className="text-muted-foreground text-sm">
                                Uso memoria:
                              </p>
                              <p className="font-mono text-sm">6/8 Mb</p>
                            </div>
                            <CircleAlert className="h-4" />
                          </div>
                          <Progress
                            value={6 * (100 / 8)}
                            markers={[7 * (100 / 8)]}
                            className={
                              6 < 8 - 2
                                ? "bg-green-500"
                                : 6 > 8
                                ? "bg-red-500"
                                : "bg-yellow-500"
                            }
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex felx-row items-center justify-between">
                            <div className="flex flex-row items-center gap-2">
                              <p className="text-muted-foreground text-sm">
                                Segnale RSSI:
                              </p>
                              <p className="font-mono text-sm">-70 dBm</p>
                            </div>
                            <CircleX className="h-4" />
                          </div>
                          <Progress
                            value={13 * (100 / 16)}
                            markers={[12 * (100 / 16)]}
                            className={
                              13 < 12 - 2
                                ? "bg-green-500"
                                : 13 > 12
                                ? "bg-red-500"
                                : "bg-yellow-500"
                            }
                          />
                        </div>
                      </div>
                      <Separator className="mt-4" />
                      <p className="font-medium">Firmware e codice</p>
                      <div className="flex flex-col gap-2">
                        <p className="text-muted-foreground text-sm flex gap-2">
                          Ultimo Firmware update: 2022-04-30
                        </p>
                        <p className="text-muted-foreground text-sm flex gap-2">
                          Ultima versione:{" "}
                          <code className="rounded bg-muted px-[0.3rem] font-mono text-sm">
                            v1.19.1
                          </code>
                        </p>
                        <p className="text-muted-foreground text-sm flex gap-2">
                          Ultimo Software update: 2022-04-30
                        </p>
                        <p className="text-muted-foreground text-sm flex gap-2">
                          Ultima versione:
                          <code className="rounded bg-muted px-[0.3rem] font-mono text-sm">
                            v0.1
                          </code>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                      Ultimo aggiornamento
                    </div>
                    <div className="leading-none text-muted-foreground">
                      {latest_data_date}
                    </div>
                  </CardFooter>
                  <Separator />
                </Card>
                <div className="col-span-4 ">
                  <CustomMultipleBarChart
                    title="Dispositivi rilevati"
                    description="Nell'arco della giornata"
                    lastUpdate={latest_data_date}
                    chartData={byDay}
                  />
                </div>
                <div className="col-span-2">
                  <CustomRadarChart
                    title="Valori RSSI"
                    description="Intesita dei segnali rilevati"
                    lastUpdate={latest_data_date}
                    chartData={groupedByRssi}
                  />
                </div>
              </div>
            </>
          ) : (
            <LoadingStateFull />
          )}
        </div>
      </div>
    </PageContainer>
  );
}
