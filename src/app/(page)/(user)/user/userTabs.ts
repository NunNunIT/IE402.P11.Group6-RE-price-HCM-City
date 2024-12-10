import { ImProfile } from "react-icons/im";
import { IconType } from "react-icons";
import { IoSaveOutline } from "react-icons/io5";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";

export type UserTab = {
    id: string;
    name: string;
    icon?: IconType; 
};

const userTabs: UserTab[] = [
    {
        id: 'profile',
        name: 'Hồ sơ cá nhân',
        icon: ImProfile,
    },
    {
        id: 'saved',
        name: 'Đã lưu',
        icon: IoSaveOutline,
    },
    {
        id: 'post',
        name: 'Quản lý bài viết',
        icon: BsFileEarmarkPostFill,
    }
];

const logoutTab: UserTab = {
    id: 'logout',
    name: 'Đăng xuất',
    icon: IoIosLogOut,
};

export { userTabs, logoutTab };