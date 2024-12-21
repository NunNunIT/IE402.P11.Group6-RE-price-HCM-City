import { NextResponse } from "next/server";
import { NextAuthRequest } from "node_modules/next-auth/lib";
import { RealEstate, Polygon } from "@/lib/model";
import { auth } from "@/lib/auth";
import { parseWebMercatorToWGS84Coordinates } from "@/utils/coordinates";
const mongoose = require("mongoose");

export const POST = auth(async (req: NextAuthRequest) => {
  const session = req.auth;
  const userId = session?.user?.id;
  console.log("userId:", userId);

  try {
    // Trích xuất dữ liệu từ request body
    const {
      title,
      desc,
      price,
      area,
      locate,
      coordinates,
      imgs,
      type,
      polygon,
      ...rest
    } = await req.json(); // Sử dụng req.json() để parse body

    // Kiểm tra các trường bắt buộc
    if (
      !title ||
      !desc ||
      !price ||
      !area ||
      !locate ||
      !coordinates ||
      !imgs ||
      !type
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 } // HTTP 400 Bad Request
      );
    }

    // Tạo ra document mới
    let newRealEstate = {
      title,
      desc,
      price,
      area,
      locate: {
        lat: coordinates[0],
        long: coordinates[1],
        ward: locate.wardId || "",
        tinh: locate.province || "",
        huyen: locate.district || "",
        xa: locate.ward || "",
        diachi: locate.street || "",
      },
      imageUrls: imgs,
      type,
      polygon,
      info: {
        ...rest,
      },
      owner: new mongoose.Types.ObjectId(userId),
    };

    console.log("polygon", polygon);

    let polygonIdString = null;

    // Kiểm tra điều kiện để chỉ tạo polygon khi có giá trị hợp lệ
    if (polygon && polygon.length > 0) {
      const newPolygon = { points: polygon.map(parseWebMercatorToWGS84Coordinates) };
      const savedPolygon = await Polygon.create(newPolygon);
      polygonIdString = savedPolygon._id.toString();
      console.log("polygonIdString", polygonIdString);
      // Add polygon property to newRealEstate
      newRealEstate = {
        ...newRealEstate,
        polygon: new mongoose.Types.ObjectId(polygonIdString),
      };
    }

    console.log("newRealEstate", newRealEstate);

    // Lưu tài liệu vào cơ sở dữ liệu (giả sử dùng Mongoose hoặc ORM khác)
    const createdRealEstate = await RealEstate.create(newRealEstate);

    // Trả về tài liệu vừa được tạo
    return NextResponse.json(
      {
        message: "Real estate created successfully",
        data: createdRealEstate,
      },
      { status: 201 } // HTTP 201 Created
    );
  } catch (error) {
    // Bắt lỗi và phản hồi với HTTP 500
    console.error("Error creating real estate:", error);
    return NextResponse.json(
      { message: "Failed to create real estate", error: error.message },
      { status: 500 } // HTTP 500 Internal Server Error
    );
  }
});
