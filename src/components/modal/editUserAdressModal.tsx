import { Address } from "@/types/user";
import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { on } from "events";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  address: Address;
  setAddress: (address: Address) => void;
}

interface Province {
  id: string;
  name: string;
}
interface District {
  id: string;
  name: string;
}
interface Ward {
  id: string;
  name: string;
}

const EditUserAdressModal: React.FC<ModalProps> = ({
  show,
  onClose,
  address,
  setAddress,
}) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [detailAddress, setDetailAddress] = useState<string>(
    address.address || ""
  );

  const fetchProvinces = async () => {
    try {
      const response = await fetch("https://esgoo.net/api-tinhthanh/1/0.htm");
      const resJson = await response.json();
      setProvinces(resJson.data || []);
    } catch (error) {
      console.error("Failed to fetch provinces:", error);
    }
  };

  const fetchDistricts = async (provinceId: string) => {
    try {
      const response = await fetch(
        `https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`
      );
      const resJson = await response.json();
      setDistricts(resJson.data || []);
    } catch (error) {
      console.error("Failed to fetch districts:", error);
    }
  };

  const fetchWards = async (districtId: string) => {
    try {
      const response = await fetch(
        `https://esgoo.net/api-tinhthanh/3/${districtId}.htm`
      );
      const resJson = await response.json();
      setWards(resJson.data || []);
    } catch (error) {
      console.error("Failed to fetch wards:", error);
    }
  };

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
  };

  const handleWardChange = (value: string) => {
    setSelectedWard(value);
  };

  const handleSave = () => {
    // Lưu các tên tỉnh, quận, phường thay vì ID
    const selectedProvinceName =
      provinces.find((p) => p.id === selectedProvince)?.name || "";
    const selectedDistrictName =
      districts.find((d) => d.id === selectedDistrict)?.name || "";
    const selectedWardName =
      wards.find((w) => w.id === selectedWard)?.name || "";

    setAddress({
      province: selectedProvinceName,
      district: selectedDistrictName,
      ward: selectedWardName,
      address: detailAddress,
    });
    onClose();
  };

  // Fetch provinces on component mount
  useEffect(() => {
    fetchProvinces();
    setSelectedProvince(address.province);
    setSelectedDistrict(address.district);
    setSelectedWard(address.ward);
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetchDistricts(selectedProvince);
    } else {
      setDistricts([]);
      setSelectedDistrict(null);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchWards(selectedDistrict);
    } else {
      setWards([]);
      setSelectedWard(null);
    }
  }, [selectedDistrict]);

  if (!show) return null;

  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center mt-[5rem] z-20  ">
      <div
        className="bg-white  p-4 rounded-lg w-11/12 max-w-lg overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader>Cập nhật địa chỉ</CardHeader>
        <CardContent className="space-y-4">
          <div className="mb-2">
            <Label>Tỉnh/Thành phố</Label>
            <select
              className="w-full p-2 border rounded"
              value={selectedProvince || ""}
              onChange={(e) => handleProvinceChange(e.target.value)}
            >
              <option value="" disabled>
                Chọn tỉnh/thành phố
              </option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <Label>Quận/Huyện</Label>
            <select
              className="w-full p-2 border rounded"
              value={selectedDistrict || ""}
              onChange={(e) => handleDistrictChange(e.target.value)}
              disabled={!selectedProvince}
            >
              <option value="" disabled>
                Chọn quận/huyện
              </option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <Label>Phường/Xã</Label>
            <select
              className="w-full p-2 border rounded"
              value={selectedWard || ""}
              onChange={(e) => handleWardChange(e.target.value)}
              disabled={!selectedDistrict}
            >
              <option value="" disabled>
                Chọn phường/xã
              </option>
              {wards.map((ward) => (
                <option key={ward.id} value={ward.id}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <Label>Địa chỉ chi tiết</Label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              className="w-[100px] border"
              variant="white"
              onClick={onClose}
            >
              Hủy
            </Button>
            <Button className="w-[150px]" onClick={handleSave}>
              Lưu
            </Button>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default EditUserAdressModal;
