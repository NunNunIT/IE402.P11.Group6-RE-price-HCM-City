"use client";
import React, { useState } from "react";
import PostCard from "@/components/card/user/postCard";
import { mockPostData } from "./mockData";
import SearchForm from "@/components/search/searchForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PostTab = () => {
  const posts = mockPostData;
  const [currentTab, setCurrentTab] = useState("all");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget); // Lấy dữ liệu từ form
    const searchQuery = formData.get("search-param");
    console.log(">> handleSearch: searchQuery", searchQuery);
    setCurrentTab("all");
  };
  return (
    <div className="p-5">
      <div className="w-full flex justify-center items-center gap-4 p-3">
        <SearchForm onSumit={handleSearch} />
      </div>
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <div className="w-full flex justify-center">
          <TabsList className="flex justify-start items-center overflow-x-auto">
            <TabsTrigger value="all" className="self-center">
              Tất cả
            </TabsTrigger>
            <TabsTrigger value="active" className="self-center">
              Đang hoạt động
            </TabsTrigger>
            <TabsTrigger value="expired" className="self-center">
              Hết hạn
            </TabsTrigger>
            <TabsTrigger value="rejected" className="self-center">
              Bị từ chối
            </TabsTrigger>
            <TabsTrigger value="musttopay" className="self-center">
              Cần thanh toán
            </TabsTrigger>
            <TabsTrigger value="draft" className="self-center">
              Tin nháp
            </TabsTrigger>
            <TabsTrigger value="pending" className="self-center">
              Chờ duyệt
            </TabsTrigger>
            <TabsTrigger value="hide" className="self-center">
              Đã ẩn
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Các TabsContent */}
        <TabsContent value="all">
          <div className="flex flex-col items-center gap-4 p-3">
            {posts.map((post) => (
              <PostCard key={post.postId} {...post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="flex flex-col items-center gap-4 p-3">
            {posts.map((post) => (
              <PostCard key={post.postId} {...post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="expired">
          <div className="flex flex-col items-center gap-4 p-3">
            {posts.map((post) => (
              <PostCard key={post.postId} {...post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected">
          <div className="flex flex-col items-center gap-4 p-3">
            {posts.map((post) => (
              <PostCard key={post.postId} {...post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="musttopay">
          <div className="flex flex-col items-center gap-4 p-3">
            {posts.map((post) => (
              <PostCard key={post.postId} {...post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="draft">
          <div className="flex flex-col items-center gap-4 p-3">
            {posts.map((post) => (
              <PostCard key={post.postId} {...post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div className="flex flex-col items-center gap-4 p-3">
            {posts.map((post) => (
              <PostCard key={post.postId} {...post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hide">
          <div className="flex flex-col items-center gap-4 p-3">
            {posts.map((post) => (
              <PostCard key={post.postId} {...post} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PostTab;
