"use client";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function SaveBtn({
  component = "location",
}: {
  component: string;
}) {
  const [like, setLike] = useState(false);

  const type = component == "location" ? "địa điểm" : "bất động sản";

  const onLike = async () => {
    setLike(!like);
    like !== true
      ? toast({
          title: `Bạn đã lưu ${type}`,
        })
      : toast({
          title: `Bạn đã bỏ lưu ${type}`,
        });
  };

  return (
    <>
      {!like ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={onLike}>
              <FaRegHeart className="size-6 text-gray-600 hover:text-rose-600" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Lưu bất động sản này</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={onLike}>
              <FaHeart className="size-6 text-rose-600" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Bỏ lưu bất động sản này</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
}
