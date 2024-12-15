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

    let realEstate = await RealEstate
      .findById(id)
      .populate("owner", "username avt")
      .lean();

    const { locate } = realEstate as any;

    if (!realEstate)
      return notFoundResponse({
        message: "Không tìm thấy bất động sản",
        error: "REAL_ESTATE_NOT_FOUND"
      });

    const locations = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/locate?sort:locate${locate.lat},${locate.long}&limit=24`)
      .then(res => res.json())
      .then(payload => payload.data);
    return successResponse({ data: { ...realEstate, locations } });
  } catch (error) {
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error
    });
  }
}