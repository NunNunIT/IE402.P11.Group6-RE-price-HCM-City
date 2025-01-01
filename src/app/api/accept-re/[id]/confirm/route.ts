import {
  badRequestResponse,
  errorResponse,
  notFoundResponse,
  successResponse,
  unauthorizedResponse,
} from "@/utils";

import { RealEstate, User } from "@/lib/model";
import { isValidObjectId } from "mongoose";
import { auth } from "@/lib/auth";
import { NextAuthRequest } from "node_modules/next-auth/lib";

export const PUT = auth(
  async (
    req: NextAuthRequest,
    { params: { id } }: { params: { id: string } }
  ) => {
    try {
      if (!id || !isValidObjectId(id))
        return badRequestResponse({
          message: "ID không hợp lệ",
          error: "ID_IS_INVALID",
        });
      const session = req.auth;
      const userId = session?.user?.id;
      if (!userId)
        return unauthorizedResponse({
          message: "Bạn cần đăng nhập để thực hiện chức năng này",
          error: "USER_NOT_FOUND",
        });
      // if (session?.user?.role !== ENUM_ROLE.Admin)
      //     return forbiddenResponse({
      //         message: "Bạn không có quyền thực hiện chức năng này",
      //         error: "USER_NOT_PERMISSION"
      //     });
      const realEstate = await RealEstate.findByIdAndUpdate(id, {
        isAuth: "auth",
      });
      console.log(realEstate);
      if (!realEstate)
        return notFoundResponse({
          message: "Không tìm thấy bất động sản",
          error: "REAL_ESTATE_NOT_FOUND",
        });
      const REUser = await User.findById(realEstate.owner);
      if (!REUser)
        return notFoundResponse({
          message: "Không tìm thấy người dùng",
          error: "USER_NOT_FOUND",
        });
      const notification = {
        title: "Bất động sản của bạn đã được xác thực",
        content: `
        <div>
          Bất động sản <b>${realEstate.title}</b> do bạn đăng ngày ${realEstate.createAt} đã được batdongsan.com xác thực
        </div>`,
        link: `/real-estate/${realEstate._id}`,
        date: new Date(),
        isSeen: false,
      };
      REUser.notifications.unshift(notification);
      await REUser.save();
      return successResponse({
        message: "Xác nhận bất động sản thành công",
        data: realEstate,
      });
    } catch (error) {
      console.log(error.message);
      return errorResponse({
        message: "Xác nhận bất động sản thất bại",
        error: error.message,
      });
    }
  }
);
