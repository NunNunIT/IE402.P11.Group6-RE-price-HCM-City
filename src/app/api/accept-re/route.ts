import { errorResponse, successResponse } from "@/utils";
import { NextRequest } from "next/server";
import { RealEstate } from "@/lib/model";

export const GET = async (req: NextRequest) => {
  try {
    let realEstates = await RealEstate.find({ isAuth: "pending" })
      .select("-desc")
      .populate("owner", "username avt")
      .lean();

    const total = realEstates.length;

    realEstates = realEstates.map(({ imageUrls, ...realEstate }) => ({
      ...realEstate,
      imageUrl: imageUrls[0],
    }));

    return successResponse({ data: { rows: realEstates, total } });
  } catch (error) {
    console.error(">> Error in @GET /api/accept-re:", error.message);
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error: error.message,
    });
  }
};
