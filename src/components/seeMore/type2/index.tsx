"use client";

import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const RealEstateCard = dynamic(() => import("@/components/card/realestate"));
const NewsCard = dynamic(() => import("@/components/card/news"));
const LocationCard = dynamic(() => import("@/components/card/location"));

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((payload) => payload.data?.rows);

export default function SeeMore({
  typeCard,
  seeMoreLink,
  title,
  linkFetch,
}: {
  typeCard?: string;
  fetchLink?: string;
  seeMoreLink?: string;
  title?: string;
  linkFetch?: string;
}) {
  const { data, error, isLoading } = useSWR(linkFetch, fetcher);

  if (error) return <div>Error loading data: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  console.log("Fetched Data:", data);

  const RenderCard = () => {
    return (
      <>
        {data?.map((item: any, index: any) => (
          <Link
            href={item?._id ? `/news/${item._id}` : "#"}
            key={index}
            className="group grid grid-cols-[1fr_3fr] gap-2"
          >
            <Image
              width={100}
              height={100}
              src={
                item?.imgUrl ??
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_bAXVHDcDBMxLlnI1s6ECD6n0IEw-EyP-WBSCqEe0TqFWd1tt7gR1M69uJBkKhju9Wng&usqp=CAU"
              }
              alt={item?.title ?? "Name"}
              className="object-cover w-20 h-20 aspect-[1/1] group-hover:scale-105 ease-in duration-300"
              unoptimized
            />
            <p>{item?.title ?? "Name"}</p>
          </Link>
        ))}
      </>
    );
  };

  return (
    <div className="w-full flex flex-col gap-6 justify-center items-center">
      <div className="w-full border-b border-zinc-200 dark:border-zinc-800 py-2 mb-3 flex flex-row justify-between items-center">
        <h3 className="font-semibold text-2xl text-zinc-900 dark:text-white">
          {title}
        </h3>
      </div>
      <div className="w-full grid grid-cols-1 gap-6">{RenderCard()}</div>
      {seeMoreLink && <Button variant="link" href={seeMoreLink ?? "#"}>Xem thêm</Button>}
    </div>
  );
}
