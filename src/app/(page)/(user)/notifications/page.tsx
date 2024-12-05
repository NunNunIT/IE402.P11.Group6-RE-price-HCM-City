"use client";

import React, { useState } from "react";

import NotificationCard from "@/components/card/notif-card";

interface Notification {
  content: string;
  title: string;
  link: string;
  date: Date;
  isSeen: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      content: "Bài đăng của bạn đã được quản trị viên phê duyệt",
      title: "Bài đăng đã được phê duyệt",
      link: "notifications/1",
      date: new Date("2023-10-01T10:00:00Z"),
      isSeen: false,
    },
    {
      content: "Bài đăng của bạn đã được quản trị viên phê duyệt",
      title: "Bài đăng đã được phê duyệt",
      link: "notifications/1",
      date: new Date("2023-10-01T10:00:00Z"),
      isSeen: false,
    },
    {
      content: "Bài đăng của bạn đã được quản trị viên phê duyệt",
      title: "Bài đăng đã được phê duyệt",
      link: "notifications/1",
      date: new Date("2023-10-01T10:00:00Z"),
      isSeen: false,
    },
  ]);

  const handleNotificationClick = (index: number) => {
    const newNotifications = [...notifications];
    newNotifications[index].isSeen = true;
    setNotifications(newNotifications);
  };

  return (
    <div className="w-full h-full bg-gray-100 dark:bg-gray-900">
      <div className="lg:w-[70%] sm:w-[80%] w-[90%] mx-auto flex flex-col gap-4 py-10">
        <div className="w-full flex justify-between pb-4">
          <h2 className="text-3xl font-semibold dark:text-white">Thông báo</h2>
        </div>
        <div className="w-full flex sm:flex-row flex-col gap-4">
          <div className="w-full flex flex-col gap-4">
            {notifications.map((notification, index) => (
              <NotificationCard
                key={index}
                notification={notification}
                isRead={notification.isSeen}
                onClick={() => handleNotificationClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
