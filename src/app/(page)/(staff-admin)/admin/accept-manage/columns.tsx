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
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";

const postConfirmRealEstate = async (id: string) => {
  const res = await fetch(`/api/accept-re/${id}/confirm`, {
    method: "PUT",
    body: JSON.stringify({
      isAuth: true,
    }),
  });
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const payload = await res.json();
  console.log("payload", payload);
  return payload.data;
};

const confirmRealEstate = async (id: string) => {
  toast.promise(postConfirmRealEstate(id), {
    loading: "Đang Xác nhận...",
    success: (data) => {
      return "Xác nhận thành công";
    },
    error: () => "Xác nhận thất bại",
  });
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DataColumns = {
  _id: string;
  title: string;
  price: number;
  area: number;
  imageUrl: string;
  locate: locate;
  isAuth: string;
};

export const columns: ColumnDef<DataColumns>[] = [
  {
    accessorKey: "imageUrl",
    header: () => <div className="text-left font-semibold"></div>,
    cell: ({ row }) => {
      return (
        <Image
          src={row.getValue("imageUrl")}
          alt={row.getValue("title")}
          className="w-32 object-cover aspect-square"
          width={100}
          height={100}
          unoptimized
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: () => <div className="text-left font-semibold">Tiêu đề</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("title")}</div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right font-semibold">Giá</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));

      return <div className="text-right font-medium">{amount} tỷ</div>;
    },
  },
  {
    accessorKey: "area",
    header: () => <div className="text-right font-semibold">Diện tích</div>,
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
    accessorKey: "locate",
    header: () => <div className="text-right font-semibold">Địa chỉ</div>,
    cell: ({ row }) => {
      const locate = row.original.locate; // Truy cập toàn bộ locate object
      return (
        <div className="text-right font-medium">
          {locate.diachi}, {locate.xa}, {locate.huyen}, {locate.tinh}
        </div>
      );
    },
  },
  {
    accessorKey: "isAuth",
    header: () => <div className="text-left font-semibold">Xác thực</div>,
    cell: ({ row }) => {
      console.log(row.getValue("isAuth"));
      return (
        <div className="text-left font-medium">
          {row.getValue("isAuth") == "pending" && (
            <span className="px-2 py-1 rounded-md bg-orange-700 text-white text-nowrap">
              Đang đợi
            </span>
          )}
          {row.getValue("isAuth") == "auth" && (
            <span className="px-2 py-1 rounded-md bg-green-700 text-white text-nowrap">
              Xác thực
            </span>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
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
            <DropdownMenuItem asChild>
              <Link href={`/admin/re-manage/${row.original._id}`} passHref>
                Xem
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => {
                confirmRealEstate(row.original._id);
              }}
            >
              Xác nhận
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
