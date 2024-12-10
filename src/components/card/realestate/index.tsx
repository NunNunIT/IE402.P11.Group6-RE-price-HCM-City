import { HiOutlineLocationMarker } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { LucideDot } from "lucide-react";
import { SaveBtn } from "@/components";

interface RealEstateCardProps {
  _id?: string;
  title?: string;
  imageUrl?: string;
  locate?: locate;
  price?: number;
  area?: number;
}

interface Props {
  data: RealEstateCardProps;
}

const RealEstateCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="group max-w-sm transition-shadow shadow-lg hover:shadow-xl rounded-xl overflow-hidden flex flex-col justify-between">
      <Link href={`/real-estate/${data?._id}`}>
        {/* Image */}
        <div className="relative h-48">
          <Image
            width={1000}
            height={500}
            src={
              data?.imageUrl ||
              "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/bb/a3/97/predator-ride-in-the.jpg?w=900&h=500&s=1"
            }
            alt={data?.title}
            className="object-cover w-full h-full group-hover:scale-105 ease-in duration-300"
          />
          <span className="absolute p-2 bg-black/60 bottom-0 w-full text-sm text-white truncate">
            {/* {locate?.diachi} */}
          </span>
        </div>
        {/* Content */}
        <div className="p-2 flex flex-col gap-2">
          <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 line-clamp-2">
            {data?.title}
          </h3>
          <div className="text-sm text-zinc-500 flex gap-2 items-center">
            {data?.locate?.diachi} {", "} {data?.locate?.xa} {", "}
            {data?.locate?.huyen} {", "}
            {data?.locate?.tinh}
          </div>
        </div>
      </Link>
      {/* Footer */}
      <div className="w-full flex flex-row gap-2 justify-between items-center px-4 pb-4">
        <SaveBtn component="real-estate" />
        <div className="flex gap-2 items-center">
          <p className="text-lg font-bold text-red-500">
            {data?.area} m<sup>2</sup>
          </p>
          <LucideDot className="text-red-500" />
          <p className="text-lg font-bold text-red-500">{data?.price} tỷ</p>
        </div>
      </div>
    </div>
  );
};

export default RealEstateCard;
