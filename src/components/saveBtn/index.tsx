"use client";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCallback, useState } from "react";

import { toast } from "@/hooks/use-toast";
import { useAuthWrapperFunction } from "@/hooks";

export default function SaveBtn({
  component = "location",
}: {
  component: string;
}) {
  const [like, setLike] = useState(false);

  const type = component == "location" ? "địa điểm" : "bất động sản";

  const onLike = useCallback(async () => {
    setLike((prev) => {
      toast({
        title: `Bạn đã ${prev ? "bỏ lưu" : "lưu"} ${type}`,
      });
      return !prev;
    });
  }, [type]);

  const onLikeWrapper = useAuthWrapperFunction(onLike);

  return (
    <>
      {!like ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={onLikeWrapper}>
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
            <TooltipTrigger onClick={onLikeWrapper}>
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
