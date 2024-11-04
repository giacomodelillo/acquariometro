"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  Wifi,
  Bluetooth,
  Database,
  Activity,
  CircleCheck,
  CircleAlert,
  CircleX,
  Router,
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

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const channels = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "ESP32" },
        (payload) => {
          console.log(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channels);
    };
  }, [supabase, router]);

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
        <div className="space-y-4">
          {/* ------ */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Segnali Wifi
                </CardTitle>
                <Wifi className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">10</div>
                <p className="text-xs text-muted-foreground">
                  Last update: 20:15
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
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  Last update: 20:15
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Database Load
                </CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">53kb</div>
                <p className="text-xs text-muted-foreground">
                  Last update: 20:15
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
                  Active{" "}
                  <span className="flex h-4 w-4 rounded-full bg-green-500" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Last update: 20:15
                </p>
              </CardContent>
            </Card>
          </div>
          {/* ----- */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-8 max-h-min ">
            <div className="col-span-2 ">
              <CustomRadialChart
                title="Presenza attuale"
                description="Valore percentuale"
              />
            </div>
            <div className="col-span-4 ">
              <CustomMultipleLineChart
                title="Presenza nel tempo"
                description="Nell'arco della giornata"
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
                  2024-10-5 20:14
                </div>
              </CardFooter>
              <Separator />
            </Card>
            <div className="col-span-4 ">
              <CustomMultipleBarChart
                title="Dispositivi rilevati"
                description="Nell'arco della giornata"
              />
            </div>
            <div className="col-span-2">
              <CustomRadarChart
                title="Valori RSSI"
                description="Intesita dei segnali rilevati"
              />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
