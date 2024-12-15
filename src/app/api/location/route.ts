import { errorResponse, forbiddenResponse, haversineDistance, sortHandler, successResponse } from '@/utils';

import { Location } from '@/lib/model';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { NextAuthRequest } from 'node_modules/next-auth/lib';
import { isValidObjectId, Types } from 'mongoose';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  // Lấy các tham số từ query
  const province = searchParams.get('province');
  const district = searchParams.get('district');
  const ward = searchParams.get('ward');
  const limit = Number(searchParams.get('limit') ?? 12);
  const page = Number(searchParams.get('page') ?? 1);
  const title = searchParams.get('title') || ''; // Tìm kiếm theo title
  const sort = searchParams.getAll('sort');  // Sắp xếp theo thời gian đăng, mặc định là giảm dần
  const getAll = searchParams.get('getAll') === "true"; // Chuyển getAll thành boolean

  try {
    const { locateSort, mongooseSort } = sortHandler(sort);
    let locations = await Location.find({
      ...(province ? { "locate.tinh": province } : {}),
      ...(district ? { "locate.huyen": district } : {}),
      ...(ward ? { "locate.xa": ward } : {}),
      ...(title ? { title: { $regex: title, $options: 'i' } } : {})
    })
      .populate("owner", "username avt")
      .sort(mongooseSort)
      .lean();

    if (locateSort.useHaversine) {
      const temp = locations.map(location => {
        const distance = haversineDistance(locateSort, location.locate);
        return ({ ...location, distance });
      });
      temp.sort((a, b) => a.distance - b.distance);
      locations = temp.map(({ distance: __distance, ...location }) => ({ ...location }));
    }

    const total = locations.length;
    if (!getAll) locations = locations.slice((page - 1) * limit, page * limit);

    return NextResponse.json({
      message: 'Lấy danh sách địa điểm thành công',
      data: locations,
      meta: {
        page,
        limit,
        total: total,
        totalPages: total / limit,
      },
    });
  } catch (error) {
    console.error("Error in @GET /api/location:", error.message);
    return errorResponse({
      message: 'Đã có lỗi xảy ra khi lấy danh sách địa điểm',
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

      if (!role || role != 'Admin' || !userId || !isValidObjectId(userId))
        return forbiddenResponse();
      const body = await req.json();
      const { locate, ...location } = body;
      location.owner = userId;
      location.locate = {
        lat: locate[0],
        long: locate[1],
        ward: new Types.ObjectId(),
      };

      const newLocation = new Location(location);

      const savedLocation = await newLocation.save();
      return successResponse({
        message: 'Thêm địa điểm thành công',
        data: savedLocation,
      });
    } catch (error: any) {
      console.error(error.message);
      return errorResponse({
        message: 'Đã có lỗi xảy ra khi thêm địa điểm',
        error,
      });
    }
  }
);
