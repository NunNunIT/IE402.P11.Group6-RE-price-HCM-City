import { errorResponse, successResponse } from "@/utils";
import { NextRequest } from "next/server";
import { RealEstate } from "@/lib/model";
import { NextAuthRequest } from "node_modules/next-auth/lib";
import { auth } from "@/lib/auth";

export const GET = auth(async (req: NextAuthRequest) => {
  const session = req.auth;
  const userId = session?.user?.id; // Lấy ID người dùng từ session
  console.log("userId", userId);

  try {
    // Lấy danh sách bất động sản của userId từ cơ sở dữ liệu
    const realEstates = await RealEstate.find({
      owner: userId, // Lọc dữ liệu theo owner (chủ sở hữu)
    })
      .lean();

    // Map dữ liệu để thêm URL ảnh đầu tiên vào kết quả
    const finalData = realEstates.map(({ imageUrls, ...realEstate }) => ({
      ...realEstate,
      imageUrl: imageUrls?.[0] || null,
    }));

    return successResponse({ data: finalData });
  } catch (error) {
    console.error('>> Error in @GET /api/real-estates:', error.message);
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error: error.message,
    });
  }
});
