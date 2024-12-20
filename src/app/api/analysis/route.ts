import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/utils";
import { Province, District, Ward } from "@/lib/model"; // Import các model từ MongoDB

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const province = searchParams.get("province");
  const district = searchParams.get("district");
  const ward = searchParams.get("ward");

  return successResponse({});

  // try {
  //   const currentYear = new Date().getFullYear().toString();

  //   const currentMonth = (new Date().getMonth() + 1)
  //     .toString()
  //     .padStart(2, "0");

  //   // // 1. Lấy danh sách District khi chỉ có Province
  //   // if (province && !district) {
  //   //   const provinceData = await Province.findOne({
  //   //     name: { $regex: province, $options: "i" },
  //   //   });

  //   //   if (!provinceData) {
  //   //     return errorResponse({ message: "Province not found" });
  //   //   }

  //   //   const districts = await District.find({
  //   //     province: provinceData._id,
  //   //   }).lean();

  //   //   const districtWithAnalysis = districts.map((d) => ({
  //   //     name: d.name,
  //   //     analysis: d.analysis[currentYear]?.[currentMonth] || null,
  //   //   }));

  //   //   return successResponse({
  //   //     data: {
  //   //       province: provinceData.name,
  //   //       analysis: provinceData.analysis[currentYear]?.[currentMonth] || null,
  //   //       districts: districts.map((d) => d.name),
  //   //     },
  //   //     message: "Danh sách quận/huyện và dữ liệu phân tích",
  //   //   });
  //   // }

  //   // 1. Trường hợp chỉ chọn Province
  //   if (province && !district) {
  //     const provinceData = await Province.findOne({
  //       name: { $regex: province, $options: "i" },
  //     });

  //     if (!provinceData)
  //       return errorResponse({ message: "Province not found" });

  //     const districts = await District.find({
  //       province: provinceData._id,
  //     }).lean();

  //     const districtWithAnalysis = districts.map((d: any) => ({
  //       name: d.name,
  //       analysis: d.analysis[currentYear]?.[currentMonth] || null,
  //     }));

  //     return successResponse({
  //       data: {
  //         province: provinceData.name,
  //         analysis: provinceData.analysis[currentYear]?.[currentMonth] || null,
  //         districts: districtWithAnalysis,
  //       },
  //       message: "Danh sách quận/huyện và giá trị phân tích",
  //     });
  //   }

  //   //     // 2. Lấy danh sách Ward khi có Province và District
  //   //     if (province && district && !ward) {
  //   //       const provinceData = await Province.findOne({
  //   //         name: { $regex: province, $options: "i" },
  //   //       });
  //   //       const districtData = await District.findOne({
  //   //         name: { $regex: district, $options: "i" },
  //   //         province: provinceData._id,
  //   //       });

  //   //       if (!districtData) {
  //   //         return errorResponse({ message: "District not found" });
  //   //       }

  //   //       const wards = await Ward.find({ district: districtData._id }).lean();

  //   //       return successResponse({
  //   //         data: {
  //   //           province: provinceData.name,
  //   //           district: districtData.name,
  //   //           analysis: districtData.analysis[currentYear]?.[currentMonth] || null,
  //   //           wards: wards.map((w) => w.name),
  //   //         },
  //   //         message: "Danh sách phường/xã và dữ liệu phân tích",
  //   //       });
  //   //     }

  //   //     // 3. Lấy thông tin Ward khi có đủ Province, District và Ward
  //   //     if (province && district && ward) {
  //   //       const provinceData = await Province.findOne({
  //   //         name: { $regex: province, $options: "i" },
  //   //       });
  //   //       const districtData = await District.findOne({
  //   //         name: { $regex: district, $options: "i" },
  //   //         province: provinceData._id,
  //   //       });
  //   //       const wardData = await Ward.findOne({
  //   //         name: { $regex: ward, $options: "i" },
  //   //         district: districtData._id,
  //   //       });

  //   //       const wards = await Ward.find({ district: districtData._id }).lean();

  //   //       if (!wardData) {
  //   //         return errorResponse({ message: "Ward not found" });
  //   //       }

  //   //       return successResponse({
  //   //         data: {
  //   //           district: districtData.name,
  //   //           analysis: wardData.analysis[currentYear]?.[currentMonth] || null,
  //   //           wards: wards.map((w) => w.name),
  //   //         },
  //   //         message: "Dữ liệu phân tích của phường/xã",
  //   //       });
  //   //     }

  //   //     return errorResponse({ message: "Invalid parameters" });
  //   //   } catch (error) {
  //   //     console.error("Error fetching data:", error);
  //   //     return errorResponse({ message: "Đã có lỗi xảy ra", error: error.message });
  //   //   }
  //   // };

  //   // 2. Trường hợp chọn Province và District
  //   if (province && district && !ward) {
  //     const provinceData = await Province.findOne({
  //       name: { $regex: province, $options: "i" },
  //     });
  //     const districtData = await District.findOne({
  //       name: { $regex: district, $options: "i" },
  //       province: provinceData._id,
  //     });

  //     if (!districtData)
  //       return errorResponse({ message: "District not found" });

  //     const wards = await Ward.find({ district: districtData._id }).lean();

  //     const wardWithAnalysis = wards.map((w: any) => ({
  //       name: w.name,
  //       analysis: w.analysis[currentYear]?.[currentMonth] || null,
  //     }));

  //     return successResponse({
  //       data: {
  //         province: provinceData.name,
  //         district: districtData.name,
  //         analysis: districtData.analysis[currentYear]?.[currentMonth] || null,
  //         wards: wardWithAnalysis,
  //       },
  //       message: "Danh sách phường/xã và giá trị phân tích",
  //     });
  //   }

  //   // 3. Trường hợp chọn Province, District và Ward
  //   if (province && district && ward) {
  //     const provinceData = await Province.findOne({
  //       name: { $regex: province, $options: "i" },
  //     });
  //     const districtData = await District.findOne({
  //       name: { $regex: district, $options: "i" },
  //       province: provinceData._id,
  //     });

  //     if (!districtData)
  //       return errorResponse({ message: "District not found" });

  //     const wards = await Ward.find({ district: districtData._id }).lean();

  //     const wardWithAnalysis = wards.map((w: any) => ({
  //       name: w.name,
  //       analysis: w.analysis[currentYear]?.[currentMonth] || null,
  //     }));

  //     return successResponse({
  //       data: {
  //         province: provinceData.name,
  //         district: districtData.name,
  //         analysis: districtData.analysis[currentYear]?.[currentMonth] || null,
  //         wards: wardWithAnalysis,
  //       },
  //       message: "Danh sách phường/xã và giá trị phân tích",
  //     });
  //   }

  //   return errorResponse({ message: "Invalid parameters" });
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  //   return errorResponse({ message: "Đã có lỗi xảy ra", error: error.message });
  // }
};
