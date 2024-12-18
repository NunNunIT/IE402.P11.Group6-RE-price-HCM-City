import { errorResponse, haversineDistance, sortHandler, successResponse } from "@/utils";
import { NextRequest } from "next/server";
import { RealEstate } from "@/lib/model";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const province = searchParams.get('province');
  const district = searchParams.get('district');
  const ward = searchParams.get('ward');
  const limit = Number(searchParams.get('limit') ?? 12);
  const page = Number(searchParams.get('page') ?? 1);
  const sort = searchParams.getAll('sort');
  const getAll = !!searchParams.get('getAll'); // Chuyển getAll thành boolean
  const relative = !!searchParams.get('relative');

  try {
    const { locateSort, mongooseSort } = sortHandler(sort);

    let realEstates = await RealEstate.find({
      ...(province ? { "locate.tinh": province } : {}),
      ...(district ? { "locate.huyen": district } : {}),
      ...(ward ? { "locate.xa": ward } : {}),
    })
      .populate("owner", "username avt")
      .sort(mongooseSort)
      .lean();

    const total = realEstates.length;

    if (locateSort.useHaversine) {
      const temp = realEstates.map(realEstate => {
        const distance = haversineDistance(locateSort, realEstate.locate);
        return ({ ...realEstate, distance });
      }).filter(({ distance }) => !relative || distance >= 0.0000001);
      temp.sort((a, b) => a.distance - b.distance);
      realEstates = temp.map(({ distance: __distance, ...realEstate }) => ({ ...realEstate }));
    }

    if (!getAll) {
      realEstates = realEstates.slice((page - 1) * limit, page * limit);
    }

    realEstates = realEstates.map(({ imageUrls, ...realEstate }) => ({
      ...realEstate,
      imageUrl: imageUrls[0],
    }));

    return successResponse({ data: { rows: realEstates, total } });
  } catch (error) {
    console.error('>> Error in @GET /api/real-estates:', error.message);
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error: error.message,
    });
  }
};
