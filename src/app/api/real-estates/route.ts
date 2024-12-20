import {
  errorResponse,
  haversineDistance,
  isInclude,
  isNotNullAndUndefined,
  REAL_ESTATE_AREA_RANGE,
  REAL_ESTATE_AREA_RANGE_DEFAULT,
  REAL_ESTATE_PRICE_RANGE,
  REAL_ESTATE_PRICE_RANGE_DEFAULT,
  REAL_ESTATE_PROPERTY_TYPE,
  REAL_ESTATE_PROPERTY_TYPE_DEFAULT,
  retry,
  sortHandler,
  successResponse,
} from "@/utils";
import { NextRequest } from "next/server";
import { RealEstate } from "@/lib/model";

function generateFilterRange(filter: string, range: string) {
  if (!range) return {};
  const [min, max] = range.split('-').map(Number);
  return {
    ...(filter ? {
      [filter]: {
        ...(isNotNullAndUndefined(min) ? { $gte: min } : {}),
        ...(isNotNullAndUndefined(max) ? { $lte: max } : {})
      }
    } : {}),
  };
}

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const province = searchParams.get("province");
  const district = searchParams.get("district");
  const ward = searchParams.get("ward");
  const limit = Number(searchParams.get("limit") ?? 12);
  const page = Number(searchParams.get("page") ?? 1);
  const sort = searchParams.getAll("sort");
  const getAll = !!searchParams.get("getAll"); // Chuyển getAll thành boolean
  const relative = !!searchParams.get("relative");
  const isAuth = searchParams.get("isAuth") == "true";
  const propertyTypeDefault = searchParams.get("propertyType");
  const priceRangeDefault = searchParams.get("priceRange");
  const areaRangeDefault = searchParams.get("areaRange");
  const propertyType = isInclude(propertyTypeDefault, REAL_ESTATE_PROPERTY_TYPE)
    ? propertyTypeDefault
    : REAL_ESTATE_PROPERTY_TYPE_DEFAULT;
  const priceRange = isInclude(priceRangeDefault, REAL_ESTATE_PRICE_RANGE)
    ? priceRangeDefault
    : REAL_ESTATE_PRICE_RANGE_DEFAULT;
  const areaRange = isInclude(areaRangeDefault, REAL_ESTATE_AREA_RANGE)
    ? areaRangeDefault
    : REAL_ESTATE_AREA_RANGE_DEFAULT;

  try {
    const { locateSort, mongooseSort } = sortHandler(sort);

    const filter = {
      ...(province ? { "locate.tinh": province } : {}),
      ...(district ? { "locate.huyen": district } : {}),
      ...(ward ? { "locate.xa": ward } : {}),
      ...(isNotNullAndUndefined(isAuth) ? { isAuth } : {}),
      ...(propertyType !== REAL_ESTATE_PROPERTY_TYPE_DEFAULT ? { type: propertyType } : {}),
      ...(priceRange !== REAL_ESTATE_PRICE_RANGE_DEFAULT ? generateFilterRange("price", priceRange) : {}),
      ...(areaRange !== REAL_ESTATE_AREA_RANGE_DEFAULT ? generateFilterRange("area", areaRange) : {}),
    }
    const query = RealEstate
      .find(filter)
      .select("-desc -polygon")
      .populate("owner", "username avt")
      .sort(mongooseSort)

    let realEstates = await retry(() =>
      getAll || locateSort.useHaversine
        ? query.lean()
        : query.skip((page - 1) * limit).limit(limit).lean()
    );

    const total = realEstates.length;

    if (locateSort.useHaversine) {
      const temp = realEstates
        .map((realEstate) => {
          const distance = haversineDistance(locateSort, realEstate.locate);
          return { ...realEstate, distance };
        })
        .filter(({ distance }) => !relative || distance >= 0.0000001);
      temp.sort((a, b) => a.distance - b.distance);
      realEstates = temp.map(({ distance: __distance, ...realEstate }) => ({
        ...realEstate,
      }));
      if (!getAll) {
        realEstates = realEstates.slice((page - 1) * limit, page * limit);
      }
    }

    realEstates = realEstates.map(({ imageUrls, ...realEstate }) => ({
      ...realEstate,
      imageUrl: imageUrls[0],
    }));

    return successResponse({ data: { rows: realEstates, total } });
  } catch (error) {
    console.error(">> Error in @GET /api/real-estates:", error.message);
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error: error.message,
    });
  }
};
