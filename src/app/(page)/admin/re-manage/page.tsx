import { DataColumns, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<DataColumns[]> {
  try {
    const response = await fetch("/api/real-estates?page=1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from API");
    }

    const result = await response.json();

    // Assuming your API response contains a "data" field with the array of items
    return result.data.map((item: any) => ({
      _id: item._id,
      title: item.title,
      price: item.price,
      area: item.area,
      fullAddress: item.fullAddress,
      isAuth: item.isAuth,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array if there's an error
  }
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10 px-2">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
