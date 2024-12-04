"use client";

import React, { useState } from "react";
import NotificationCard from "@/components/card/notif-card";

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

export default function NotificationsPage() {
  const [readNotifications, setReadNotifications] = useState([
    false,
    false,
    false,
  ]);
  const [filter, setFilter] = useState("all");

  const handleNotificationClick = (index: number) => {
    const newReadNotifications = [...readNotifications];
    newReadNotifications[index] = true;
    setReadNotifications(newReadNotifications);
  };

  const markAllAsRead = () => {
    setReadNotifications([true, true, true]);
  };

  const notifications: Notification[] = [
    {
      image:
        "https://images.unsplash.com/photo-1485218126466-34e6392ec754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMHx8bGFkeXxlbnwwfDB8fHwxNzMyMDI1NDIxfDA&ixlib=rb-4.0.3&q=80&w=1080",
      name: "Hewan D.",
      action: "made a new post",
      time: "about 22 hours ago",
      title:
        "Build a static website with Markdown content, using Nuxt and Fusionable (server API approach)",
    },
    {
      image:
        "https://images.unsplash.com/photo-1485218126466-34e6392ec754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMHx8bGFkeXxlbnwwfDB8fHwxNzMyMDI1NDIxfDA&ixlib=rb-4.0.3&q=80&w=1080",
      name: "Hewan D.",
      action: "made a new post",
      time: "about 22 hours ago",
      title:
        "Build a static website with Markdown content, using Nuxt and Fusionable (server API approach)",
    },
    {
      image:
        "https://images.unsplash.com/photo-1485218126466-34e6392ec754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMHx8bGFkeXxlbnwwfDB8fHwxNzMyMDI1NDIxfDA&ixlib=rb-4.0.3&q=80&w=1080",
      name: "Hewan D.",
      action: "made a new post",
      time: "about 22 hours ago",
      title:
        "Build a static website with Markdown content, using Nuxt and Fusionable (server API approach)",
    },
  ];


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
