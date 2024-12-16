/* eslint-disable no-unused-vars */
export enum ENUM_REF_TYPE {
  Location = "Location",
  RealEstate = "RealEstate",
  News = "News",
}

export enum ENUM_SOCIAL_TYPE {
  Google = "google",
  Github = "github",
}

export enum ENUM_GENDER {
  Male = "Male",
  Female = "Female",
  Unknown = "Unknown",
}

export const MAPPING_GENDER = {
  [ENUM_GENDER.Female]: "Nữ",
  [ENUM_GENDER.Male]: "Nam",
  [ENUM_GENDER.Unknown]: "Không biết",
} as const;

export enum ENUM_ROLE {
  Admin = "Admin",
  Staff = "Staff",
  User = "User",
}

export enum ENUM_LOCATION_TYPE {
  PROVINCE = 1,
  DISTRICT = 2,
  WARD = 3,
  STREET = 4,
}

export enum ENUM_MARKER_SYMBOL {
  APARTMENT = "apartment",
  COMPANY = "company",
  DEFAULT = "default",
  DRINK = "drink",
  FACTORY = "factory",
  FOOD = "food",
  GARA = "gara",
  HOSPITAL = "hospital",
  HOTEL = "hotel",
  MARKET = "market",
  PARK = "park",
  REAL_ESTATE = "real-estate",
  SALON = "salon",
  SCHOOL = "school",
  SHOP = "shop",
  TEMPLE = "temple",
  THEATER = "theater",
}

export const MAPPING_MARKER_SYMBOL = {
  [ENUM_MARKER_SYMBOL.APARTMENT]: "Căn hộ",
  [ENUM_MARKER_SYMBOL.COMPANY]: "Công ty",
  [ENUM_MARKER_SYMBOL.DEFAULT]: "Mặc định",
  [ENUM_MARKER_SYMBOL.DRINK]: "Quán uống",
  [ENUM_MARKER_SYMBOL.FACTORY]: "Nhà máy",
  [ENUM_MARKER_SYMBOL.FOOD]: "Quán ăn",
  [ENUM_MARKER_SYMBOL.GARA]: "Gara",
  [ENUM_MARKER_SYMBOL.HOSPITAL]: "Bệnh viện",
  [ENUM_MARKER_SYMBOL.HOTEL]: "Khách sạn",
  [ENUM_MARKER_SYMBOL.MARKET]: "Chợ",
  [ENUM_MARKER_SYMBOL.PARK]: "Công viên",
  [ENUM_MARKER_SYMBOL.REAL_ESTATE]: "Bất động sản",
  [ENUM_MARKER_SYMBOL.SALON]: "Salon",
  [ENUM_MARKER_SYMBOL.SCHOOL]: "Trường học",
  [ENUM_MARKER_SYMBOL.SHOP]: "Cửa hàng",
  [ENUM_MARKER_SYMBOL.TEMPLE]: "Chùa",
  [ENUM_MARKER_SYMBOL.THEATER]: "Nhà hát",
}

export enum ENUM_MAP_MODE {
  Edit = 'edit',
  View = 'view',
}

export enum ESortStatus {
  DESC = -1,
  ASC = 1,
}