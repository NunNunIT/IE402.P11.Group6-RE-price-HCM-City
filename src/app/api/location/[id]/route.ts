import {
  badRequestResponse,
  errorResponse,
  forbiddenResponse,
  notFoundResponse,
  successResponse,
} from "@/utils";

import { NextRequest } from "next/server";
import { Location } from "@/lib/model";
import { isValidObjectId } from "mongoose";
import { auth } from "@/lib/auth";
import { NextAuthRequest } from "node_modules/next-auth/lib";

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

    let location = await Location.findById(id).lean();

    if (!location)
      return notFoundResponse({
        message: "Không tìm thấy địa điểm",
        error: "LOCATIONLOCATION_NOT_FOUND",
      });

    return successResponse({ data: location });
  } catch (error) {
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error,
    });
  }
};

export const PUT = auth(
  async (
    req: NextAuthRequest,
    { params: { id } }: { params: { id: string } }
  ) => {
    try {
      const session = req.auth;
      const role = session?.user?.role;
      if (!role || role != "Admin") return forbiddenResponse();

      if (!id || !isValidObjectId(id))
        return badRequestResponse({
          message: "ID không hợp lệ",
          error: "ID_IS_INVALID",
        });

      const updatedLocation = await req.json();
      console.log(updatedLocation);
      return successResponse();
      let location = await Location.findById(id);

      if (!location)
        return notFoundResponse({
          message: "Không tìm thấy địa điểm",
          error: "LOCATIONLOCATION_NOT_FOUND",
        });

      const updatedData = {
        ggMapId: updatedLocation.ggMapId || location.ggMapId,
        ggMapUrl: updatedLocation.ggMapUrl || location.ggMapUrl,
        title: updatedLocation.title || location.title,
        desc: updatedLocation.desc || location.desc,
        category: updatedLocation.category || location.category,
        locate: updatedLocation.locate || location.locate,
        imageUrls: updatedLocation.imageUrls || location.imageUrls,
        avgStarGGMap: updatedLocation.avgStarGGMap || location.avgStarGGMap,
        exts: updatedLocation.exts || location.exts,
        owner: location.owner,
        createdAt: location.createdAt,
        updatedAt: new Date(),
      };

      location = await Location.findByIdAndUpdate(id, updatedData, {
        new: true,
      });

      return successResponse({
        message: "Cập nhật thông tin địa điểm thành công",
        data: location,
      });
    } catch (error) {
      return errorResponse({
        message: "Đã có lỗi xảy ra khi cập nhật thông tin địa điểm",
        error,
      });
    }
  }
);

export const DELETE = auth(
  async (
    req: NextAuthRequest,
    { params: { id } }: { params: { id: string } }
  ) => {
    try {
      const session = req.auth;
      const userId = session?.user?.id;
      const role = session?.user?.role;
      if (!userId || !isValidObjectId(userId) || !role || role != "Admin")
        return forbiddenResponse();

      if (!id || !isValidObjectId(id))
        return badRequestResponse({
          message: "ID không hợp lệ",
          error: "ID_IS_INVALID",
        });

      let location = await Location.findById(id);

      if (!location)
        return notFoundResponse({
          message: "Không tìm thấy địa điểm",
          error: "LOCATION_NOT_FOUND",
        });

      // Xóa địa điểm
      await Location.findByIdAndDelete(id);

      return successResponse({
        message: "Xóa địa điểm thành công",
      });
    } catch (error) {
      return errorResponse({
        message: "Đã có lỗi xảy ra khi xóa địa điểm",
        error,
      });
    }
  }
);
