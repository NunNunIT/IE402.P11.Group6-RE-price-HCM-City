"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { toast } from "@/hooks/use-toast";
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
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DataColumns = {
  _id: string;
  title: string;
  price: number;
  area: number;
  imageUrl: string;
  locate: locate;
};

// Hàm handleDelete
const handleDelete = async (id: string) => {
  try {
    const response = await fetch(`/api/real-estates/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Xóa không thành công");
    }

    toast({ title: "Thành công", description: "Xóa bất động sản thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa:", error);
    toast({
      title: "Lỗi",
      description: "Đã có lỗi xảy ra khi xóa",
      variant: "destructive",
    });
  }
};

export const columns: ColumnDef<DataColumns>[] = [
  {
    accessorKey: "imageUrl",
    header: () => <div className="text-left font-semibold"></div>,
    cell: ({ row }) => {
      return (
        <Image
          src={row.getValue("imageUrl")}
          alt={"Hình ảnh"}
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
    header: () => <div className="text-left font-semibold">Giá</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));

      return <div className="text-left font-medium">{amount} tỷ</div>;
    },
  },
  {
    accessorKey: "area",
    header: () => <div className="text-center font-semibold">Diện tích</div>,
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
    header: () => <div className="text-center font-semibold">Địa chỉ</div>,
    cell: ({ row }) => {
      const locate = row.original.locate; // Truy cập toàn bộ locate object
      return (
        <div className="text-left font-medium">
          {locate.diachi}, {locate.xa}, {locate.huyen}, {locate.tinh}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original._id; // Lấy _id của hàng
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
              <Link href={`/admin/re-manage/${id}`} passHref>
                Xem
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(id)}>
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
