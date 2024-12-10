import Image from "next/legacy/image";
import React from "react";
import { PostCardProps } from "@/types/user";
import Link from "next/link";

const PostCard: React.FC<PostCardProps> = ({
  image,
  title,
  location,
  postId,
  postDate,
  expiryDate,
  status,
}) => {
  return (
    <div className="bg-white rounded-lg w-full sm:h-[300px]  shadow-md border border-gray-200 max-w-3xl flex flex-col sm:flex-row overflow-hidden">
      <div className="relative w-full h-[250px] sm:w-1/3  sm:h-full">
        <Image
          src={image}
          alt="Property Thumbnail"
          layout="fill"
          objectFit="cover"
          className="rounded-lg "
        />
      </div>

      {/* Content Section */}
      <div className="sm:w-2/3 p-4 flex flex-col">
        {/* Status Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-green-500 w-[150px] h-full flex items-center justify-center text-white text-sm font-semibold px-2 py-1 rounded">
            {status}
          </span>

          <Link
            href="#"
            className="text-gray-800 line-clamp-2 font-bold text-lg leading-snug min-h-[3.15rem]"
          >
            {title}
          </Link>
        </div>

        {/* Metadata */}
        <div className="text-sm text-gray-500 mb-4">
          <p>{location}</p>
          <p>
            Mã tin: <span className="font-medium text-gray-700">{postId}</span>
          </p>
          <p>
            Ngày đăng:{" "}
            <span className="font-medium text-gray-700">{postDate}</span>
          </p>
          <p>
            Ngày hết hạn:{" "}
            <span className="font-medium text-gray-700">{expiryDate}</span>
          </p>
        </div>

        {/* Placeholder for stats */}
        <div className="bg-gray-100 text-center text-gray-500 rounded-lg py-4 border border-dashed border-gray-300 mb-4">
          <p>Thông tin này chưa có dữ liệu thống kê</p>
        </div>

        {/* Edit Button */}
        <div className="mt-auto">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
            Sửa tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
