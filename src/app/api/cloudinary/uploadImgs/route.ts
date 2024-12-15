import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import cloudinary from "@/lib/cloudinary";
import { successResponse, errorResponse } from "@/utils";
import { auth } from "@/lib/auth";

export const POST = auth(async (req: NextRequest) => {
  const data = await req.formData();
  const files = data.getAll("file") as File[];
  const folder = data.get("folder") as string;

  // console.log("filesssssssssss2s", files);
  // console.log("folderfolderfolder", folder);

  if (files.length === 0)
    return NextResponse.json({ message: "Không có tài nguyên" }, { status: 400 });

  const uploadFromBuffer = (buffer: any) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: folder ?? "uploads" },
        (error: any, result: any) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      Readable.from(buffer).pipe(uploadStream);
    });
  };

  try {
    const uploadPromises = files.map(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      return uploadFromBuffer(buffer);
    });

    const results = await Promise.all(uploadPromises);

    const secureUrls = results.map((result: any) => result.secure_url);
    return successResponse({
      message: "Thêm tài nguyên hành công",
      data: {
        urls: secureUrls,
      },
    });
  } catch (error) {
    console.error("Lỗi: ", error);
    return errorResponse({ error });
  }
});
