"use client";

import { useState } from "react";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarClock, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TimeSlotPicker({ form }: { form: any }) {
  const giorni = [
    "Lunedì",
    "Martedì",
    "Mercoledì",
    "Giovedì",
    "Venerdì",
    "Sabato",
    "Domenica",
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedule",
  });
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* is_dst */}
      <FormField
        control={control}
        name="is_dst"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <p className="font-bold tracking-tight">Imposta ora legale</p>
              <FormDescription>
                Imposta il cambio ora quando necessario, attivo o disattivato
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
            Un modo semplice per organizzare le fascie orarie di operatività
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
                                      {giorni.map((giorno, index) => {
                                        return (
                                          <SelectItem
                                            key={giorno}
                                            value={`${index}`}
                                          >
                                            {giorno}
                                          </SelectItem>
                                        );
                                      })}
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
                                        {Array.from({ length: 48 }).map(
                                          (_, i) => {
                                            const hour = Math.floor(i / 2)
                                              .toString()
                                              .padStart(2, "0");
                                            const minute = ((i % 2) * 30)
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
                                          }
                                        )}
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
                                        {Array.from({ length: 48 }).map(
                                          (_, i) => {
                                            const hour = Math.floor(i / 2)
                                              .toString()
                                              .padStart(2, "0");
                                            const minute = ((i % 2) * 30)
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
                                          }
                                        )}
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
  );
}
