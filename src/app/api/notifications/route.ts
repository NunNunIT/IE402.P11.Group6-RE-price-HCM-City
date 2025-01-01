import { auth } from "@/lib/auth";
import { User } from "@/lib/model";
import { errorResponse, successResponse, unauthorizedResponse } from "@/utils";
import { isValidObjectId } from "mongoose";
import { NextAuthRequest } from "node_modules/next-auth/lib";

export const GET = auth(async (req: NextAuthRequest) => {
  const session = req.auth;
  const userId = session?.user?.id;
  if (!userId || !isValidObjectId(userId)) return unauthorizedResponse({});

  try {
    const user = (await User.findById(userId)
      .select("notifications")
      .sort({ createdAt: -1 })
      .lean()) as any;
    if (!user) return unauthorizedResponse({});

    const notifications = user.notifications;
    return successResponse({ data: notifications });
  } catch (error) {
    console.error(">> Error in @GET /api/notifications:", error.message);
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error: error.message,
    });
  }
});
