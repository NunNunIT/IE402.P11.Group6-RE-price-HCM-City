import dynamic from "next/dynamic";
const SearchCardWrapper = dynamic(
  () => import("./components").then(mod => mod.SearchCardWrapper),
  { ssr: false, loading: () => <>Loading...</> }
);

<<<<<<< HEAD
export default function SearchResultPage() {
  const sampleImages = [
    "https://photo.rever.vn/v3/get/rvhe0PS+4VVS4Z8WZzoVBQToU5B4zzCZg5f9dc2EdjtJdprSpJtPtK0VShcsHCoQDDJ3cXBnMshiyvde_rN47nHA==/750x500/image.jpg",
    "https://photo.rever.vn/v3/get/rvhe0PS+4VVS4Z8WZzoVBQToU5B4zzCZg5f9dc2EdjtJdprSpJtPtK0VShcsHCoQDDJ3cXBnMshiyvde_rN47nHA==/750x500/image.jpg",
    "https://photo.rever.vn/v3/get/rvhe0PS+4VVS4Z8WZzoVBQToU5B4zzCZg5f9dc2EdjtJdprSpJtPtK0VShcsHCoQDDJ3cXBnMshiyvde_rN47nHA==/750x500/image.jpg",
    "https://photo.rever.vn/v3/get/rvhe0PS+4VVS4Z8WZzoVBQToU5B4zzCZg5f9dc2EdjtJdprSpJtPtK0VShcsHCoQDDJ3cXBnMshiyvde_rN47nHA==/750x500/image.jpg",
  ];
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 min-h-[100dvh] w-full">
      <div className="w-full h-full bg-white dark:bg-zinc-900 p-3 space-y-3">
        <div className="w-full max-w-4xl mx-auto my-auto z-10 md:px-0">
          <SearchTab />
        </div>
        <div className="px-4">
          <h1>Bất động sản tại Quận 1</h1>
          <p>Hiện có 181 tin đăng bán tại khu vực này</p>
        </div>
        <div className="px-4 flex flex-col gap-4">
          <SearchResultCard images={sampleImages} />
          <SearchResultCard images={sampleImages} />
          <SearchResultCard images={sampleImages} />
        </div>
        <div className="px-4 flex flex-col gap-4">
          <h2>Tin tức</h2>
          <div className="grid grid-cols-3 gap-4">
            <NewsCard></NewsCard>
            <NewsCard></NewsCard>
            <NewsCard></NewsCard>
          </div>
        </div>
      </div>
      <GISMap className="container" />
=======
export default async function SearchResultPage({ searchParams }: IDefaultPageProps) {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 min-h-[100dvh] w-full">
      <SearchCardWrapper {...{ searchParams }} />
>>>>>>> 462bb4aa70ec7e01949e115d511fb324eb05ec53
    </div>
  );
}
