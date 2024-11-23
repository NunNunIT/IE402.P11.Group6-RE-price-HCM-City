import { successResponse } from "@/utils/handler";

export const GET = async () => {
  return successResponse({ message: "GET request success" });
}