"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Lazy load các component
const RealEstateCard = dynamic(() => import("@/components/card/realestate"));
const LocationCard = dynamic(() => import("@/components/card/location"));

export default function Wrapper({
  typeCard,
}: {
  typeCard: "realEstate" | "location";
}) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);

      try {
        let url = "";

        if (typeCard === "realEstate") {
          url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me/favRealEstate`;
        } else if (typeCard === "location") {
          url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me/favLocation`;
        }

        console.log("Fetching URL:", url); // Log URL để kiểm tra

        if (!url) {
          console.error("Giá trị typeCard không hợp lệ!");
          setLoading(false);
          return;
        }

        const response = await fetch(url);

        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const { data } = await response.json();

        // Kiểm tra dữ liệu trả về
        console.log(`Dữ liệu ${typeCard} nhận được:`, data);

        // Thêm typeCard vào từng mục
        const processedData = data.map((item: any) => ({
          ...item,
          typeCard,
        }));

        setItems(processedData);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [typeCard]);

  // Render các thẻ (cards)
  const renderCards = () => {
    if (typeCard === "realEstate") {
      return items.map((item, index) => (
        <RealEstateCard
          key={index}
          data={{
            _id: item._id,
            title: item.title,
            imageUrl: item.imageUrls?.[0],
            locate: item.locate,
            price: item.price,
            area: item.area,
          }}
        />
      ));
    } else if (typeCard === "location") {
      return items.map((item, index) => (
        <LocationCard
          key={index}
          data={{
            _id: item._id,
            title: item.title,
            imageUrl: item.imageUrl,
            locate: item.locate,
            category: item.category,
            avgStarGGMap: item.avgStarGGMap,
          }}
        />
      ));
    }
    return null;
  };

  return (
    <div className="w-full grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 md:p-0 p-2">
      {loading ? (
        <div className="col-span-full text-center">Đang tải...</div>
      ) : items.length > 0 ? (
        renderCards()
      ) : (
        <div className="col-span-full text-center">
          Không có mục nào trong danh sách.
        </div>
      )}
    </div>
  );
}
