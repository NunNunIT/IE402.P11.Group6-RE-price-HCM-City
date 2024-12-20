import {
  retry,
  badRequestResponse,
  errorResponse,
  notFoundResponse,
  successResponse,
} from "@/utils";

import { NextRequest } from "next/server";
import { RealEstate } from "@/lib/model";
import { isValidObjectId } from "mongoose";

export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    if (!id || !isValidObjectId(id))
      return badRequestResponse({
        message: "ID không hợp lệ",
        error: "ID_IS_INVALID",
      });

    let realEstate = await retry(() =>
      RealEstate.findById(id)
        .populate("owner", "username avt email phone")
        .populate("polygon", "points")
        .lean()) as { [key: string]: any };

    if (!realEstate)
      return notFoundResponse({
        message: "Không tìm thấy bất động sản",
        error: "REAL_ESTATE_NOT_FOUND",
      });

    // const { locate } = realEstate as any;
    // const { locateSort } = sortHandler(`locate:${locate.lat},${locate.long}`);
    // let locations = (await Location.find({ district: realEstate.district })
    //   .select("title locate category imageUrls")
    //   .lean()) as any[];
    // const temp = locations.map((location) => {
    //   const distance = haversineDistance(locateSort, location.locate);
    //   return { ...location, distance };
    // });
    // temp.sort((a, b) => a.distance - b.distance);
    // locations = temp
    //   .map(({ distance: __distance, imageUrls, ...location }) => ({
    //     ...location,
    //     imageUrl: imageUrls?.[0],
    //   }))
    //   .slice(0, 24);

    return successResponse({ data: realEstate });
  } catch (error) {
    console.error(">> Error in @GET /api/real-estates/[id]:", error.message);
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error,
    });
  }
};

export const DELETE = async (
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

    const realEstate = await RealEstate.findById(id);

    if (!realEstate) {
      return notFoundResponse({
        message: "Không tìm thấy bất động sản",
        error: "REAL_ESTATE_NOT_FOUND",
      });
    }

    await RealEstate.deleteOne({ _id: id });

    return successResponse({
      message: "Xóa bất động sản thành công",
      data: { id },
    });
  } catch (error) {
    console.error(">> Error in @DELETE /api/real-estates/[id]:", error.message);
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error,
    });
  }
};
