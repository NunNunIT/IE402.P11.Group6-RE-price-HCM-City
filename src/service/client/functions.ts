"use client";

export const parseBlobUrlsToImgFilesOrUrls = async (
  imageUrls: string[],
  fileName: string
): Promise<(string | File)[]> =>
  Promise.all(
    imageUrls.map((imageUrl, index) => {
      if (!imageUrl.startsWith("blob")) return imageUrl;

      return fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => new File([blob], `${fileName}_${index}.webp`, { type: "image/webp" }));
    })
  );

export const parseBlobUrlsToImgFiles = async (imageUrls: string[], fileName: string): Promise<File[]> =>
  Promise.all(
    imageUrls.map((imageUrl, index) => {
      if (!imageUrl.startsWith("blob")) throw new Error("The URL is not a blob");

      return fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => new File([blob], `${fileName}_${index}.webp`, { type: "image/webp" }));
    })
  );
