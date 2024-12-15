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

const CellActions = ({ location }: { location: any }) => {
  const router = useRouter();

  // Hàm xóa địa điểm
  const deleteLocation = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/location/${location._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.error("Error during delete location! ", data?.error);
        return;
      }
      // Điều hướng sau khi xóa thành công
      console.log("Xóa địa điểm thành công");
      router.refresh();
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
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
            ? "indeterminate"
            : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "imageUrls",
    header: "Hình ảnh",
    cell: ({ row }) => (
      <div className="capitalize">
        <Image
          src={((row.getValue("imageUrls") as string[]) || [])[0]}
          alt="imageUrls"
          width="1000"
          height="1000"
          className="w-32"
        />
      </div>
    ),
  },
  {
    accessorKey: "ggMapId",
    header: "ID Google Map",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("ggMapId")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: "Tiêu đề",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Danh mục",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "exts",
    header: "Thành phần mở rộng",
    cell: ({ row }) => (
      <div className="capitalize">
        {(row.getValue("exts") as string[]).join(", ")}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const location = row.original;
      return <CellActions location={location} />;
    },
  },
];

const DataTable = ({ data }: { data: any }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const router = useRouter();

  const table = useReactTable({
    data,
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
        <div className="mr-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/admin/location-manage/add")}
          >
            Thêm mới bất động sản
          </Button>
        </div>
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
          <TableBody>
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

const LocationManage = () => {
  const [locations, setLocations] = React.useState<
    (ILocationModel & { _id: any })[]
  >([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      console.log("Fetching locations");
      const res = await fetch("/api/location");
      if (!res.ok) {
        console.log("Failed to fetch locations");
        return;
      }
      const data = await res.json();
      setLocations(data.data);
      setLoading(false);
    };
    fetchLocations();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center p-5 min-h-[100dvh]">
        <h1 className="text-4xl font-bold">Quản lý địa điểm</h1>
        {loading ? (
          <div className="mt-10">Loading...</div>
        ) : (
          <DataTable data={locations} />
        )}
      </div>
    </>
  );
};

export default LocationManage;
