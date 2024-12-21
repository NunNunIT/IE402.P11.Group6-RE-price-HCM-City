import {
  errorResponse,
  forbiddenResponse,
  haversineDistance,
  isNotNullAndUndefined,
  retry,
  sortHandler,
  successResponse,
} from "@/utils";

import { Location } from "@/lib/model";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { NextAuthRequest } from "node_modules/next-auth/lib";
import { isValidObjectId, Types } from "mongoose";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  // Lấy các tham số từ query
  const province = searchParams.get("province");
  const district = searchParams.get("district");
  const ward = searchParams.get("ward");
  const limit = Number(searchParams.get("limit") ?? 12);
  const page = Number(searchParams.get("page") ?? 1);
  const title = searchParams.get("title") || ""; // Tìm kiếm theo title
  const sort = searchParams.getAll("sort"); // Sắp xếp theo thời gian đăng, mặc định là giảm dần
  const getAll = searchParams.get("getAll") === "true"; // Chuyển getAll thành boolean

  try {
    const { locateSort, mongooseSort } = sortHandler(sort);

    const filter = {
      ...(province ? { "locate.tinh": province } : {}),
      ...(district ? { "locate.huyen": district } : {}),
      ...(ward ? { "locate.xa": ward } : {}),
      ...(title ? { title: { $regex: title, $options: "i" } } : {}),
    }

    const query = Location
      .find(filter)
      .select("-description")
      .populate("owner", "username avt")
      .sort(mongooseSort)

    let [locations] = await Promise.all([
      retry(() =>
        getAll || locateSort.useHaversine
          // ! LIMIT 100
          ? query.limit(100).lean()
          : query.skip((page - 1) * limit).limit(limit).lean()
      )
    ]);

    const total = locations.length;

    if (locateSort.useHaversine) {
      const temp = locations
        .map((location) => {
          const distance = haversineDistance(locateSort, location.locate);
          return { ...location, distance };
        })
        .filter(({ distance }) => isNotNullAndUndefined(distance));
      temp.sort((a, b) => a.distance - b.distance);
      locations = temp.map(({ distance: __distance, ...location }) => ({
        ...location,
      }));
      if (!getAll) {
        locations = locations.slice((page - 1) * limit, page * limit);
      }
    }

    locations = locations.map(({ imageUrls, ...location }) => ({
      ...location,
      imageUrl: imageUrls?.[0],
    }));

    return successResponse({
      data: { rows: locations, total },
    });
  } catch (error) {
    console.error("Error in @GET /api/locations:", error.message);
    return errorResponse({
      message: "Đã có lỗi xảy ra khi lấy danh sách địa điểm",
      error,
    });
  }
};

export const POST = auth(
  async (req: NextAuthRequest): Promise<NextResponse> => {
    try {
      const session = req.auth;
      const role = session?.user?.role;
      const userId = session?.user?.id;

      if (!role || role != "Admin" || !userId || !isValidObjectId(userId))
        return forbiddenResponse();
      const body = await req.json();
      const { coordinates, locate, ...location } = body;
      location.owner = userId;
      console.log(locate);
      location.locate = {
        lat: coordinates[0],
        long: coordinates[1],
        ward: new Types.ObjectId(),
        tinh: locate.province,
        huyen: locate.district,
        xa: locate.ward,
        diachi: locate.street,
      };

      const newLocation = new Location(location);

      const savedLocation = await newLocation.save();
      return successResponse({
        message: "Thêm địa điểm thành công",
        data: savedLocation,
      });
    } catch (error: any) {
      console.error(error.message);
      return errorResponse({
        message: "Đã có lỗi xảy ra khi thêm địa điểm",
        error,
      });
    }
  }
);
