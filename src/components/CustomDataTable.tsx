"use client";

import {
  ScrollableTable,
  ScrollableTableHeader,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

export function DataTable({ columns, data, className, ...props }) {
  return (
    <Card className={className}>
      <CardHeader className="items-stretch space-y-0 p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-auto">
          <ScrollableTable>
            <ScrollableTableHeader>
              <TableRow>
                {columns.map((item) => (
                  <TableHead className="w-[100px]">{item.header}</TableHead>
                ))}
              </TableRow>
            </ScrollableTableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    <Badge variant="blue">{item.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </ScrollableTable>
        </div>
      </CardContent>
    </Card>
  );
}
