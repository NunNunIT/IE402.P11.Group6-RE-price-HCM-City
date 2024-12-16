"use client";

import { Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import { cn } from "@/lib/utils";

import "./carousel-wrapper.css";
import useSWR from "swr";
import { LocationCard, RealEstateCard } from "@/components/card";

interface ICarouselWrapperProps {
  loop?: boolean;
  className?: string;
  link: string;
  type: "location" | "realEstate";
}

const fetcher = async (url: string) => {
  const res = await fetch(url, { cache: "reload" });
  if (!res.ok) throw new Error("Failed to fetch data from API");
  const payload = await res.json();
  return payload.data;
}

export default function CarouselWrapper({ link, ...props }: ICarouselWrapperProps) {
  const { data, isLoading, error } = useSWR(link, fetcher)
  if (isLoading || error) return <p>Loading...</p>
  if (!data.length) return <p>No data found</p>
  return <CarouselWrapperSwipper data={data} {...props} />
}

interface ICarouselWrapperSwipperProps<T> {
  type: "location" | "realEstate";
  className?: string;
  data: T[];
  loop?: boolean;
}

const MAPPING_COMPONENT = {
  location: LocationCard,
  realEstate: RealEstateCard,
}

function CarouselWrapperSwipper<T>({
  type,
  className,
  data,
  loop,
}: ICarouselWrapperSwipperProps<T>) {
  const Component = MAPPING_COMPONENT[type];
  return (
    <Swiper
      // initialSlide={0}
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
      breakpoints={{
        200: { slidesPerView: 1, spaceBetween: 16 },
        300: { slidesPerView: 1, spaceBetween: 16 },
        400: { slidesPerView: 1, spaceBetween: 16 },
        500: { slidesPerView: 1, spaceBetween: 16 },
        640: { slidesPerView: 2, spaceBetween: 16 },
        768: { slidesPerView: 2, spaceBetween: 16 },
        821: { slidesPerView: 2, spaceBetween: 16 },
        868: { slidesPerView: 2, spaceBetween: 16 },
        1024: { slidesPerView: 2, spaceBetween: 16 },
      }}
      // freeMode={true}
      navigation={true}
      pagination={{ clickable: true }}
      loop={loop}
      modules={[Navigation, Pagination]}
      className={cn("carousel-set-wrapper relative mb-8", className)}
    >
      {data.map((data, index) => (
        <SwiperSlide key={index}>
          <Component data={data} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
