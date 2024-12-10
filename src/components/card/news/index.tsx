import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  _id?: string;
  imgUrl?: string;
  title?: string;
}

const NewsCard = ({ data }: { data?: NewsCardProps }) => {
  return (
    <Link href={data?._id ? `/news/${data._id}` : "#"}>
      <div className="group max-w-sm rounded-xl bg-white dark:bg-zinc-900 shadow-md transition-shadow aspect-[3/3.5]">
        <div className="relative">
          <Image
            width={1000}
            height={500}
            src={
              data?.imgUrl ??
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_bAXVHDcDBMxLlnI1s6ECD6n0IEw-EyP-WBSCqEe0TqFWd1tt7gR1M69uJBkKhju9Wng&usqp=CAU"
            }
            alt={data?.title ?? "Name"}
            className="object-cover w-full h-48 aspect-[4/3] group-hover:scale-105 ease-in duration-300"
          />
        </div>
        <div className="p-2">
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 truncate line-clamp-3">
            {data?.title ?? "Name"}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
