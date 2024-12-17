"use client";

import { Button } from "@/components/ui/button";
import { DataColumns, columns } from "./columns";
import { DataTable } from "./data-table";
import { PlusIcon } from "lucide-react";
import useSWR from "swr";

async function getData(url: string): Promise<DataColumns[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data from API");
    }

    const payload = await res.json();

    // Assuming your API response contains a "data" field with the array of items
    return payload.data.rows.map((item: any) => ({
      _id: item._id,
      title: item.title,
      price: item.price,
      area: item.area,
      locate: item.locate,
      imageUrl: item.imageUrl,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array if there's an error
  }
}

export default function DemoPage() {
  const { data, isLoading, error } = useSWR('/api/real-estates?getAll=true', getData);

  return (
    <div className="container mx-auto py-10 px-2">
      <div className="flex flex-row justify-between items-center">
        <h1>Quản lý bất động sản</h1>
        <Button href="/create-new-re" startIcon={<PlusIcon className="size-6" />}>Tạo mới</Button>
      </div>
      {isLoading || error ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
}
