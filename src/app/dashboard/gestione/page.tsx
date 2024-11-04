"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import PageContainer from "@/components/layout/page-container";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarClock, Plus, Trash } from "lucide-react";

import { CustomJsonViewer } from "@/components/JsonViewer";
import { Separator } from "@/components/ui/separator";

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

const formSchema = z.object({
  deepsleep_duration_m: z.string().optional(),
  ms_scan: z.string().optional(),
  bt_rssi_range: z.string().optional(),
  wifi_rssi_range: z.string().optional(),
  ssid: z.string().optional(),
  wifi_password: z.string().optional(),
  connection_timeout_s: z.string().optional(),
  is_dst: z.boolean().optional(),
  supabase_table_name: z.string().optional(),
  schedule: z
    .array(
      z.object({
        day: z.string(),
        time_start: z.string(),
        time_end: z.string(),
      })
    )
    .optional(),
});

interface LogsDataObject {
  id: string;
  status: string;
  message: string;
  timestamp: string;
}

const testJson = {
  deepsleep: {
    deepsleep_duration_m: 5,
    day_schedule: {
      "0": [18, 0, 22, 0],
      "5": [20, 0, 23, 0],
    },
  },
  api: {
    supabase_table_name: "ESP32",
  },
  bluetooth: {
    ms_scan: 60,
    rssi_range: -80,
  },
  wifi: {
    connection_timeout_s: 10,
    rssi_range: -80,
    ssid: "01001010",
    password: "Geki2002",
  },
  time: {
    is_dst: true,
  },
};

function transformDayScheduleToSchedule(day_schedule: any) {
  return Object.entries(day_schedule).map(([day, times]) => ({
    day,
    time_start: `${times[0].toString().padStart(2, "0")}:${times[1]
      .toString()
      .padStart(2, "0")}`,
    time_end: `${times[2].toString().padStart(2, "0")}:${times[3]
      .toString()
      .padStart(2, "0")}`,
  }));
}

function transformScheduleToDaySchedule(schedule: any) {
  return schedule.reduce((acc, { day, time_start, time_end }) => {
    const [startHour, startMinute] = time_start.split(":").map(Number);
    const [endHour, endMinute] = time_end.split(":").map(Number);
    acc[day] = [startHour, startMinute, endHour, endMinute];
    return acc;
  }, {});
}

