export const NAVIGATION_DESKTOP_DATA = [
  { title: 'Bất động sản', link: '/real-estate', },
  { title: 'Biến động', link: '/analysis', },
  { title: 'Tin tức', link: '/news', },
] as { title: string, link: string, isNeedAuth?: boolean, isNeedSeparator?: boolean }[];

export const NAVIGATION_OPTIONS_DATA = [
  { title: 'Quản lý', link: '/admin', isNeedHighPermission: true, isNeedSeparator: true },
  { title: 'Đăng tin', link: '/create-new-re', isNeedAuth: true },
  { title: 'Quản lý bài đăng', link: '#', isNeedAuth: true},
  { title: 'Lưu', link: '#', isNeedAuth: true, isNeedSeparator: true },
];

export const NAVIGATION_MOBILE_DATA = [
  ...NAVIGATION_OPTIONS_DATA.slice(0, 2),
  ...NAVIGATION_DESKTOP_DATA,
  ...NAVIGATION_OPTIONS_DATA.slice(2),
];