import { Readable } from "stream";
import cloudinary from ".";

// #region imgs upload

const uploadFromBuffer = (folder: string, buffer: Buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error: any, result: any) => {
        if (error) reject(error);
        resolve(result);
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};

// Upload images to Cloudinary
// if files is string, it's already uploaded
// if files is File, it's not uploaded yet
export async function uploadImgsOrUrls(
  files?: (string | File)[],
  folder: string = "uploads"
): Promise<[string[] | null, null] | [null, { message: string }]> {
  if (!files)
    return [null, null];

  try {
    const uploadPromises = files.map(file =>
      typeof file === "string"
        ? file
        : file.arrayBuffer()
          .then(bytes => Buffer.from(bytes))
          .then(buffer => uploadFromBuffer(folder, buffer))
    )

    const results = await Promise.all(uploadPromises);
    const secureUrls = results.map((result: any) =>
      typeof result === "string"
        ? result
        : result.secure_url);

    return [secureUrls, null];
  } catch (error) {
    console.error(">> Error in uploadImgs:", error?.message ?? "Unknown error")
    return [null, { message: "Error while uploadImgs data" }];
  }
}

// #endregion
