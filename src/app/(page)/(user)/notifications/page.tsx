"use client";

import NotificationCard from "@/components/card/notif-card";
import useSWR from "swr";

export interface INotification {
  _id: string;
  title: string;
  content: string;
  isSeen: boolean;
  date: string;
  link: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url, { cache: "reload" });
  if (!res) throw new Error("Failed to fetch");
  const payload = await res.json();
  return payload.data;
};

const fetchSeenNotification = async (_id: string) => {
  const res = await fetch(`/api/notifications/${_id}`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to fetch");
  const payload = await res.json();
  return payload.data;
};

export default function NotificationsPage() {
  const { data, isLoading, error, mutate } = useSWR<any[]>(
    "/api/notifications",
    fetcher
  );

  const handleNotificationClick = async (_id: string) => {
    await fetchSeenNotification(_id);
    mutate((prev) =>
      prev?.map((item) => (item._id !== _id ? item : { ...item, isSeen: true }))
    );
  };

  return (
    <div className="w-full h-full bg-gray-100 dark:bg-gray-900">
      <div className="lg:w-[70%] sm:w-[80%] w-[90%] mx-auto flex flex-col gap-4 py-10">
        <div className="w-full flex justify-between pb-4">
          <h2 className="text-3xl font-semibold dark:text-white">Thông báo</h2>
        </div>
        <div className="w-full flex sm:flex-row flex-col gap-4">
          <div className="w-full flex flex-col gap-4">
            {isLoading || error ? (
              <p>Loading...</p>
            ) : (
              data?.map((notification, index) => (
                <NotificationCard
                  key={index}
                  notification={notification}
                  onClick={() => handleNotificationClick(notification._id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
