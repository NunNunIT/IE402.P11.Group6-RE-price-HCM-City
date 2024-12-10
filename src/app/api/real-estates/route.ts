import { errorResponse, successResponse } from "@/utils";

import { NextRequest } from "next/server";
import { RealEstate } from "@/lib/model"

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const province = searchParams.get('province')
  const district = searchParams.get('district')
  const ward = searchParams.get('ward')
  const limit = Number(searchParams.get('limit') ?? 12)
  const page = Number(searchParams.get('page') ?? 1)

  try {
    let realEstates = await RealEstate.find({
      ...(province ? { "locate.tinh": province } : {}),
      ...(district ? { "locate.huyen": district } : {}),
      ...(ward ? { "locate.xa": ward } : {}),
    })
      // .populate("owner", "username avt")
      .limit(limit).skip((page - 1) * limit).lean();

    realEstates = realEstates.map(({ imageUrl, ...realEstate }) => ({
      ...realEstate,
      imageUrl: imageUrl[0],
    }));

    return successResponse({ data: realEstates });
  } catch (error) {
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error
    });
  }
}