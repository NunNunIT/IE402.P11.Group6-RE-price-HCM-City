import { errorResponse, forbiddenResponse, successResponse } from "@/utils";

import { Location } from "@/lib/model";
import { NextRequest, NextResponse } from "next/server";
import { ILocationModel } from "@/lib/model";
import { auth } from "@/lib/auth";
import { NextAuthRequest } from "node_modules/next-auth/lib";
import { isValidObjectId } from "mongoose";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    // Lấy các tham số từ query
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : null; // Nếu không có limit, bỏ giới hạn
    const search = searchParams.get("title") || ""; // Tìm kiếm theo title
    const sort = searchParams.get("sort") || "desc"; // Sắp xếp theo thời gian đăng, mặc định là giảm dần

    // Tính toán offset cho phân trang
    const skip = limit ? (page - 1) * limit : 0;

    // Tạo filter cho tìm kiếm theo title (không phân biệt hoa thường)
    const filter = search ? { title: { $regex: search, $options: "i" } } : {};

    // Thực hiện truy vấn với filter, phân trang (nếu có limit), và sắp xếp
    const query = Location.find(filter).sort({
      createdAt: sort === "asc" ? 1 : -1,
    });

    if (limit) {
      query.skip(skip).limit(limit);
    }

    const locations = await query;

    // Đếm tổng số tài liệu để trả về metadata cho phân trang
    const total = await Location.countDocuments(filter);

    return NextResponse.json({
      message: "Lấy danh sách địa điểm thành công",
      data: locations,
      meta: {
        page: limit ? page : 1, // Nếu không phân trang, mặc định là trang 1
        limit: limit || total, // Nếu không có limit, trả về tổng số tài liệu
        total,
        totalPages: limit ? Math.ceil(total / limit) : 1, // Nếu không phân trang, chỉ có 1 trang
      },
    });
  } catch (error) {
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
      const body: ILocationModel = await req.json();

      const location = body;
      location.owner = userId;
      location.createdAt = new Date();
      location.updatedAt = new Date();

      const newLocation = new Location(location);

      const savedLocation = await newLocation.save();
      return successResponse({
        message: "Thêm địa điểm thành công",
        data: savedLocation,
      });
    } catch (error: any) {
      return errorResponse({
        message: "Đã có lỗi xảy ra khi thêm địa điểm",
        error,
      });
    }
  }
);
