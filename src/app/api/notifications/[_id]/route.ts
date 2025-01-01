import { auth } from "@/lib/auth";
import { errorResponse, successResponse, unauthorizedResponse } from "@/utils";
import { isValidObjectId } from "mongoose";
import { NextAuthRequest } from "node_modules/next-auth/lib";

export const GET = auth(async (req: NextAuthRequest) => {
  const session = req.auth;
  const userId = session?.user?.id;
  if (!userId || !isValidObjectId(userId)) return unauthorizedResponse({});
  try {
    return successResponse({});
  } catch (error) {
    console.error(">> Error in @GET /api/notifications:", error.message);
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error: error.message,
    });
  }
});

export const PATCH = auth(async () => {})