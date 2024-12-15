import { errorResponse, successResponse } from "@/utils";

import { News } from "@/lib/model";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const searchKey = searchParams.get("searchKey");
  const limit = Number(searchParams.get("limit") ?? 12);
  const page = Number(searchParams.get("page") ?? 1);

  try {
    let news = await News.find({
      ...(searchKey ? { title: { $regex: searchKey, $options: "i" } } : {}), // Case-insensitive regex search
    })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    news = news.map(({ img, ...news }) => ({
      ...news,
      imageUrl: img,
    }));

    return successResponse({ data: news });
  } catch (error) {
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error,
    });
  }
};
