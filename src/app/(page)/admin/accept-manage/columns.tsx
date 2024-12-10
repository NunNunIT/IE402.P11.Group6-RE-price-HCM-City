"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DataColumns = {
  _id: string;
  title: string;
  fullAddress: string;
  price: number;
  area: number;
  isAuth: boolean;
};

export const columns: ColumnDef<DataColumns>[] = [
  {
    accessorKey: "title",
    header: () => <div className="text-right">Tiêu đề</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue("title")}</div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Giá</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));

      return <div className="text-right font-medium">{amount} tỷ</div>;
    },
  },
  {
    accessorKey: "area",
    header: () => <div className="text-right">Diện tích</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("area"));

      return (
        <div className="text-right font-medium">
          {amount} m<sup>2</sup>
        </div>
      );
    },
  },
  {
    accessorKey: "fullAddress",
    header: () => <div className="text-right">Địa chỉ</div>,
    cell: ({ row }) => {
      // const fullAddress = row.getValue("fullAddress");

      return (
        <div className="text-right font-medium">
          {row.getValue("fullAddress")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Xem</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
