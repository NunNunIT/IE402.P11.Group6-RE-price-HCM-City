"use client";

import React, { useState } from "react";

import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";

import data from "./data.json";

const VNLocationSelector = ({
  modal,
  value,
  onChange,
  isProvinceDistrict,
  className,
}: {
  modal?: boolean;
  value?: any;
  onChange?: any;
  isProvinceDistrict?: boolean;
  className?: string;
}) => {
  const [location, setLocation] = useState({
    province: value?.province || "",
    district: value?.district || "",
    ward: value?.ward || "",
    street: value?.street || "",
  });

  const selectedProvince = data.find((province) => province.Name === location.province);
  const districts = selectedProvince?.Districts || [];
  const selectedDistrict = districts.find((district) => district.Name === location.district);
  const wards = selectedDistrict?.Wards || [];

  const handleLocationChange = (key: string, newValue: string) => {
    const newLocation = { ...location, [key]: newValue };

    if (key === "province") {
      newLocation.district = "";
      newLocation.ward = "";
    } else if (key === "district") {
      newLocation.ward = "";
    }

    setLocation(newLocation);
    if (onChange) onChange(newLocation);
  };

  return (
    <div className={"grid grid-cols-2 grid-rows-2 gap-2 dark:text-zinc-300 " + className}>
      <Combobox
        value={location.province}
        onChange={(value) => handleLocationChange("province", value)}
        selectData={data.map((province: any) => province.Name)}
        placeholder={"Tỉnh"}
        modal={modal}
      />

      <Combobox
        value={location.district}
        onChange={(value) => handleLocationChange("district", value)}
        selectData={districts.map((district: any) => district.Name)}
        placeholder={"Quận huyện"}
        disabled={!location.province}
        modal={modal}
      />

      {!isProvinceDistrict && (
        <>
          <Combobox
            value={location.ward}
            onChange={(value) => handleLocationChange("ward", value)}
            selectData={wards.map((ward: any) => ward.Name)}
            placeholder={"Xã"}
            disabled={!location.district}
            modal={modal}
          />
        </>
      )}
    </div>
  );
};

export default VNLocationSelector;
