import { 
  badRequestResponse, 
  errorResponse, 
  notFoundResponse, 
  successResponse, 
  unauthorizedResponse 
} from "@/utils";

import { RealEstate } from "@/lib/model";
import { isValidObjectId } from "mongoose";
import { auth } from "@/lib/auth";
import { NextAuthRequest } from "node_modules/next-auth/lib";

export const PUT = auth(
  async (
    req: NextAuthRequest,
    { params: { id } }: { params: { id: string } }
  ) => {
    try {
      // Kiểm tra id hợp lệ
      if (!id || !isValidObjectId(id)) {
        return badRequestResponse({
          message: "ID không hợp lệ",
          error: "ID_IS_INVALID",
        });
      }

      // Lấy thông tin session
      const session = req.auth;
      const userId = session?.user?.id;

      // Tìm bất động sản theo ID
      const realEstate = await RealEstate.findById(id);

      if (!realEstate) {
        return notFoundResponse({
          message: "Không tìm thấy bất động sản",
          error: "REAL_ESTATE_NOT_FOUND",
        });
      }

      console.log("owner", realEstate.owner.toString())

      // Kiểm tra quyền sở hữu
      if (!userId || realEstate.owner.toString() !== userId) {
        return unauthorizedResponse({
          message: "Bạn không có quyền chỉnh sửa bất động sản này",
          error: "UNAUTHORIZED",
        });
      }

      // Cập nhật trạng thái `isAuth`
      realEstate.isAuth = "pending";
      await realEstate.save();

      return successResponse({
        message: "Yêu cầu xác nhận bất động sản thành công",
        data: realEstate,
      });
    } catch (error) {
      console.error(error.message);
      return errorResponse({
        message: "Yêu cầu xác nhận bất động sản thất bại",
        error: error.message,
      });
    }
  }
);
