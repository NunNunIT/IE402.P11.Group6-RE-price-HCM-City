import { SearchCardWrapper } from "./components";
import { Suspense } from "react";

export default async function SearchResultPage({ searchParams }: IDefaultPageProps) {
  return (
    <div className="w-full min-h-[100dvh]">
      <Suspense fallback={<>Loading...</>}>
        <SearchCardWrapper {...{ searchParams }} />
      </Suspense>
    </div>
  );
}
