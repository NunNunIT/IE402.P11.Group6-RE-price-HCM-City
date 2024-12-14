import {
  errorResponse,
  forbiddenResponse,
  successResponse,
  unauthorizedResponse,
} from "@/utils";
import { auth } from "@/lib/auth";
import mongoose, { isValidObjectId } from "mongoose";
import { User, RealEstate } from "@/lib/model";
import { NextAuthRequest } from "node_modules/next-auth/lib";

// GET: Lấy danh sách bất động sản đã lưu
export const GET = auth(async (req: NextAuthRequest) => {
  const session = req.auth;
  const userId = session?.user?.id;

  // Xác thực người dùng
  if (!userId) {
    return unauthorizedResponse();
  }

  try {
    // Lấy người dùng từ database
    const user = await User.findById(userId).populate("realEstatesFav");

    if (!user) {
      return unauthorizedResponse();
    }

    // Trả về danh sách bất động sản đã lưu
    return successResponse({
      data: user.realEstatesFav,
    });
  } catch (error) {
    console.error("Error fetching saved real estates:", error.message);
    return errorResponse({
      message: "Không thể lấy danh sách bất động sản đã lưu",
      error: error.message,
    });
  }
});

// POST: Thêm bất động sản vào danh sách đã lưu
export const POST = auth(async (req: NextAuthRequest) => {
  const session = req.auth;
  const userId = session?.user?.id;

  // Xác thực người dùng
  if (!userId || !isValidObjectId(userId)) {
    console.log("Invalid or missing userId:", userId); // Log userId nếu không hợp lệ
    return forbiddenResponse();
  }

  try {
    // Lấy thông tin từ body request
    const { realEstateId } = await req.json();
    console.log("Received realEstateId from request body:", realEstateId); // Log realEstateId nhận được

    // Kiểm tra nếu realEstateId không hợp lệ
    if (!realEstateId || !isValidObjectId(realEstateId)) {
      console.log("Invalid or missing realEstateId:", realEstateId); // Log nếu realEstateId không hợp lệ
      return errorResponse({ message: "ID bất động sản không hợp lệ" });
    }

    // Kiểm tra bất động sản có tồn tại hay không
    const realEstate = await RealEstate.findById(realEstateId);
    if (!realEstate) {
      console.log("Real estate not found for ID:", realEstateId); // Log nếu không tìm thấy bất động sản
      return errorResponse({ message: "Bất động sản không tồn tại" });
    }

    // Tìm người dùng
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found for ID:", userId); // Log nếu không tìm thấy người dùng
      return unauthorizedResponse();
    }

    console.log(
      "User and real estate exist. User ID:",
      userId,
      "RealEstate ID:",
      realEstateId
    );

    // Kiểm tra xem bất động sản đã nằm trong danh sách yêu thích hay chưa
    if (user.realEstatesFav.includes(realEstateId)) {
      console.log("Real estate already in favorites:", realEstateId); // Log nếu bất động sản đã được lưu
      return successResponse({
        message: "Bất động sản đã nằm trong danh sách yêu thích",
      });
    }

    // Thêm bất động sản vào danh sách yêu thích
    user.realEstatesFav.push(realEstateId);
    await user.save();

    console.log(
      "Real estate added to favorites. User ID:",
      userId,
      "RealEstate ID:",
      realEstateId
    );

    return successResponse({
      message: "Thêm bất động sản vào danh sách yêu thích thành công",
    });
  } catch (error) {
    console.error(
      ">> Error in @POST /api/users/me/favRealEstate:",
      error.message
    );
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error: error.message,
    });
  }
});

// DELETE: Xóa bất động sản khỏi danh sách đã lưu
export const DELETE = auth(async (req: NextAuthRequest) => {
  const session = req.auth;
  const userId = session?.user?.id;

  // Xác thực người dùng
  if (!userId || !isValidObjectId(userId)) {
    console.log("Invalid or missing userId:", userId); // Log userId nếu không hợp lệ
    return forbiddenResponse();
  }

  try {
    // Lấy thông tin từ body request
    const { realEstateId } = await req.json();
    console.log(
      "Received realEstateId from request body for deletion:",
      realEstateId
    ); // Log realEstateId nhận được

    // Kiểm tra nếu realEstateId không hợp lệ
    if (!realEstateId || !isValidObjectId(realEstateId)) {
      console.log("Invalid or missing realEstateId:", realEstateId); // Log nếu realEstateId không hợp lệ
      return errorResponse({ message: "ID bất động sản không hợp lệ" });
    }

    // Tìm người dùng
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found for ID:", userId); // Log nếu không tìm thấy người dùng
      return unauthorizedResponse();
    }

    console.log(
      "User exists for deletion. User ID:",
      userId,
      "RealEstate ID:",
      realEstateId
    );

    // Kiểm tra xem bất động sản có nằm trong danh sách yêu thích hay không
    if (!user.realEstatesFav.includes(realEstateId)) {
      console.log(
        "Real estate not found in user's favorites for deletion:",
        realEstateId
      ); // Log nếu bất động sản không nằm trong danh sách yêu thích
      return errorResponse({
        message: "Bất động sản không có trong danh sách yêu thích",
      });
    }

    // Xóa bất động sản khỏi danh sách yêu thích
    user.realEstatesFav = user.realEstatesFav.filter(
      (id: string | mongoose.Types.ObjectId) => id.toString() !== realEstateId
    );
    await user.save();

    console.log(
      "Real estate removed from favorites. User ID:",
      userId,
      "RealEstate ID:",
      realEstateId
    );

    return successResponse({
      message: "Xóa bất động sản khỏi danh sách yêu thích thành công",
    });
  } catch (error) {
    console.error(
      ">> Error in @DELETE /api/users/me/favRealEstate:",
      error.message
    );
    return errorResponse({
      message: "Đã có lỗi xảy ra khi xóa bất động sản khỏi danh sách yêu thích",
      error: error.message,
    });
  }
});
