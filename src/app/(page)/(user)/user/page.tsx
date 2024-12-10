"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { userTabs, logoutTab } from "./userTabs";
import ProfileTab from "./tabs/profileTab";
import { redirect } from "next/navigation";
import PostTab from "./tabs/postTabs";

const UserPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<string | null>(userTabs[0].id);

  const handleLogout = () => {
    console.log(">> handleLogout: Logging out...");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  if (activeTab === "saved") {
    return redirect("/saved");
  }

  return (
    <div className="w-full min-h-[60vh] grid grid-cols-1 lg:grid-cols-4 gap-6 mt-5 ">
      <div className="flex flex-col max-h-[500px] justify-between items-start lg:col-span-1 rounded-md shadow-md  mb-10">
        <ul className="flex flex-col w-full gap-2 p-4">
          {userTabs &&
            userTabs.map((tab) => (
              <li key={tab.id}>
                <Button
                  className="w-full flex justify-start items-center text-left gap-3 min-w-[206px]"
                  variant={activeTab === tab.id ? "blue" : "white"}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span>
                    {tab.icon &&
                      React.createElement(tab.icon, { className: "w-5 h-5" })}
                  </span>
                  <span>{tab.name}</span>
                </Button>
              </li>
            ))}
        </ul>

        <div className="hidden lg:block w-full p-4">
          <Button
            className="w-full rounded-lg flex justify-center items-center text-left gap-3"
            variant="white"
            onClick={handleLogout}
          >
            <span>
              {logoutTab.icon &&
                React.createElement(logoutTab.icon, { className: "w-5 h-5" })}
            </span>
            <span>{logoutTab.name}</span>
          </Button>
        </div>
      </div>
      <div className="lg:col-span-3  rounded-md shadow-md mb-10">
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "post" && <PostTab />}
      </div>
    </div>
  );
};

export default UserPage;
