import React from "react";
import Link from "next/link";

interface Notification {
  content: string;
  title: string;
  link: string;
  date: Date;
  isSeen: boolean;
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
    <Link href={notification.link}>
      <div
        className={`w-full flex flex-col gap-2 bg-white dark:bg-gray-800 p-6 rounded-md border-l-[.5rem] ${
          isRead ? "border-gray-600" : "border-blue-600"
        }`}
        onClick={onClick}
      >
        <div className="flex flex-col gap-2 border border-gray-200 dark:border-gray-600 rounded-md">
          <div className="flex flex-col p-4 hover:cursor-pointer">
            <h4 className="text-lg font-semibold dark:text-white hover:text-blue-800 dark:hover:text-blue-400">
              {notification.title}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {notification.content}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {notification.date.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NotificationCard;
