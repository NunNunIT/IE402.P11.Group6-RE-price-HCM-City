"use client";

// Import libraries
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload, ChevronDown } from "lucide-react";
import Image from "next/image";

// Import components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GoPencil } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SingleImgDropZone = ({
  value,
  onChange,
  onDelete = (__: any) => {},
  trigger = (__: any) => {},
  triggerPath = "",
  required = false,
}: {
  value: string;
  onChange: (...__event: any[]) => void;
  onDelete?: any;
  trigger?: any;
  triggerPath?: string;
  required?: boolean;
}) => {
  const [ownerImagePreviews, setOwnerImagePreviews] = useState<string>(value);
  const [imgLink, setImgLink] = useState<string>(ownerImagePreviews);
  const [openPopup, setOpenPopup] = useState(false);
  const [deleteImgOpen, setDeleteImgOpen] = useState(false);

  const handleDrop = (acceptedFiles: File[]) => {
    const previousImageUrl = ownerImagePreviews;

    // Xoá hình ảnh cũ trước khi thêm hình ảnh mới
    if (previousImageUrl && previousImageUrl.startsWith("https://res.cloudinary.com")) {
      onDelete(previousImageUrl);
    }

    const imageUrl = URL.createObjectURL(acceptedFiles[0]);
    setOwnerImagePreviews(imageUrl);
    onChange(imageUrl);
    trigger(triggerPath);
  };

  // Gọi onDelete khi xóa ảnh
  const handleDeleteImage = () => {
    onDelete(ownerImagePreviews);
    setOwnerImagePreviews("");
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/webp": [".webp"],
    },
    multiple: false,
    onDrop: handleDrop,
  });

  return (
    <div className="flex flex-col items-end">
      <Dialog open={openPopup} onOpenChange={setOpenPopup}>
        <DialogTrigger>
          <Button
            type="button"
            variant="ghost"
            className="text-blue-400"
            onClick={() => setImgLink(ownerImagePreviews)}
          >
            Ảnh
            <ChevronDown />
          </Button>
        </DialogTrigger>

        <DialogContent className="mxs:max-w-md mxs:max-h-[600px]">
          <DialogHeader>
            <DialogTitle>Ảnh</DialogTitle>
          </DialogHeader>

          <Input
            value={imgLink}
            onChange={(e) => setImgLink(e.target.value)}
            // onDoubleClick={async () => setImgLink(await navigator.clipboard.readText())}
            // onPaste={async () => setImgLink(await navigator.clipboard.readText())}
            // onKeyDown={(e) => {
            //   if (e.key === "Backspace") setImgLink("");
            // }}
            placeholder="Thêm ảnh"
            className="dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900"
          />

          <DialogFooter className="flex flex-row justify-between">
            <Button type="button" variant="ghost" onClick={() => setOpenPopup(false)}>
              Đóng
            </Button>
            <Button
              type="button"
              variant="blue"
              onClick={() => {
                if (imgLink && imgLink.startsWith("https://")) {
                  setOwnerImagePreviews(imgLink);
                  onChange(imgLink);
                }
                setOpenPopup(false);
                setImgLink("");
              }}
            >
              Thêm ảnh
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div
        {...getRootProps({
          className:
            "relative aspect-square max-h-[50dvh] rounded-md w-full flex justify-center transition bg-zinc-200 border-2 border-dashed dark:border-zinc-700 appearance-none cursor-pointer hover:border-zinc-400 focus:outline-none dark:bg-zinc-800",
        })}
      >
        {ownerImagePreviews ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Image
              loading="lazy"
              src={ownerImagePreviews}
              alt="preview thumbnail"
              className="relative object-cover"
              fill={true}
            />
            <div
              className="absolute top-2 right-2 p-1 rounded-full bg-black/50 hover:bg-red-500/90 hover:text-white cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteImgOpen(true);
              }}
            >
              <IoClose className="w-3 h-3" />
            </div>
            <div className="absolute rounded-full p-1 bottom-1 right-1 bg-zinc-300 dark:bg-zinc-700">
              <GoPencil className="w-6 h-6 text-zinc-800 dark:text-zinc-200" />
            </div>
          </>
        ) : (
          <span className="flex flex-col justify-center items-center gap-1">
            <CloudUpload />
            <span className="text-center font-medium text-base text-zinc-800 dark:text-zinc-200">
              {required && <span className="text-red-500"> * </span>} Thêm
            </span>
          </span>
        )}
        <input {...getInputProps()} />
      </div>

      <Dialog open={deleteImgOpen} onOpenChange={setDeleteImgOpen}>
        <DialogContent className="mxs:max-w-md">
          <DialogHeader>
            <DialogTitle>Xóa ảnh</DialogTitle>
          </DialogHeader>

          <DialogFooter className="flex flex-row justify-between">
            <Button type="button" variant="blue" onClick={() => setDeleteImgOpen(false)}>
              Đóng
            </Button>
            <Button
              type="button"
              variant="delete"
              onClick={() => {
                handleDeleteImage();
                setDeleteImgOpen(false);
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

export default SingleImgDropZone;
