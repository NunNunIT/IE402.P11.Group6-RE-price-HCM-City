import { badRequestResponse, errorResponse, haversineDistance, notFoundResponse, sortHandler, successResponse } from "@/utils";

import { NextRequest } from "next/server";
import { Location, RealEstate } from "@/lib/model"
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

    if (!realEstate)
      return notFoundResponse({
        message: "Không tìm thấy bất động sản",
        error: "REAL_ESTATE_NOT_FOUND"
      });

    const { locate } = realEstate as any;
    const { locateSort } = sortHandler(`locate:${locate.lat},${locate.long}`);
    let locations = await Location.find().select("title locate category").lean();
    const temp = locations.map(location => {
      const distance = haversineDistance(locateSort, location.locate);
      return ({ ...location, distance });
    });
    temp.sort((a, b) => a.distance - b.distance);
    locations = temp.map(({ distance: __distance, ...location }) => ({ ...location }))
      .slice(0, 24);

    return successResponse({ data: { ...realEstate, locations } });
  } catch (error) {
    console.error('>> Error in @GET /api/real-estates/[id]:', error.message);
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error
    });
  }
}