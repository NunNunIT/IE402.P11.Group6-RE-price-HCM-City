export function getCldPublicIdFromUrl(url: string): string | undefined {
  try {
    const startIndex = url.indexOf("upload/") + "upload/".length;
    const str = url.slice(startIndex).split("/").slice(1).join("/");
    const endIndex = str.lastIndexOf(".");
    const publicId = str.substring(0, endIndex);
    return publicId;
  } catch (error) {
    console.error(">> Error in getCldPublicIdFromUrl:", error.message);
    return undefined;
  }
}