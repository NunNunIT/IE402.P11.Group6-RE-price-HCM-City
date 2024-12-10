"use client"

import * as React from "react"
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
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { ILocationModel } from "@/lib/model"
import { useAlertDialogWrapperFunction } from "@/hooks/use-alert-dialog"
import { useRouter } from "next/navigation"
import Image from "next/image"


const data: (ILocationModel & { _id: any })[] = [
  {
    _id: 1,
    ggMapId: "abcdef1234567890",
    ggMapUrl: "https://maps.google.com/?q=abcdef1234567890",
    title: "Location One",
    desc: "Description for location one.",
    categories: ["Park", "Nature"],
    locate: {
      lat: 34.0522,
      long: -118.2437,
      ward: "1"
    },
    imageUrls: [
      "https://congchungnguyenhue.com/Uploaded/Images/Original/2023/12/04/image3_0412152838.jpg",
      "https://congchungnguyenhue.com/Uploaded/Images/Original/2023/12/04/image3_0412152838.jpg"
    ],
    avgStarGGMap: 4.2,
    exts: ["wifi", "parking"],
    owner: "Owner One"
  },
  {
    _id: 2,
    ggMapId: "1234567890abcdef",
    ggMapUrl: "https://maps.google.com/?q=1234567890abcdef",
    title: "Location Two",
    desc: "Description for location two.",
    categories: ["Museum", "Historical"],
    locate: {
      lat: 40.7128,
      long: -74.0060,
      ward: "1"
    },
    imageUrls: [
      "https://congchungnguyenhue.com/Uploaded/Images/Original/2023/12/04/image3_0412152838.jpg",
      "https://congchungnguyenhue.com/Uploaded/Images/Original/2023/12/04/image3_0412152838.jpg"
    ],
    avgStarGGMap: 4.8,
    exts: ["guided tours", "gift shop"],
    owner: "Owner Two"
  },
  {
    _id: 3,
    ggMapId: "fedcba0987654321",
    ggMapUrl: "https://maps.google.com/?q=fedcba0987654321",
    title: "Location Three",
    desc: "Description for location three.",
    categories: ["Restaurant", "Food"],
    locate: {
      lat: 51.5074,
      long: -0.1278,
      ward: "1"
    },
    imageUrls: [
      "https://congchungnguyenhue.com/Uploaded/Images/Original/2023/12/04/image3_0412152838.jpg",
      "https://congchungnguyenhue.com/Uploaded/Images/Original/2023/12/04/image3_0412152838.jpg"
    ],
    avgStarGGMap: 3.9,
    exts: ["outdoor seating", "live music"],
    owner: "Owner Three"
  },
  {
    _id: 4,
    ggMapId: "0987654321fedcba",
    ggMapUrl: "https://maps.google.com/?q=0987654321fedcba",
    title: "Location Four",
    desc: "Description for location four.",
    categories: ["Shopping", "Mall"],
    locate: {
      lat: 48.8566,
      long: 2.3522,
      ward: "1"
    },
    imageUrls: [
      "https://congchungnguyenhue.com/Uploaded/Images/Original/2023/12/04/image3_0412152838.jpg",
      "https://congchungnguyenhue.com/Uploaded/Images/Original/2023/12/04/image3_0412152838.jpg"
    ],
    avgStarGGMap: 4.6,
    exts: ["food court", "parking"],
    owner: "Owner Four"
  }
];

const CellActions = ({ location }: { location: any }) => {
  const router = useRouter();
  const deleteLocation = async () => {
    console.log("Delete location");
  };
  const deleteDialog = useAlertDialogWrapperFunction(deleteLocation, { title: "Delete location", description: "Are you sure you want to delete this location?" });

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
          Copy google map URL
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            console.log("Edit location");
            router.push(`/admin/location-manage/edit/${location._id}`);
          }}
        >
          Edit location
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => { deleteDialog() }}
        >
          Delete location
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Columns: ColumnDef<(ILocationModel & { _id: any })>[] = [
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
    header: "imageUrls",
    cell: ({ row }) => (
      <div className="capitalize">
        <Image
          src={(row.getValue("imageUrls") as string[])[0]}
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
    header: "ggMapId",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("ggMapId")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: "title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "categories",
    header: "categories",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("categories")}</div>
    ),
  },
  {
    accessorKey: "exts",
    header: "extensions",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("exts")}</div>
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
]

const DataTableDemo = () => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
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
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter title..."
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
              Columns <ChevronDown />
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
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
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
                  )
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
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div >
  )
}

const LocationManage = () => {

  return (
    <>
      <div className="flex flex-col items-center p-5 min-h-[100dvh]">
        <h1 className="text-4xl font-bold">Quản lý bất động sản</h1>
        <DataTableDemo />
      </div>
    </>
  );
}

export default LocationManage;