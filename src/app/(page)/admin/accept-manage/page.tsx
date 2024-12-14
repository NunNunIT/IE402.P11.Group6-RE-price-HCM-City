import { DataColumns, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<DataColumns[]> {
  // Fetch data from your API here.
  return [
    {
      _id: "728ed52f",
      title: "Tên bất động sản",
      price: 100,
      area: 25,
      fullAddress: "Địa chỉ đầy đủ đã qua chỉnh sửa ở API 6",
      isAuth: false,
    },
    {
      _id: "728ed52f",
      title: "Tên bất động sản",
      price: 100,
      area: 25,
      fullAddress: "Địa chỉ đầy đủ đã qua chỉnh sửa ở API 5",
      isAuth: false,
    },
    {
      _id: "728ed52f",
      title: "Tên bất động sản",
      price: 100,
      area: 25,
      fullAddress: "Địa chỉ đầy đủ đã qua chỉnh sửa ở API 4",
      isAuth: false,
    },
    {
      _id: "728ed52f",
      title: "Tên bất động sản",
      price: 100,
      area: 25,
      fullAddress: "Địa chỉ đầy đủ đã qua chỉnh sửa ở API 3",
      isAuth: false,
    },
    {
      _id: "728ed52f",
      title: "Tên bất động sản",
      price: 100,
      area: 25,
      fullAddress: "Địa chỉ đầy đủ đã qua chỉnh sửa ở API 2",
      isAuth: false,
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10 px-2">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
