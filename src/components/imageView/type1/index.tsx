"use client";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

const dataImage = [
  "https://swiperjs.com/demos/images/nature-1.jpg",
  "https://swiperjs.com/demos/images/nature-2.jpg",
  "https://swiperjs.com/demos/images/nature-3.jpg",
  "https://swiperjs.com/demos/images/nature-4.jpg",
  "https://swiperjs.com/demos/images/nature-5.jpg",
  "https://swiperjs.com/demos/images/nature-6.jpg",
  "https://swiperjs.com/demos/images/nature-7.jpg",
];

export default function App() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [index, setIndex] = useState(-1); // Chỉ số ảnh đang được mở lightbox

  return (
    <>
      <div className="space-y-2">
        {/* Swiper chính */}
        <Swiper
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {dataImage.map((image, idx) => (
            <SwiperSlide key={idx} onClick={() => setIndex(idx)}>
              <Image
                width={500}
                height={500}
                src={image}
                alt={`Picture ${idx + 1}`}
                className="object-cover h-full w-full max-h-[55dvh] aspect-[4/3] cursor-pointer"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Swiper thumbnail */}
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4.5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {dataImage.map((image, idx) => (
            <SwiperSlide key={idx}>
              <Image
                width={500}
                height={500}
                src={image}
                alt={`Thumbnail ${idx + 1}`}
                className="object-cover aspect-[4/3] cursor-pointer"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Lightbox */}
      <Lightbox
        slides={dataImage.map((image) => ({ src: image }))}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </>
  );
}
