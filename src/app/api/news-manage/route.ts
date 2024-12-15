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

    news = news.map(({ _id, ...news }) => ({
      _id,
      id: _id.toString(),
      ...news,
    }));

    return successResponse({ data: news });
  } catch (error) {
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error,
    });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    console.log("POST request received");
    const body = await req.json();
    console.log("Request body:", body);
    const newNews = new News(body);
    await newNews.save();
    console.log("News saved:", newNews);

    return successResponse({ data: newNews });
  } catch (error) {
    console.error("Error creating news:", error);
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error: error.message, // Log the error message
    });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return errorResponse({
        message: "ID is required to update a news article",
      });
    }

    const updatedNews = await News.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedNews) {
      return errorResponse({
        message: "News article not found",
      });
    }

    return successResponse({ data: updatedNews });
  } catch (error) {
    console.error("Error updating news:", error);
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error: error.message,
    });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return errorResponse({
        message: "ID is required to delete a news article",
      });
    }

    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews) {
      return errorResponse({
        message: "News article not found",
      });
    }

    return successResponse({ data: deletedNews });
  } catch (error) {
    console.error("Error deleting news:", error);
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error: error.message,
    });
  }
};
