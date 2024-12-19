"use client";

import { DataColumns, columns } from "./columns";
import { DataTable } from "./data-table";
import useSWR from "swr";

async function getData(url: string): Promise<DataColumns[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from API");
    }

    const result = await response.json();

    // Assuming your API response contains a "data" field with the array of items
    return result.data.rows.map((item: any) => ({
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
  const { data, isLoading, error } = useSWR(
    "/api/real-estates?getAll=true&isAuth=false",
    getData
  );

  return (
    <div className="container mx-auto py-10 px-2">
      <div className="flex flex-row justify-between items-center">
        <h1>Xét duyệt</h1>
      </div>
      {isLoading || error ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
}
