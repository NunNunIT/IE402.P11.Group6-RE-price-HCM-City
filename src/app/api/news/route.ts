import { errorResponse, successResponse } from "@/utils";

import { News } from "@/lib/model";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const searchKey = searchParams.get("keyword");
  const limit = Number(searchParams.get("limit") ?? 12);
  const page = Number(searchParams.get("page") ?? 1);
  const getAll = !!searchParams.get('getAll'); // Chuyển getAll thành boolean

  try {
    let news = await News.find({
      ...(searchKey ? { title: { $regex: searchKey, $options: "i" } } : {}), // Case-insensitive regex search
    })
      .limit(limit)
      .lean();

    const total = news.length;
    if (!getAll) {
      news = news.slice((page - 1) * limit, page * limit);
    }

    news = news.map(({ img, ...news }) => ({
      ...news,
      imageUrl: img,
    }));

    return successResponse({ data: { rows: news, total } });
  } catch (error) {
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error,
    });
  }
};
