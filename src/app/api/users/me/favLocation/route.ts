import {
  errorResponse,
  forbiddenResponse,
  successResponse,
  unauthorizedResponse,
} from "@/utils";
import { auth } from "@/lib/auth";
import mongoose, { isValidObjectId } from "mongoose";
import { User, Location } from "@/lib/model"; // Cần thêm model Location
import { NextAuthRequest } from "node_modules/next-auth/lib";

// GET: Lấy danh sách địa điểm yêu thích
export const GET = auth(async (req: NextAuthRequest) => {
  const session = req.auth;
  const userId = session?.user?.id;

  // Xác thực người dùng
  if (!userId) {
    return unauthorizedResponse();
  }

  try {
    // Lấy người dùng từ database
    const user = await User.findById(userId).populate("locationFav");

    if (!user) {
      return unauthorizedResponse();
    }

    // Trả về danh sách địa điểm đã lưu
    return successResponse({
      data: user.locationFav,
    });
  } catch (error) {
    console.error("Error fetching saved locations:", error.message);
    return errorResponse({
      message: "Không thể lấy danh sách địa điểm yêu thích",
      error: error.message,
    });
  }
});

// POST: Thêm địa điểm vào danh sách yêu thích
export const POST = auth(async (req: NextAuthRequest) => {
  const session = req.auth;
  const userId = session?.user?.id;

  // Xác thực người dùng
  if (!userId || !isValidObjectId(userId)) {
    console.log("Invalid or missing userId:", userId);
    return forbiddenResponse();
  }

  try {
    // Lấy thông tin từ body request
    const { locationId } = await req.json();

    // Kiểm tra nếu locationId không hợp lệ
    if (!locationId || !isValidObjectId(locationId)) {
      console.log("Invalid or missing locationId:", locationId);
      return errorResponse({ message: "ID địa điểm không hợp lệ" });
    }

    // Kiểm tra địa điểm có tồn tại hay không
    const location = await Location.findById(locationId);
    if (!location) {
      console.log("Location not found for ID:", locationId);
      return errorResponse({ message: "Địa điểm không tồn tại" });
    }

    // Tìm người dùng
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found for ID:", userId);
      return unauthorizedResponse();
    }

    // Kiểm tra xem địa điểm đã nằm trong danh sách yêu thích hay chưa
    if (user.locationFav.includes(locationId)) {
      return successResponse({
        message: "Địa điểm đã nằm trong danh sách yêu thích",
      });
    }

    // Thêm địa điểm vào danh sách yêu thích
    user.locationFav.push(locationId);
    await user.save();

    return successResponse({
      message: "Thêm địa điểm vào danh sách yêu thích thành công",
    });
  } catch (error) {
    console.error("Error adding location to favorites:", error.message);
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error: error.message,
    });
  }
});

// DELETE: Xóa địa điểm khỏi danh sách yêu thích
export const DELETE = auth(async (req: NextAuthRequest) => {
  const session = req.auth;
  const userId = session?.user?.id;

  // Xác thực người dùng
  if (!userId || !isValidObjectId(userId)) {
    console.log("Invalid or missing userId:", userId);
    return forbiddenResponse();
  }

  try {
    // Lấy thông tin từ body request
    const { locationId } = await req.json();

    // Kiểm tra nếu locationId không hợp lệ
    if (!locationId || !isValidObjectId(locationId)) {
      return errorResponse({ message: "ID địa điểm không hợp lệ" });
    }

    // Tìm người dùng
    const user = await User.findById(userId);
    if (!user) {
      return unauthorizedResponse();
    }

    // Kiểm tra xem địa điểm có nằm trong danh sách yêu thích hay không
    if (!user.locationFav.includes(locationId)) {
      return errorResponse({
        message: "Địa điểm không có trong danh sách yêu thích",
      });
    }

    // Xóa địa điểm khỏi danh sách yêu thích
    user.locationFav = user.locationFav.filter(
      (id: string | mongoose.Types.ObjectId) => id.toString() !== locationId
    );
    await user.save();

    return successResponse({
      message: "Xóa địa điểm khỏi danh sách yêu thích thành công",
    });
  } catch (error) {
    console.error("Error removing location from favorites:", error.message);
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      error: error.message,
    });
  }
});
