"use client";

import React, { useState } from "react";
import NotificationCard from "./notif-card/page";

export default function NotificationsPage() {
  const [readNotifications, setReadNotifications] = useState([false, false, false]);
  const [filter, setFilter] = useState("all");

  const handleNotificationClick = (index: number) => {
    const newReadNotifications = [...readNotifications];
    newReadNotifications[index] = true;
    setReadNotifications(newReadNotifications);
  };

  const markAllAsRead = () => {
    setReadNotifications([true, true, true]);
  };

  const notifications = [
    {
      image: "https://images.unsplash.com/photo-1485218126466-34e6392ec754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMHx8bGFkeXxlbnwwfDB8fHwxNzMyMDI1NDIxfDA&ixlib=rb-4.0.3&q=80&w=1080",
      name: "Hewan D.",
      action: "made a new post",
      time: "about 22 hours ago",
      title: "Build a static website with Markdown content, using Nuxt and Fusionable (server API approach)",
      tags: "#nuxt #vue #markdown #tutorial",
      category: "real-estate"
    },
    {
      image: "https://images.unsplash.com/photo-1485218126466-34e6392ec754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMHx8bGFkeXxlbnwwfDB8fHwxNzMyMDI1NDIxfDA&ixlib=rb-4.0.3&q=80&w=1080",
      name: "Hewan D.",
      action: "made a new post",
      time: "about 22 hours ago",
      title: "Build a static website with Markdown content, using Nuxt and Fusionable (server API approach)",
      tags: "#nuxt #vue #markdown #tutorial",
      category: "post"
    },
    {
      image: "https://images.unsplash.com/photo-1485218126466-34e6392ec754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMHx8bGFkeXxlbnwwfDB8fHwxNzMyMDI1NDIxfDA&ixlib=rb-4.0.3&q=80&w=1080",
      name: "Hewan D.",
      action: "made a new post",
      time: "about 22 hours ago",
      title: "Build a static website with Markdown content, using Nuxt and Fusionable (server API approach)",
      tags: "#nuxt #vue #markdown #tutorial",
      category: "post"
    }
  ];

  const filteredNotifications = notifications.filter(notification => 
    filter === "all" || notification.category === filter
  );

  return (
    <div className="w-full h-full bg-gray-100 dark:bg-gray-900">
      <div className="lg:w-[70%] sm:w-[80%] w-[90%] mx-auto flex flex-col gap-4 py-10">
        <div className="w-full flex justify-between pb-4">
          <h2 className="text-3xl font-semibold dark:text-white">Thông báo</h2>
          <button
            className="text-lg text-gray-600 hover:cursor-pointer dark:text-gray-400"
            onClick={markAllAsRead}
          >
            Đánh dấu tất cả đã đọc
          </button>
        </div>
        <div className="w-full flex sm:flex-row flex-col gap-4">
          <div className="sm:w-1/3 flex flex-col gap-[2px] px-2 dark:text-white">
            <button
              className={`w-full text-left py-2 rounded pl-4 hover:bg-white dark:hover:bg-gray-800 ${
                filter === "all" ? "bg-white dark:bg-gray-800" : ""
              }`}
              onClick={() => setFilter("all")}
            >
              Tất cả
            </button>
            <button
              className={`w-full text-left py-2 rounded pl-4 hover:bg-white dark:hover:bg-gray-800 ${
                filter === "real-estate" ? "bg-white dark:bg-gray-800" : ""
              }`}
              onClick={() => setFilter("real-estate")}
            >
              Bất động sản
            </button>
            <button
              className={`w-full text-left py-2 rounded pl-4 hover:bg-white dark:hover:bg-gray-800 ${
                filter === "post" ? "bg-white dark:bg-gray-800" : ""
              }`}
              onClick={() => setFilter("post")}
            >
              Bài đăng
            </button>
          </div>
          <div className="w-full flex flex-col gap-4">
            {filteredNotifications.map((notification, index) => (
              <NotificationCard
                key={index}
                notification={notification}
                isRead={readNotifications[index]}
                onClick={() => handleNotificationClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}