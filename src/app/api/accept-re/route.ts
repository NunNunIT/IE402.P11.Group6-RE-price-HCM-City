import { errorResponse, successResponse } from "@/utils";
import { RealEstate } from "@/lib/model";

export const GET = async () => {
  try {
    let realEstates = await RealEstate.find({
      isAuth: { $in: ["pending", "auth"] },
    })
      .select("-desc")
      .populate("owner", "username avt")
      .lean();

    realEstates = realEstates.map(({ imageUrls, ...realEstate }) => ({
      ...realEstate,
      imageUrl: imageUrls[0],
    }));

    return successResponse({ data: { rows: realEstates, total: -1 } });
  } catch (error) {
    console.error(">> Error in @GET /api/accept-re:", error.message);
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error: error.message,
    });
  }
};
