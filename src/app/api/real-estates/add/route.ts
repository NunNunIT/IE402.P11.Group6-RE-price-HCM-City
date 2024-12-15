import { NextRequest, NextResponse } from 'next/server';
import { NextAuthRequest } from "next-auth/lib";
import { RealEstate } from '@/lib/model';
import { auth } from "@/lib/auth";

export const POST = auth(async (req: NextAuthRequest) => {
  const session = req.auth;
  const userId = session?.user?._id;
  console.log("userId:", userId)

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

    // In thông tin chi tiết từng trường
    console.log("Parsed Request Data:", {
      title,
      desc,
      price,
      area,
      locate,
      coordinates,
      imgs,
      type,
      polygon,
      rest,
    });

    // Kiểm tra các trường bắt buộc
    if (!title || !desc || !price || !area || !locate || !coordinates || !imgs || !type ) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 } // HTTP 400 Bad Request
      );
    }

    // Tạo ra document mới
    const newRealEstate = {
      title,
      desc,
      price,
      area,
      locate: {
        lat: coordinates[0],
        long: coordinates[1],
        ward: 'c00000000000000000000000',
        tinh: locate.province || '',
        huyen: locate.district || '',
        xa: locate.ward || '',
        diachi: locate.street || '',
      },
      imageUrls: imgs,
      type,
      info: {
        ...rest
      },
      polygon,
      owner: userId
    };

    // Lưu tài liệu vào cơ sở dữ liệu (giả sử dùng Mongoose hoặc ORM khác)
    const createdRealEstate = await RealEstate.create(newRealEstate);

    // Trả về tài liệu vừa được tạo
    return NextResponse.json(
      {
        message: 'Real estate created successfully',
        data: createdRealEstate,
      },
      { status: 201 } // HTTP 201 Created
    );
  } catch (error) {
    // Bắt lỗi và phản hồi với HTTP 500
    console.error('Error creating real estate:', error);
    return NextResponse.json(
      { message: 'Failed to create real estate', error: error.message },
      { status: 500 } // HTTP 500 Internal Server Error
    );
  }
});
