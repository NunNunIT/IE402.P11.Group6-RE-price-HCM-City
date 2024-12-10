"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/legacy/image";
import { userMockData } from "./mockData";
import { User } from "@/types/user";
import { z } from "zod";
import { useState } from "react";
import EditUserAdressModal from "@/components/modal/editUserAdressModal";

const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string(),
});

const ProfileTab = () => {
  const [user, setUser] = useState<User>(userMockData);
  const [showEditAddress, setShowEditAddress] = useState<boolean>(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const closeModal = () => setShowEditAddress(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: name === "birthday" ? new Date(value) : value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          setAvatarPreview(reader.result as string); // Cập nhật preview ảnh
          setUser((prevUser) => ({
            ...prevUser,
            avt: reader.result as string, // Cập nhật ảnh avatar trong trạng thái user
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    document.getElementById("avatar-upload")?.click(); // Mở hộp thoại chọn tệp
  };

  return (
    <div>
      <div className="px-4 space-y-6 sm:px-6 py-5">
        <header className="space-y-2">
          <div className="flex items-center space-x-3">
            <Image
              src={avatarPreview || user.avt}
              alt="Avatar"
              width="96"
              height="96"
              className="rounded-full"
            />
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">{user.username}</h1>
              <Button onClick={handleAvatarClick} size="sm">
                Đổi Avatar
              </Button>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange} // Xử lý thay đổi ảnh khi người dùng chọn ảnh mới
              />
            </div>
          </div>
        </header>
        <div className="space-y-8">
          <Card className="p-5">
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Tên người dùng</Label>
                <Input
                  id="name"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Ngày sinh</Label>
                <Input
                  type="date"
                  name="birthday"
                  value={
                    user.birthday
                      ? user.birthday.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
          <Card className="p-5">
            <CardHeader className="text-xl font-semibold">Địa chỉ</CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Tỉnh/Thành phố</Label>
                <Input value={user.address.province} disabled />
              </div>
              <div className="space-y-2">
                <Label>Quận/Huyện</Label>
                <Input value={user.address.district} disabled />
              </div>
              <div className="space-y-2">
                <Label>Phường/Xã</Label>
                <Input value={user.address.ward} disabled />
              </div>

              <div className="space-y-2">
                <Label>Địa chỉ chi tiết</Label>
                <Input value={user.address.address} disabled />
              </div>
              <div className="flex justify-end">
                <Button size="sm" onClick={() => setShowEditAddress(true)}>
                  Sửa thông tin địa chỉ
                </Button>
              </div>
              <EditUserAdressModal
                show={showEditAddress}
                onClose={closeModal}
                address={user.address}
                setAddress={(address) =>
                  setUser((prevUser) => ({ ...prevUser, address }))
                }
              />
            </CardContent>
          </Card>
        </div>
        <div className=" mb-5">
          <Button className="w-[200px]">Cập nhật</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
