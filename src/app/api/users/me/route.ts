import { errorResponse, forbiddenResponse, parseFormDataToObject, successResponse, unauthorizedResponse } from "@/utils";
import cloudinary from "@/lib/cloudinary";

import { NextAuthRequest } from "node_modules/next-auth/lib";
import { User } from "@/lib/model";
import { auth } from "@/lib/auth";
import { isValidObjectId } from "mongoose";
import { uploadImgsOrUrls } from "@/lib/cloudinary/upload";
import { getCldPublicIdFromUrl } from "@/lib/cloudinary/utils";

export const GET = auth(async (req: NextAuthRequest) => {
  const session = req.auth;
  const userId = session?.user?.id;
  if (!userId || !isValidObjectId(userId)) return forbiddenResponse();

  try {
    const user = await User.findById(userId).select("-password").lean();
    if (!user) return errorResponse({ message: "Không tìm thấy người dùng" });

    return successResponse({ data: user });
  } catch (error) {
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error: error.message,
    });
  }
})

export const POST = auth(async (req: NextAuthRequest) => {
  const session = req.auth;
  const userId = session?.user?.id;
  if (!userId || !isValidObjectId(userId)) return forbiddenResponse();

  try {
    const [formData, user] = await Promise.all([
      req.formData(),
      User.findById(userId, "_id avt"),
    ]);
    if (!user) return unauthorizedResponse();

    const hasKeyAvt = formData.has("avt");
    const avatar = hasKeyAvt ? [formData.get("avt")] : null;
    formData.delete("avt");

    const oldImgs = [user.avt];
    const promises = [uploadImgsOrUrls(avatar, "users")]

    if (avatar && oldImgs?.length) {
      const publicIds = oldImgs
        // filter out the imgs that are not in newImgs
        .filter((urlImg) => !avatar.some(img => typeof img === "string" && img === urlImg))
        .map((urlImg) => getCldPublicIdFromUrl(urlImg));

      if (publicIds.length)
        promises.push(cloudinary.api.delete_resources(publicIds, { resource_type: "image", }));
    }

    const [[newAvatars, error]] = await Promise.all(promises);
    // console.log(">> newImgs:", newImgs);
    if (error) {
      // console.log(">> Error in uploading imgs:", error.message);
      throw new Error(error.message);
    }

    const restData = parseFormDataToObject(formData);
    const updatedData = {
      ...restData,
      ...(avatar && { avt: newAvatars[0] }),
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      { new: true, fields: "-password" },
    )

    return successResponse({ data: updatedUser });
  } catch (error) {
    console.error('>> Error in @POST /api/users/me:', error.message);
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error: error.message,
    });
  }
});
