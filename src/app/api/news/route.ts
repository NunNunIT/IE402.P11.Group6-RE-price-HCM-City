import { errorResponse, successResponse } from "@/utils";

import { NextRequest } from "next/server";
import { News } from "@/lib/model"

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const searchKey = searchParams.get('searchKey')
  const limit = Number(searchParams.get('limit') ?? 10)
  const page = Number(searchParams.get('page') ?? 1)

  try {
    let news = await News.find({
      ...(searchKey ? { "title": searchKey } : {}),
    })
      // .populate("owner", "username avt")
      .limit(limit).skip((page - 1) * limit).lean();

    news = news.map(({ img, ...news }) => ({
      ...news,
      imageUrl: img,
    }));

    return successResponse({ data: news });
  } catch (error) {
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error
    });
  }
}