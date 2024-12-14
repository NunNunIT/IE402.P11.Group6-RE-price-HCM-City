"use client";

import { useEffect, useState } from "react";

interface Notification {
  content: string;
  title: string;
  link: string;
  date: Date;
  isSeen: boolean;
}

export default function NotificationsDetail() {
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    // Mock notification data
    const mockNotification: Notification = {
      content: "Bài đăng của bạn đã được quản trị viên phê duyệt",
      title: "Bài đăng đã được phê duyệt",
      link: "/notifications/1",
      date: new Date(),
      isSeen: false,
    };
    setNotification(mockNotification);
  }, []);

  if (!notification) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {notification.title}
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {notification.content}
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        {notification.date.toLocaleString()}
      </p>
    </div>
  );
}
