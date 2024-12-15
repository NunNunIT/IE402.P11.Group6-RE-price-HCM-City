import cloudinary from "@/lib/cloudinary";
import { NextRequest } from "next/server";
import { successResponse, notFoundResponse, errorResponse } from "@/utils";
import { auth } from "@/lib/auth";

export const DELETE = auth(async (req: NextRequest) => {
  try {
    const data = await req.json();
    const publicIds = data.cldPublicIds;
    // console.log("pppppppppp", publicIds);

    const res = await cloudinary.api.delete_resources(publicIds, {
      resource_type: "image",
    });

    const deletedItems = [];
    const notFoundItems = [];
    for (const publicId in res.deleted) {
      if (Object.prototype.hasOwnProperty.call(res.deleted, publicId)) {
        if (res.deleted[publicId] === "deleted") {
          deletedItems.push(publicId);
        } else if (res.deleted[publicId] === "not_found") {
          notFoundItems.push(publicId);
        }
      }
    }
    // console.log("aaaaaa", deletedItems);
    // console.log("aaaaaas", notFoundItems);

    if (notFoundItems.length == publicIds.length)
      return notFoundResponse({
        message: "Không tìm thấy hoặc không xóa được tài nguyên",
      });

    if (deletedItems.length == publicIds.length)
      return successResponse({ message: `Xóa thành công ${deletedItems.length} tài nguyên` });

    return successResponse({
      message: `Xóa thành công ${deletedItems.length}, thất bại ${notFoundItems.length} tài nguyên`,
    });
  } catch (error) {
    console.error("Lỗi: ", error);
    return errorResponse({ error });
  }
});