export default function Gestione() {
  const schedule = transformDayScheduleToSchedule(
    testJson.deepsleep.day_schedule
  );
  const giorni = [
    "Lunedì",
    "Martedì",
    "Mercoledì",
    "Giovedì",
    "Venerdì",
    "Sabato",
    "Domenica",
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deepsleep_duration_m: "" + testJson.deepsleep.deepsleep_duration_m,
      schedule: schedule,
      ms_scan: "" + testJson.bluetooth.ms_scan,
      bt_rssi_range: "" + testJson.bluetooth.rssi_range,
      connection_timeout_s: "" + testJson.wifi.connection_timeout_s,
      wifi_rssi_range: "" + testJson.wifi.rssi_range,
      ssid: "" + testJson.wifi.ssid,
      wifi_password: "" + testJson.wifi.password,
      supabase_table_name: "" + testJson.api.supabase_table_name,
      is_dst: testJson.time.is_dst,
    },
  });

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedule",
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("submitted", values);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <PageContainer scrollable={false}>
      <div className="space-y-4">
        <div className="flex flex-col justify-between space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">
            Gestione firmware e dispositivo
          </h2>
          <p className="text-muted-foreground">
            Monitora e gestisci le versioni del firmware in uso, configura le
            impostazioni e personalizza le opzioni dei dispositivi.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4 h-full"
          >
            <div className="col-span-1">
              <div className="space-y-4">
                <Card className="space-y-4">
                  <CardHeader className="bg-muted">
                    <CardTitle>Api e Deepsleep</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-12 gap-2">
                      {/* supabase_table_name */}
                      <div className="col-span-6">
                        <FormField
                          control={form.control}
                          name="supabase_table_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome Tabella Supabase</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={testJson.api.supabase_table_name}
                                  type="strg"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Il nome della table su Supabase
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {/* deepsleep_duration_m */}
                      <div className="col-span-6">
                        <FormField
                          control={form.control}
                          name="deepsleep_duration_m"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Deepsleep </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={
                                    testJson.deepsleep.deepsleep_duration_m
                                  }
                                  type=""
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Durata ciclo deepsleep (minuti)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="space-y-4">
                  <CardHeader className="bg-muted">
                    <CardTitle>Bluetooth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* ms_scan */}
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-6">
                        <FormField
                          control={form.control}
                          name="ms_scan"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bluetooth scan timeout</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={testJson.bluetooth.ms_scan}
                                  type="number"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Durata scan Bluetooth (secondi)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {/* bt_rssi_range */}
                      <div className="col-span-6">
                        <FormField
                          control={form.control}
                          name="bt_rssi_range"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bluetooth rssi max range</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={testJson.bluetooth.rssi_range}
                                  type=""
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Range rssi entro il quale considerare il segnale
                                (dBm)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="space-y-4">
                  <CardHeader className="bg-muted">
                    <CardTitle>Wifi</CardTitle>
                    <CardDescription>Impostazioni wifi</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-12 gap-2">
                      {/* connection_timeout_s */}
                      <div className="col-span-6">
                        <FormField
                          control={form.control}
                          name="connection_timeout_s"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Timeout</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={
                                    testJson.wifi.connection_timeout_s
                                  }
                                  type=""
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Tempo massimo di attesa collegamento alla rete
                                (secondi)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {/* wifi_rssi_range */}
                      <div className="col-span-6">
                        <FormField
                          control={form.control}
                          name="wifi_rssi_range"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Wifi rssi max range</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={testJson.wifi.rssi_range}
                                  type=""
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Range Rssi entro il quale considerare il segnale
                                (dBm)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      {/* ssid */}
                      <div className="col-span-6">
                        <FormField
                          control={form.control}
                          name="ssid"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome rete Wifi</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={testJson.wifi.ssid}
                                  type=""
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Imposta il nome della rete wifi a cui collegarsi
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {/* wifi_password */}
                      <div className="col-span-6">
                        <FormField
                          control={form.control}
                          name="wifi_password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password Wifi</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={testJson.wifi.password}
                                  type=""
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Imposta la password della rete wifi a cui
                                collegarsi
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex flex-col gap-4 h-full">
                  {/* is_dst */}
                  <FormField
                    control={control}
                    name="is_dst"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <p className="font-bold tracking-tight">
                            Imposta ora legale
                          </p>
                          <FormDescription>
                            Imposta il cambio ora quando necessario, attivo o
                            disattivato
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            aria-readonly
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Card>
                    <CardHeader className="bg-muted">
                      <CardTitle>Time slots manager</CardTitle>
                      <CardDescription>
                        Un modo semplice per organizzare le fascie orarie di
                        operatività
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex flex-col justify-center gap-4">
                        <div className="border-2 border-dashed rounded-md bg-muted/20 p-4 py-5 flex flex-col items-center">
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() =>
                              append({
                                day: "0",
                                time_start: "14:30",
                                time_end: "16:30",
                              })
                            }
                          >
                            Inserisci <Plus />
                          </Button>
                        </div>
                        <ScrollArea className="min-h-0 h-[calc(100vh-500px)] rounded bg-muted/40">
                          <div className="flex flex-col justify-center gap-4">
                            {fields.map((field, index) => (
                              <Card key={field.id}>
                                <CardContent className="flex flex-col justify-between p-4 gap-4">
                                  <div className="flex flex-row gap-4 items-end">
                                    <div className="flex bg-secondary text-secondary-foreground hover:bg-secondary/80 p-4 rounded-md ">
                                      <CalendarClock className="h-30" />
                                    </div>
                                    <div className="flex flex-row gap-4 flex-1">
                                      <FormField
                                        control={control}
                                        name={`schedule.${index}.day`}
                                        render={({ field }) => (
                                          <FormItem className="flex flex-col">
                                            <FormLabel>Giorno</FormLabel>
                                            <FormControl>
                                              <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                              >
                                                <SelectTrigger className="font-normal focus:ring-0 w-[120px]">
                                                  <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  {giorni.map(
                                                    (giorno, index) => {
                                                      return (
                                                        <SelectItem
                                                          key={giorno}
                                                          value={`${index}`}
                                                        >
                                                          {giorno}
                                                        </SelectItem>
                                                      );
                                                    }
                                                  )}
                                                </SelectContent>
                                              </Select>
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={control}
                                        name={`schedule.${index}.time_start`}
                                        render={({ field }) => (
                                          <FormItem className="flex flex-col">
                                            <FormLabel>Ora inizio</FormLabel>
                                            <FormControl>
                                              <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                defaultValue="14:30"
                                              >
                                                <SelectTrigger className="font-normal focus:ring-0 w-[120px]">
                                                  <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <ScrollArea className="h-[15rem]">
                                                    {Array.from({
                                                      length: 48,
                                                    }).map((_, i) => {
                                                      const hour = Math.floor(
                                                        i / 2
                                                      )
                                                        .toString()
                                                        .padStart(2, "0");
                                                      const minute = (
                                                        (i % 2) *
                                                        30
                                                      )
                                                        .toString()
                                                        .padStart(2, "0");
                                                      return (
                                                        <SelectItem
                                                          key={i}
                                                          value={`${hour}:${minute}`}
                                                        >
                                                          {hour}:{minute}
                                                        </SelectItem>
                                                      );
                                                    })}
                                                  </ScrollArea>
                                                </SelectContent>
                                              </Select>
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={control}
                                        name={`schedule.${index}.time_`}
                                        render={({ field }) => (
                                          <FormItem className="flex flex-col">
                                            <FormLabel>Ora fine</FormLabel>
                                            <FormControl>
                                              <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                defaultValue="16:00"
                                              >
                                                <SelectTrigger className="font-normal focus:ring-0 w-[120px]">
                                                  <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <ScrollArea className="h-[15rem]">
                                                    {Array.from({
                                                      length: 48,
                                                    }).map((_, i) => {
                                                      const hour = Math.floor(
                                                        i / 2
                                                      )
                                                        .toString()
                                                        .padStart(2, "0");
                                                      const minute = (
                                                        (i % 2) *
                                                        30
                                                      )
                                                        .toString()
                                                        .padStart(2, "0");
                                                      return (
                                                        <SelectItem
                                                          key={i}
                                                          value={`${hour}:${minute}`}
                                                        >
                                                          {hour}:{minute}
                                                        </SelectItem>
                                                      );
                                                    })}
                                                  </ScrollArea>
                                                </SelectContent>
                                              </Select>
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                    <div className="ml-auto flex flex-row gap-4">
                                      <Button
                                        variant="destructive"
                                        onClick={() => remove(index)}
                                      >
                                        Elimina <Trash />{" "}
                                      </Button>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </CardContent>
                    <CardFooter></CardFooter>
                  </Card>
                </div>
              </div>
            </div>
            <div className="col-span-1 ">
              <Card className="drop-shadow-sm flex flex-col sticky top-[5.75rem] overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground font-medium font-mono uppercase">
                    Configurazione
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-full flex flex-col gap-4">
                  <CustomJsonViewer jsonData={testJson} className="h-[35rem]" />

                  <Separator />
                  <p className="text-sm text-muted-foreground font-medium font-mono uppercase">
                    Dettagli
                  </p>
                  <div className="flex flex-col gap-2">
                    <p className="text-muted-foreground text-sm flex gap-2 items-center">
                      Stato:
                      <code className="rounded bg-muted px-[0.3rem] font-mono text-sm flex flex-row items-center gap-2">
                        In uso
                        <span className="flex h-2 w-2 rounded-full bg-green-500" />
                      </code>
                    </p>
                    <p className="text-muted-foreground text-sm flex gap-2">
                      Impostato:{" "}
                      <span className="text-foreground">
                        {/* {formatDate(selectedJsonData.created_at)} */}
                      </span>
                    </p>
                    <Button type="submit">Salva configurazione</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
      </div>
    </PageContainer>
  );
}
