"use client";

import { useEffect, useState } from "react";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { supabase } from "@/app";
import { useSupabaseData } from "@/hooks/getSupabaseData";

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

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Plus, Trash, Sunrise, Sunset, Calendar1 } from "lucide-react";

import { CustomJsonViewer } from "@/components/JsonViewer";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { LoadingState } from "@/components/LoadingState";
import { Skeleton } from "@/components/ui/skeleton";

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
  deepsleep: z.object({
    deepsleep_duration_m: z.number().optional(),
    day_schedule: z
      .array(
        z.object({
          day: z.number(),
          times: z.array(z.number()).length(4), // Array format [startHour, startMinute, endHour, endMinute]
        })
      )
      .optional(),
  }),
  api: z.object({ supabase_table_name: z.string().optional() }),
  bluetooth: z.object({
    ms_scan: z.number().optional(),
    bt_rssi_range: z.number().optional(),
  }),
  wifi: z.object({
    connection_timeout_s: z.number().optional(),
    wifi_rssi_range: z.number().optional(),
    ssid: z.string().optional(),
    wifi_password: z.string().optional(),
  }),
  time: z.object({ is_dst: z.boolean().optional() }),
});

const placeHolderJson = {
  id: "Template da modificare",
  created_at: "2024-11-05 14:36:16.160375+00",
  config_json: {
    deepsleep: {
      deepsleep_duration_m: 5,
      day_schedule: [
        { day: 0, times: [18, 0, 22, 0] },
        { day: 5, times: [17, 0, 18, 0] },
      ],
    },
    api: {
      supabase_table_name: "Impostare Nome Tabella Supabase",
    },
    bluetooth: {
      ms_scan: 60,
      bt_rssi_range: -80,
    },
    wifi: {
      connection_timeout_s: 10,
      rssi_range: -80,
      wifi_ssid: "Impostare WIFI ssid",
      wifi_password: "Impostare WIFI password",
    },
    time: {
      is_dst: false,
    },
  },
};

const giorni = [
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato",
  "Domenica",
];

