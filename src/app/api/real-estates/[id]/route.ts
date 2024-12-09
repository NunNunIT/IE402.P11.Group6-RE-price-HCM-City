import { badRequestResponse, errorResponse, notFoundResponse, successResponse } from "@/utils";

import { NextRequest } from "next/server";
import { RealEstate } from "@/lib/model"
import { isValidObjectId } from "mongoose";

export const GET = async (req: NextRequest, { params: { id } }: { params: { id: string } }) => {
  try {
    if (!id || !isValidObjectId(id))
      return badRequestResponse({
        message: "ID không hợp lệ",
        error: "ID_IS_INVALID"
      });

    let realEstate = await RealEstate.findById(id).lean();

    if (!realEstate)
      return notFoundResponse({
        message: "Không tìm thấy bất động sản",
        error: "REAL_ESTATE_NOT_FOUND"
      });

    return successResponse({ data: realEstate });
  } catch (error) {
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error
    });
  }
}