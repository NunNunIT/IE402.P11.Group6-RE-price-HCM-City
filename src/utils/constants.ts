import { ENUM_ROLE, ESortStatus } from "./enums";

export const CONFIG_MAP = {
  // map initialization options
  options: {
    basemap: 'gray'
  },
  // item extents graphics on map
  itemExtents: {
    symbol: {
      color: [51, 122, 183, 0.125],
      outline: {
        color: [51, 122, 183, 1],
        width: 1,
        type: 'simple-line',
        style: 'solid'
      },
      type: 'simple-fill',
      style: 'solid'
    },
    popupTemplate: {
      title: '{title}',
      content: '{snippet}'
    }
  }
} as const;

export const LOCATION_API_URL_UNFORMATTED: string = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat={}&lon={}`;

export const ROLES = {
  [ENUM_ROLE.Admin]: [
    "has:manage",
  ],
  [ENUM_ROLE.Staff]: [
    "has:manage",
  ],
  [ENUM_ROLE.User]: [],
} as const

export const SORT_VALUE_MAPPING = {
  "-1": ESortStatus.DESC,
  "desc": ESortStatus.DESC,
  "1": ESortStatus.ASC,
  "asc": ESortStatus.ASC,
} as const;

export const REAL_ESTATE_FILTERS = {
  propertyType: [
    ["all", "Tất cả"],
    ["land", "Đất"],
    ["house", "Nhà"],
  ],
  priceRange: [
    ["all", "Tất cả mức giá"],
    ["-0.5", "Dưới 500 triệu"],
    ["0.5-0.8", "500 - 800 triệu"],
    ["0.8-1", "800 triệu - 1 tỷ"],
    ["1-", "Trên 1 tỷ"],
  ],
  areaRange: [
    ["all", "Tất cả"],
    ["-30", "Dưới 30 m²"],
    ["30-50", "30 - 50 m²"],
    ["50-80", "50 - 80 m²"],
    ["80-", "Trên 80 m²"],
  ],
} as const;

export const REAL_ESTATE_PROPERTY_TYPE = REAL_ESTATE_FILTERS.propertyType.map(([value]) => value);
export const REAL_ESTATE_PRICE_RANGE = REAL_ESTATE_FILTERS.priceRange.map(([value]) => value);
export const REAL_ESTATE_AREA_RANGE = REAL_ESTATE_FILTERS.areaRange.map(([value]) => value);

export const REAL_ESTATE_PROPERTY_TYPE_DEFAULT = REAL_ESTATE_FILTERS.propertyType[0][0];
export const REAL_ESTATE_PRICE_RANGE_DEFAULT = REAL_ESTATE_FILTERS.priceRange[0][0];
export const REAL_ESTATE_AREA_RANGE_DEFAULT = REAL_ESTATE_FILTERS.areaRange[0][0];