"use client";

import * as React from "react";

import { ChevronDown, MoreHorizontal } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ILocationModel } from "@/lib/model";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useAlertDialogWrapperFunction } from "@/hooks/use-alert-dialog";
import { useRouter } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";

const CellActions = ({ location }: { location: any }) => {
  const { mutate } = useSWRConfig();
  const router = useRouter();

  // Hàm xóa địa điểm
  const deleteLocation = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/locations/${location._id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          cache: "reload",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.error("Error during delete location! ", data?.error);
        return;
      }

      await mutate(
        (prev?: { _id: string }[]) =>
          !!prev && prev.filter((_id) => _id != location._id)
      );
    } catch (error) {
      console.error("Lỗi khi xóa địa điểm! ", error);
    }
  };

  // Sử dụng hook `useAlertDialogWrapperFunction` để hiển thị dialog xác nhận xóa
  const deleteDialog = useAlertDialogWrapperFunction(deleteLocation, {
    title: "Xóa địa điểm",
    description: "Bạn có chắc chắn muốn xóa địa điểm này?",
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(location.ggMapUrl)}
        >
          Sao chép URL Google map
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            console.log("Edit location");
            router.push(`/admin/location-manage/edit/${location._id}`);
          }}
        >
          Sửa địa điểm
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            deleteDialog();
          }}
        >
          Xóa địa điểm
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Columns: ColumnDef<ILocationModel & { _id: any }>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected()
  //           ? true
  //           : table.getIsSomePageRowsSelected()
  //           ? "indeterminate"
  //           : false
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "imageUrl",
    header: "",
    cell: ({ row }) => (
      <div className="capitalize">
        <Image
          src={row.getValue("imageUrl")}
          alt={row.getValue("title")}
          width="1000"
          height="1000"
          className="w-32 aspect-square object-cover overflow-hidden"
        />
      </div>
    ),
  },
  // {
  //   accessorKey: "ggMapId",
  //   header: "ID Google Map",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("ggMapId")}</div>
  //   ),
  // },
  {
    accessorKey: "title",
    header: () => <div className="text-left font-semibold">Tiêu đề</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: () => <div className="text-center font-semibold">Danh mục</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
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
  // {
  //   accessorKey: "exts",
  //   header: <div className="text-right font-semibold">Địa chỉ</div>,
  //   cell: ({ row }) => (
  //     <div className="capitalize">
  //       {(row.getValue("exts") as string[]).join(", ")}
  //     </div>
  //   ),
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const location = row.original;
      return <CellActions location={location} />;
    },
  },
];

const DataTable = ({ data }: { data: { rows: any[]; total: number } }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const router = useRouter();

  const table = useReactTable({
    data: data?.rows ?? [],
    columns: Columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Lọc theo tiêu đề..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Cột <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {flexRender(column.columnDef.header, undefined)}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-white">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={Columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} trong{" "}
          {table.getFilteredRowModel().rows.length} hàng được chọn.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Trước
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Sau
          </Button>
        </div>
      </div>
    </div>
  );
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");

  const payload = await res.json();
  return payload.data;
};

const LocationManage = () => {
  const { data, isLoading, error } = useSWR("/api/locations", fetcher);
  return (
    <>
      <div className="flex flex-col min-h-[100dvh]">
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="md:text-4xl text-2xl font-bold my-3">
            Quản lý địa điểm
          </h1>
          <Button
            href="/admin/location-manage/add"
            variant="default"
          >
            Tạo địa điểm mới
          </Button>
        </div>

        {isLoading || error ? (
          <div className="mt-10">Loading...</div>
        ) : (
          <DataTable data={data} />
        )}
      </div>
    </>
  );
};

export default LocationManage;
