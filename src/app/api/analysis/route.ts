import { NextRequest } from "next/server";
import { successResponse, errorResponse, badRequestResponse, notFoundResponse } from "@/utils";
import { Province, District, Ward } from "@/lib/model"; // Import các model từ MongoDB

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const provinceSearch = searchParams.get("province") ?? "Hồ Chí Minh";
  const districtSearch = searchParams.get("district");
  const wardSearch = searchParams.get("ward");
  if (!provinceSearch) return badRequestResponse({ message: "Invalid province" });

  try {
    const responseData: Record<string, any> = { province: provinceSearch }

    const province = await Province.findOne({
      name: { $regex: provinceSearch, $options: "i" },
    })
    if (!province) return notFoundResponse({ message: "Province not foundF" });

    const districts = await District.find({
      ...(districtSearch
        ? { name: { $regex: districtSearch, $options: "i" } }
        : { province: province._id })
    })
    if (districts.length === 0) return notFoundResponse({ message: "District not found" });

    if (!districtSearch) {
      responseData.analysis = province.analysis
      responseData.districts = districts.map(d => ({
        name: d.name,
        analysis: d.analysis
      }))
      return successResponse({ data: responseData });
    }
    responseData.district = districtSearch

    const wards = await Ward.find({
      ...(wardSearch
        ? { name: { $regex: wardSearch, $options: "i" } }
        : { district: districts[0]._id })
    })
    if (wards.length === 0) return notFoundResponse({ message: "Ward not found" });

    if (!wardSearch) {
      responseData.analysis = districts[0].analysis
      responseData.wards = wards.map(w => ({
        name: w.name,
        analysis: w.analysis
      }))
      return successResponse({ data: responseData });
    }
    responseData.ward = wardSearch
    responseData.analysis = wards[0].analysis
    return successResponse({ data: responseData });
  } catch (error) {
    console.error("Error fetching data:", error);
    return errorResponse({ message: "Đã có lỗi xảy ra", error: error.message });
  }
};
