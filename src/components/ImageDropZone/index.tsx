"use client";

// import libs
import { useDropzone } from "react-dropzone";
import { CloudUpload } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

// import icons
import { IoCloseOutline } from "react-icons/io5";

// import components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ImageDropZone = ({
  value,
  onChange,
}: {
  value: string[];
  onChange: (newImages: string[]) => void;
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [deleteImgOpen, setDeleteImgOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(-1);

  // Xử lý kéo/thả file
  const handleDrop = (acceptedFiles: File[]) => {
    const blobUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
    const updatedImages = [...value, ...blobUrls];
    onChange(updatedImages);
  };

  // Xử lý xóa ảnh
  const handleDeleteImage = (index: number) => {
    const newImagePreviews = [...value];
    const removedBlobUrl = newImagePreviews.splice(index, 1)[0];

    // Giải phóng blob URL
    URL.revokeObjectURL(removedBlobUrl);

    onChange(newImagePreviews);
    setImgIndex(-1);
    setDeleteImgOpen(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/webp": [".webp"],
    },
    onDrop: handleDrop,
  });

  return (
    <div className="relative w-full flex flex-col items-center justify-center mx-auto gap-2">
      <div
        {...getRootProps({
          className:
            "w-full flex justify-center h-32 transition bg-zinc-200 border-2 border-dashed rounded-md cursor-pointer hover:border-zinc-400 focus:outline-none",
        })}
      >
        <span className="flex flex-col justify-center items-center gap-1">
          <CloudUpload />
          <span className="font-medium text-base text-zinc-800">
            Bấm để chọn ảnh cần tải lên
          </span>
          <span className="font-medium text-base text-zinc-600">
            hoặc kéo thả ảnh vào đây
          </span>
        </span>
        <input {...getInputProps()} />
      </div>

      <div className="relative w-full overflow-hidden">
        <Swiper
          // style={{
          //   // "--swiper-navigation-color": "#fff",
          //   // "--swiper-pagination-color": "#fff",
          // }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}
          modules={[FreeMode, Navigation, Thumbs]}
          className="relative mb-2"
        >
          {value.map((src, index) => (
            <SwiperSlide key={`preview-img-${index}`}>
              <div className="relative">
                <div
                  className="relative aspect-[16/9] cursor-pointer"
                  onClick={() => window.open(src, "_blank")}
                >
                  <Image
                    loading="lazy"
                    src={src}
                    alt={`preview-${index}`}
                    className="object-contain"
                    fill={true}
                  />
                </div>
                <div
                  className="absolute top-2 right-2 p-1 rounded-full bg-black/50 hover:bg-red-500/90 hover:text-white cursor-pointer"
                  onClick={() => {
                    setDeleteImgOpen(true);
                    setImgIndex(index);
                  }}
                >
                  <IoCloseOutline className="w-3 h-3" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Dialog open={deleteImgOpen} onOpenChange={setDeleteImgOpen}>
        <DialogContent className="mxs:max-w-md">
          <DialogHeader>
            <DialogTitle>Xóa ảnh</DialogTitle>
            <DialogDescription>Bạn có chắc muốn xóa ảnh?</DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-row justify-between">
            <Button
              type="button"
              variant="blue"
              onClick={() => setDeleteImgOpen(false)}
            >
              Đóng
            </Button>
            <Button
              type="button"
              variant="delete"
              onClick={() => {
                if (imgIndex !== -1) handleDeleteImage(imgIndex);
              }}
            >
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageDropZone;
