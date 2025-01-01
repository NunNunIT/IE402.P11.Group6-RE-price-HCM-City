import dynamic from "next/dynamic";
import type { Metadata } from "next";
// import { MapControllerProvider } from "./components";
const MapControllerProvider = dynamic(
  () => import("./components").then((mod) => mod.MapControllerProvider),
  { ssr: false, loading: () => <p>Loading...</p> }
)

export const metadata: Metadata = {
  title: "Kết quả tìm kiếm bất động sản",
  description: "Trang hiển thị kết quả tìm kiếm bất động sản",
};

const SearchCardWrapper = dynamic(
  () => import("./components").then((mod) => mod.SearchCardWrapper),
  { ssr: false, loading: () => <p>Loading...</p> }
);

export default async function SearchResultPage({
  searchParams,
}: IDefaultPageProps) {
  return (
    <MapControllerProvider>
      <div className="grid md:grid-cols-2 grid-cols-1 min-h-[100dvh] w-full">
        <SearchCardWrapper {...{ searchParams }} />
      </div>
    </MapControllerProvider>
  );
}
