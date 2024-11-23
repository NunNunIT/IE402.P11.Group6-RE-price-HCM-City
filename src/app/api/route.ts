import { successResponse } from "@/utils/handlers";

export const GET = async () => {
  return successResponse({ message: "GET request success" });
}