export default function Gestione() {
  const { supabaseDataCONFIG, getSupabaseDataCONFIG, insertSupbaseDataCONFIG } =
    useSupabaseData();
  const [status, setStatus] = useState(true);

  supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "CONFIG" },
      (payload) => {
        getSupabaseDataCONFIG();
      }
    )
    .subscribe();

  useEffect(() => {
    getSupabaseDataCONFIG();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const {
    control,
    watch,
    formState: { isDirty },
  } = form;

  const selectedJsonData =
    supabaseDataCONFIG && supabaseDataCONFIG.length > 0
      ? supabaseDataCONFIG[0]
      : placeHolderJson;


  useEffect(() => {
    if (supabaseDataCONFIG && supabaseDataCONFIG[0]?.config_json) {
      // Update the form default values when the data is ready
      form.reset({
        deepsleep: {
          deepsleep_duration_m:
            supabaseDataCONFIG[0].config_json.deepsleep.deepsleep_duration_m,
          day_schedule:
            supabaseDataCONFIG[0].config_json.deepsleep.day_schedule,
        },
        api: {
          supabase_table_name:
            supabaseDataCONFIG[0].config_json.api.supabase_table_name,
        },
        bluetooth: {
          ms_scan: supabaseDataCONFIG[0].config_json.bluetooth.ms_scan,
          bt_rssi_range:
            supabaseDataCONFIG[0].config_json.bluetooth.bt_rssi_range,
        },
        wifi: {
          connection_timeout_s:
            supabaseDataCONFIG[0].config_json.wifi.connection_timeout_s,
          wifi_rssi_range:
            supabaseDataCONFIG[0].config_json.wifi.wifi_rssi_range,
          ssid: supabaseDataCONFIG[0].config_json.wifi.ssid,
          wifi_password: supabaseDataCONFIG[0].config_json.wifi.wifi_password,
        },
        time: { is_dst: supabaseDataCONFIG[0].config_json.time.is_dst },
      });
    }
  }, [supabaseDataCONFIG, form]);

  const formValues = watch();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "deepsleep.day_schedule",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
  
      insertSupbaseDataCONFIG(values);
    } catch (error) {
      console.error("Form submission error", error);
      setStatus(false);
    }
  }

  return (
    <PageContainer scrollable={true}>
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
        {selectedJsonData ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-4 h-full"
            >
              <div className="col-span-1 space-y-4">
                {/* API ------------------------------------- */}
                <Card className="space-y-4">
                  <CardHeader className="bg-muted">
                    <CardTitle>Api e Deepsleep</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-12 gap-4">
                      {/* supabase_table_name */}
                      <div className="col-span-6">
                        <FormField
                          control={form.control}
                          name="api.supabase_table_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome Tabella Supabase</FormLabel>
                              <FormControl>
                                <Input
                                  type="string"
                                  {...field}
                                  placeholder="Inserire nome tabella"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {/* deepsleep_duration_m */}
                      <div className="col-span-6">
                        <FormField
                          control={form.control}
                          name="deepsleep.deepsleep_duration_m"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Deepsleep (minuti)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  placeholder="Inserire durata in minuti"
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Convert to number, defaulting to 0 if empty
                                    field.onChange(value ? Number(value) : 0);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* BLUETOOTH ------------------------------------- */}
                <Card className="space-y-4">
                  <CardHeader className="bg-muted">
                    <CardTitle>Bluetooth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* ms_scan */}
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-6">
                        <FormField
                          control={form.control}
                          name="bluetooth.ms_scan"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Bluetooth scan timeout (secondi)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  placeholder="Inserire durata in secondi"
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Convert to number, defaulting to 0 if empty
                                    field.onChange(value ? Number(value) : 0);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {/* bt_rssi_range */}
                      <div className="col-span-6">
                        <FormField
                          control={form.control}
                          name="bluetooth.bt_rssi_range"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Bluetooth rssi max range (dBm)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  placeholder="Inserire range"
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Convert to number, defaulting to 0 if empty
                                    field.onChange(value ? Number(value) : 0);
                                  }}
                                />
                              </FormControl>

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
                          name="wifi.connection_timeout_s"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Timeout collegamento (secondi)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  placeholder="Inserire durata in secondi"
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Convert to number, defaulting to 0 if empty
                                    field.onChange(value ? Number(value) : 0);
                                  }}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {/* wifi_rssi_range */}
                      <div className="col-span-6">
                        <FormField
                          control={form.control}
                          name="wifi.wifi_rssi_range"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Wifi rssi max range (dBm)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  placeholder="Inserire range"
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Convert to number, defaulting to 0 if empty
                                    field.onChange(value ? Number(value) : 0);
                                  }}
                                />
                              </FormControl>

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
                          name="wifi.ssid"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome rete Wifi</FormLabel>
                              <FormControl>
                                <Input
                                  type="string"
                                  {...field}
                                  placeholder="Inserire nome rete wifi"
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {/* wifi_password */}
                      <div className="col-span-6">
                        <FormField
                          control={control}
                          name="wifi.wifi_password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password Wifi</FormLabel>
                              <FormControl>
                                <Input
                                  type="string"
                                  {...field}
                                  placeholder="Inserire la password"
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* is_dst */}
                <FormField
                  control={control}
                  name="time.is_dst"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-background">
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
                      <Card>
                        <CardContent className="flex flex-col justify-between p-4 gap-4">
                          <div className="flex flex-row gap-4 items-end">
                            <Button
                              type="button"
                              variant="secondary"
                              onClick={
                                () =>
                                  append({
                                    day: 0,
                                    times: [14, 0, 17, 0],
                                  }) // Default values for new schedule
                              }
                            >
                              Aggiungi <Plus />
                            </Button>
                            <div className="flex flex-row gap-4 flex-1 justify-end">
                              <Skeleton className="h-[40px] w-[110px]" />
                              <Skeleton className="h-[40px] w-[110px]" />
                              <Skeleton className="h-[40px] w-[110px]" />
                              <Skeleton className="h-[40px] w-[110px]" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <div className="flex flex-col justify-center gap-4">
                        {fields.map((field, index) => (
                          <Card key={field.id}>
                            <CardContent className="flex flex-col justify-between p-4 gap-4">
                              <div className="flex flex-row gap-4 items-end ">
                                <div className="flex flex-row gap-6 flex-1  items-center">
                                  <div className="flex flex-row gap-4 items-end">
                                    <Calendar1 className="h-15 mb-2" />
                                    <div className="flex flex-col gap-1">
                                      <p className="text-sm font-medium leading-none">
                                        Giorno
                                      </p>
                                      <FormField
                                        control={control}
                                        name={`deepsleep.day_schedule.${index}.day`}
                                        render={({ field }) => {
                                          return (
                                            <FormItem className="flex flex-col">
                                              <FormControl>
                                                <Select
                                                  value={String(field.value)}
                                                  onValueChange={(value) => {
                                                    // Convert the selected value back to a number
                                                    field.onChange(
                                                      Number(value)
                                                    );
                                                  }}
                                                >
                                                  <SelectTrigger className="font-normal focus:ring-0 w-[120px]">
                                                    <SelectValue />
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                    {giorni.map(
                                                      (giorno, index) => {
                                                        return (
                                                          <SelectItem
                                                            key={index}
                                                            value={index.toString()}
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
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="flex flex-row gap-4 items-end">
                                    <Sunrise className="h-15 mb-2" />
                                    <div className="flex flex-col gap-1">
                                      <p className="text-sm font-medium leading-none">
                                        Orario di inizio
                                      </p>
                                      <div className="flex flex-row gap-1 items-center">
                                        <FormField
                                          control={control}
                                          name={`deepsleep.day_schedule.${index}.times.0`}
                                          render={({ field }) => (
                                            <FormItem className="flex flex-col w-[4rem]">
                                              <FormControl>
                                                <Input
                                                  type="number"
                                                  max={23}
                                                  min={0}
                                                  {...field}
                                                  onChange={(e) => {
                                                    const value =
                                                      e.target.value;
                                                    // Convert to number, defaulting to 0 if empty
                                                    field.onChange(
                                                      value ? Number(value) : 0
                                                    );
                                                  }}
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <p className="text-xl font-mono font-bold">
                                          :
                                        </p>
                                        <FormField
                                          control={control}
                                          name={`deepsleep.day_schedule.${index}.times.1`}
                                          render={({ field }) => (
                                            <FormItem className="flex flex-col w-[4rem]">
                                              <FormControl>
                                                <Input
                                                  type="number"
                                                  max={59}
                                                  min={0}
                                                  {...field}
                                                  onChange={(e) => {
                                                    const value =
                                                      e.target.value;
                                                    // Convert to number, defaulting to 0 if empty
                                                    field.onChange(
                                                      value ? Number(value) : 0
                                                    );
                                                  }}
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex flex-row gap-4 items-end">
                                    <Sunset className="h-15 mb-2" />
                                    <div className="flex flex-col gap-1">
                                      <p className="text-sm font-medium leading-none">
                                        Orario di fine
                                      </p>
                                      <div className="flex flex-row gap-1 items-center">
                                        <FormField
                                          control={control}
                                          name={`deepsleep.day_schedule.${index}.times.2`}
                                          render={({ field }) => (
                                            <FormItem className="flex flex-col w-[4rem]">
                                              <FormControl>
                                                <Input
                                                  type="number"
                                                  max={23}
                                                  min={0}
                                                  {...field}
                                                  onChange={(e) => {
                                                    const value =
                                                      e.target.value;
                                                    // Convert to number, defaulting to 0 if empty
                                                    field.onChange(
                                                      value ? Number(value) : 0
                                                    );
                                                  }}
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <p className="text-xl font-mono font-bold">
                                          :
                                        </p>
                                        <FormField
                                          control={control}
                                          name={`deepsleep.day_schedule.${index}.times.3`}
                                          render={({ field }) => (
                                            <FormItem className="flex flex-col w-[4rem]">
                                              <FormControl>
                                                <Input
                                                  type="number"
                                                  max={59}
                                                  min={0}
                                                  {...field}
                                                  onChange={(e) => {
                                                    const value =
                                                      e.target.value;
                                                    // Convert to number, defaulting to 0 if empty
                                                    field.onChange(
                                                      value ? Number(value) : 0
                                                    );
                                                  }}
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  variant="destructive"
                                  onClick={() => remove(index)}
                                >
                                  <Trash />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="col-span-1 ">
                <Card className="drop-shadow-sm flex flex-col sticky top-[5.75rem] overflow-hidden">
                  <CardHeader>
                    {!status ? (
                      <Alert
                        variant="destructive"
                        className="bg-destructive text-foreground"
                      >
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                          Si è verificato un errore
                        </AlertDescription>
                      </Alert>
                    ) : null}
                    <CardTitle className="text-sm text-muted-foreground font-medium font-mono uppercase">
                      Configurazione
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-full flex flex-col gap-4">
                    <CustomJsonViewer
                      jsonData={formValues}
                      className="h-[35rem]"
                    />
                    <Separator />
                    <p className="text-sm text-muted-foreground font-medium font-mono uppercase">
                      Dettagli
                    </p>
                    <div className="flex flex-col gap-2">
                      <p className="text-muted-foreground text-sm flex gap-2 items-center">
                        Stato:
                        <code className="rounded bg-muted px-[0.3rem] font-mono text-sm flex flex-row items-center gap-2">
                          {isDirty
                            ? "In attessa di salvataggio"
                            : status
                            ? "Salvato e attivo"
                            : "Errore"}
                          <span
                            className={cn(
                              "flex h-2 w-2 rounded-full",
                              isDirty
                                ? "bg-yellow-500"
                                : status
                                ? "bg-green-500"
                                : "bg-red-500"
                            )}
                          />
                        </code>
                      </p>
                      <p className="text-muted-foreground text-sm flex gap-2 items-center">
                        Versione:
                        <code className="rounded bg-muted px-[0.3rem] font-mono text-sm flex flex-row items-center gap-2">
                          {selectedJsonData.id}
                        </code>
                      </p>
                      <p className="text-muted-foreground text-sm flex gap-2">
                        Impostato:{" "}
                        <span className="text-foreground">
                          {formatDate(selectedJsonData.created_at)}
                        </span>
                      </p>
                      <Button type="submit">Salva configurazione</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </form>
          </Form>
        ) : (
          <LoadingState />
        )}
      </div>
    </PageContainer>
  );
}
