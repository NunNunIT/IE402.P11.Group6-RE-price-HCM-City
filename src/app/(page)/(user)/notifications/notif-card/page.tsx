import React from "react";
import { HeartIcon, BookmarkIcon, BellIcon } from "@radix-ui/react-icons";

interface Notification {
  image: string;
  name: string;
  action: string;
  time: string;
  title: string;
  tags: string;
}

interface NotificationCardProps {
  notification: Notification;
  isRead: boolean;
  onClick: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, isRead, onClick }) => {
  return (
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
          <p className="text-sm text-gray-500 hover:text-blue-800 dark:hover:text-blue-400 dark:text-gray-300">
            {notification.tags}
          </p>
        </div>
        <div className="flex justify-between items-center py-1 border-t-2 dark:border-gray-600 dark:text-white">
          <div className="flex gap-2 text-lg pl-1">
            <div className="flex items-center gap-1 px-4 py-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
              <HeartIcon className="text-xl" />
              <span className="md:block hidden">Like</span>
            </div>
            <div className="flex items-center gap-1 px-4 py-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
              <BookmarkIcon className="text-xl" />
              <span className="md:block hidden">Save</span>
            </div>
          </div>
          <div className="pr-1">
            <div className="flex items-center gap-1 px-4 py-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
              <BellIcon className="text-xl" />
              <span className="md:block hidden">Subscribe to comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
