import { ENUM_ROLE } from "./enums";

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