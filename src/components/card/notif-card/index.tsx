import React from "react";
import { HeartIcon, BookmarkIcon, BellIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface Notification {
  image: string;
  name: string;
  action: string;
  time: string;
  title: string;
}

interface NotificationCardProps {
  notification: Notification;
  isRead: boolean;
  onClick: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  isRead,
  onClick,
}) => {
  return (
    <Link href="notifications/1">
      <div
        className={`w-full flex flex-col gap-2 bg-white dark:bg-gray-800 p-6 rounded-md border-l-[.5rem] ${
          isRead ? "border-gray-600" : "border-blue-600"
        }`}
        onClick={onClick}
      >
        <div className="flex gap-2">
          <img
            className="w-[3.3rem] h-[3.3rem] object-cover rounded-full"
            src={notification.image}
            alt="Profile"
          />
          <div className="flex flex-col">
            <div className="flex gap-2 items-center dark:text-white">
              <h4 className="text-lg font-semibold">{notification.name}</h4>
              <p className="text-sm">{notification.action}</p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {notification.time}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 border border-gray-200 dark:border-gray-600 rounded-md ml-10">
          <div className="flex flex-col p-4 hover:cursor-pointer">
            <h4 className="text-lg font-semibold dark:text-white hover:text-blue-800 dark:hover:text-blue-400">
              {notification.title}
            </h4>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NotificationCard;
