import { CircleUserRound, FolderKanban, LogOut, Save } from "lucide-react";

export const NAVIGATION_USER_LINKS = [
  { title: "Hồ sơ cá nhân", link: "/user", icon: CircleUserRound },
  { title: "Bất động sản của tôi", link: "/user/manage-posts", icon: FolderKanban },
  { title: "Lưu", link: "/user/saved", icon: Save },
];

export const NAVIGATION_USER_LOGOUT = { title: "Đăng xuất", icon: LogOut };