import {
  badRequestResponse,
  errorResponse,
  notFoundResponse,
  successResponse,
} from "@/utils";

import { NextRequest } from "next/server";
import { News } from "@/lib/model";
import { isValidObjectId } from "mongoose";

export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    if (!id || !isValidObjectId(id)) {
      return badRequestResponse({
        message: "ID không hợp lệ",
        error: "ID_IS_INVALID",
      });
    }

    const news = await News.findById(id)
      .populate({ path: "owner", select: "avt username" })
      .lean();

    if (!news) {
      return notFoundResponse({
        message: "Không tìm thấy bất động sản",
        error: "REAL_ESTATE_NOT_FOUND",
      });
    }

    return successResponse({ data: news });
  } catch (error) {
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error,
    });
  }
};
