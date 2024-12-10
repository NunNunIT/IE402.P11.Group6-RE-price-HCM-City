import { SearchResultCards } from "./components";
import { Suspense } from "react";

export default async function SearchResultPage({ searchParams }: IDefaultPageProps) {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 min-h-[100dvh] w-full">
      <Suspense fallback={<>Loading...</>}>
        <SearchResultCards {...{ searchParams }} />
      </Suspense>
    </div>
  );
}
