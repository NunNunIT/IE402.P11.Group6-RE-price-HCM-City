import dynamic from "next/dynamic";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; // Import Breadcrumb components
import { Slash } from "lucide-react";

const SearchCardWrapper = dynamic(
  () => import("./components").then((mod) => mod.SearchCardWrapper),
  { ssr: false, loading: () => <>Loading...</> }
);

export default async function SearchResultPage({
  searchParams,
}: IDefaultPageProps) {
  return (
    <div>
      <div className="w-full p-2 mb-4 mx-auto">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <a href="/">Trang chủ</a>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <a href="/search-result">Kết quả tìm kiếm</a>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 min-h-[100dvh] w-full">
        <SearchCardWrapper {...{ searchParams }} />
      </div>
    </div>
  );
}
