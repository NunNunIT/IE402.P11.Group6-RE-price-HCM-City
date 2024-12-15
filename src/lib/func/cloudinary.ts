"use client";

import { convertBlobUrlsToImgFiles, getCldPublicIdFromUrl } from "./client-function";

const uploadFilesToCloudinary = async (files: File[], folderName?: string): Promise<string[]> => {
  const MAX_SIZE = 5 * 1024 * 1024 - 1; // 5MB
  const fileBatches: File[][] = [];
  let currentBatch: File[] = [];
  let currentBatchSize = 0;

  // Chia files thành các mảng con không vượt quá 5MB
  for (const file of files) {
    const fileSize = file.size;

    if (currentBatchSize + fileSize > MAX_SIZE) {
      fileBatches.push(currentBatch); // Đưa mảng hiện tại vào fileBatches
      currentBatch = []; // Tạo mảng mới
      currentBatchSize = 0;
    }

    currentBatch.push(file);
    currentBatchSize += fileSize;
  }

  // Đưa mảng cuối cùng vào fileBatches nếu có file
  if (currentBatch.length > 0) {
    fileBatches.push(currentBatch);
  }

  const urls: string[] = [];

  // Upload từng mảng con lên Cloudinary
  for (const batch of fileBatches) {
    const formData = new FormData();

    batch.forEach((file: File) => formData.append("file", file));
    if (folderName) formData.append("folder", folderName);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cloudinary/uploadImgs`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      urls.push(...data.data.urls); // Thêm các URL đã upload vào mảng urls
    }
  }

  return urls;
};

const uploadImgsInDesToCloudinary = async (
  description: string,
  folderName: string
): Promise<string> => {
  // console.log("descriptiondescription", description);

  const parser = new DOMParser();

  const doc = parser.parseFromString(description, "text/html");
  // console.log("docdocdocdocdocdocdoc", doc);

  const docImgs = Array.from(doc.querySelectorAll("img"));
  // console.log("docImgsdocImgsdocImgs", docImgs);

  if (!docImgs.length) return description;

  const imgSrcs = docImgs.filter((img) => img.src.startsWith("blob:")).map((img) => img.src);
  if (imgSrcs.length > 0) {
    // console.log("imgSrcsimgSrcsimgSrcs", imgSrcs);

    const imgFiles = await convertBlobUrlsToImgFiles(imgSrcs, "description");
    // console.log("imgFilesimgFilesimgFiles", imgFiles);

    const urls = await uploadFilesToCloudinary(imgFiles, folderName);
    // console.log("urlsurlsurlsurlsurlsurls", urls);

    docImgs
      .filter((img) => img.getAttribute("src").startsWith("blob:"))
      .forEach((img, index) => img.setAttribute("src", urls[index]));
  }
  // console.log("docImgsdocImgsdocImgs", docImgs);

  // console.log("doc.querySelectordoc.querySelector", doc.querySelector("body").innerHTML);

  return doc.querySelector("body").innerHTML;
};

const removeImgsInDesFromCloudinary = async (
  deafultDes: string,
  changedDes: string
): Promise<void> => {
  const parser = new DOMParser();

  const defaultDoc = parser.parseFromString(deafultDes, "text/html");
  const changedDoc = parser.parseFromString(changedDes, "text/html");

  const defaultImgs = Array.from(defaultDoc.querySelectorAll("img"));
  const changedImgs = Array.from(changedDoc.querySelectorAll("img"));

  const defaultSrcs = defaultImgs
    .filter((img) => img.src.startsWith("https://res.cloudinary.com/"))
    .map((img) => img.src);
  const changedtSrcs = changedImgs
    .filter((img) => img.src.startsWith("https://res.cloudinary.com/"))
    .map((img) => img.src);

  const missingSrcs = defaultSrcs.filter((src) => !changedtSrcs.includes(src));

  await removeImgsFromCloudinary(missingSrcs);
};

const removeImgsFromCloudinary = async (imgs: string[]): Promise<void> => {
  const cldPublicIds = imgs
    .filter((url) => url.startsWith("https://res.cloudinary.com/"))
    .map((url) => getCldPublicIdFromUrl(url));

  if (cldPublicIds.length) {
    // const deleteImgsRes =
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cloudinary/deleteImgs`, {
      method: "DELETE",
      body: JSON.stringify({ cldPublicIds }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export {
  uploadFilesToCloudinary,
  uploadImgsInDesToCloudinary,
  removeImgsInDesFromCloudinary,
  removeImgsFromCloudinary,
};
