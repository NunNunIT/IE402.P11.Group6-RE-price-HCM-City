"use client";

import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuthWrapperFunction } from "@/hooks";

export default function SaveBtn({
  component = "real-estate",
  realEstateId,
}: {
  component: string;
  realEstateId: string;
}) {
  const [like, setLike] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const type = component === "real-estate" ? "bất động sản" : "địa điểm";

  // Fetch trạng thái ban đầu xem bất động sản đã được lưu hay chưa
  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me/favRealEstate`
        );

        if (response.ok) {
          const data = await response.json();
          const isLiked = data.data.some(
            (fav: { _id: string }) => fav._id === realEstateId
          );
          setLike(isLiked);
        } else {
          console.error("Failed to fetch saved real estates.");
        }
      } catch (error) {
        console.error("Error fetching initial state for SaveBtn:", error);
      }
    };

    fetchInitialState();
  }, [realEstateId]);

  const onLike = async () => {
    try {
      const method = like ? "DELETE" : "POST";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me/favRealEstate`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ realEstateId }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error("Error from API:", error);
        throw new Error(error.message || "Có lỗi xảy ra.");
      }

      // Cập nhật trạng thái "like" và hiển thị thông báo thành công
      setLike((prev) => {
        const newLikeState = !prev;

        // Hiển thị thông báo dựa trên trạng thái
        if (newLikeState) {
          setNotification("Đã thêm bất động sản vào danh sách yêu thích");
        } else {
          setNotification("Đã bỏ bất động sản khỏi danh sách yêu thích");
        }

        // Tự động ẩn thông báo sau 3 giây
        setTimeout(() => {
          setNotification(null);
        }, 3000);

        return newLikeState;
      });
    } catch (error: any) {
      console.error("Error caught in onLike:", error.message);

      // Hiển thị thông báo lỗi
      setNotification("Đã có lỗi xảy ra. Vui lòng thử lại.");
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const onLikeWrapper = useAuthWrapperFunction(onLike);

  return (
    <div className="relative">
      {/* Nút Save */}
      {!like ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={onLikeWrapper}>
              <FaRegHeart className="size-6 text-gray-600 hover:text-red-600" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Lưu bất động sản này</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={onLikeWrapper}>
              <FaHeart className="size-6 text-red-600" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Bỏ lưu bất động sản này</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {/* Thông báo */}
      {notification && (
        <div className="fixed bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in z-50">
          {notification}
        </div>
      )}
    </div>
  );
}
