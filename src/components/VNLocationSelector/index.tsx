"use client";

import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { useMediaQuery } from "usehooks-ts";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
} from "@/components/customize-ui/combobox";
import { ComboboxDrawer } from "../customize-ui";

import VNLocationData from "../VNLocationSelector/data.json";

import { ENUM_LOCATION_TYPE, checkIncludeByAscii } from "@/utils";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { useMapController } from "@/app/(page)/(user)/search-result/components";

export interface ILocation {
  province?: string | null;
  district?: string | null;
  ward?: string | null;
  wardId?: string | null;
  street?: string | null;
}

type TLocationSelectProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "placeholder"
> & {
  value: ILocation;
  onChange: Dispatch<SetStateAction<ILocation>>;
  setZoomController?: Dispatch<SetStateAction<Number>>;
  setCenterController?: Dispatch<SetStateAction<TPosition>>;
  depthLevel?: ENUM_LOCATION_TYPE;
  placeholders?: {
    province?: string;
    district?: string;
    ward?: string;
    street?: string;
  };
  modal?: boolean;
};

export default function LocationSelect({
  value: location,
  onChange: setLocation,
  className,
  depthLevel = ENUM_LOCATION_TYPE.STREET,
  placeholders,
  modal,
  disabled,
  setZoomController,
  setCenterController,
  ...props
}: TLocationSelectProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { setDistrict } = useMapController();
  const selectData = useMemo(() => {
    const selectedProvince = location?.province
      ? VNLocationData.find((province) => province.Name === location?.province)
      : undefined;
    const selectedDistrict = location?.district
      ? selectedProvince?.Districts.find(
        (district) => district.Name === location.district
      )
      : undefined;

    return {
      ...(depthLevel >= ENUM_LOCATION_TYPE.PROVINCE && {
        provinces: VNLocationData.map((province) => province.Name),
      }),
      ...(depthLevel >= ENUM_LOCATION_TYPE.DISTRICT && {
        districts: selectedProvince
          ? selectedProvince.Districts.map((district) => district.Name)
          : [],
      }),
      ...(depthLevel >= ENUM_LOCATION_TYPE.WARD && {
        wards: selectedDistrict
          ? selectedDistrict.Wards.map((ward) => ward.Name)
          : [],
      }),
    };
  }, [location, depthLevel]);

  const handleLocationChange = useCallback(
    (key: keyof ILocation, value: string) => {
      if (location?.[key] === value) {
        setLocation?.(location);
        return location;
      }

      const newLocation: ILocation = { ...location, [key]: value };

      if (key === "province" && depthLevel >= ENUM_LOCATION_TYPE.DISTRICT) {
        newLocation.district = undefined;
        const center = VNLocationData.find(
          (province) => province.Name === value
        )?.Center;
        setZoomController?.(10);
        if (center) {
          setCenterController?.({
            lat: center[0],
            long: center[1],
          });
        }
        if (depthLevel >= ENUM_LOCATION_TYPE.WARD) {
          newLocation.ward = undefined;
          newLocation.wardId = undefined;
        }
      } else if (key === "district" && depthLevel >= ENUM_LOCATION_TYPE.WARD) {
        setDistrict?.(value);
        const center = (VNLocationData.find(
          (province) => province.Name === location.province
        )?.Districts.find(
          (district) => district.Name === value
        ) as any)?.Center;
        setZoomController?.(12);
        if (center) {
          setCenterController?.({
            lat: center[0],
            long: center[1],
          });
        }
        newLocation.ward = undefined;
        newLocation.wardId = undefined;
      } else if (key === "ward" && depthLevel >= ENUM_LOCATION_TYPE.WARD) {
        newLocation.wardId = VNLocationData.find(
          (province) => province.Name === location.province
        )
          ?.Districts.find((district) => district.Name === location.district)
          ?.Wards.find((ward) => ward.Name === value)?.Id;
      }

      setLocation?.(newLocation);
      return newLocation;
    },
    [location, depthLevel, setLocation, setZoomController, setCenterController]
  );

  return (
    <div className={cn(className ?? "flex flex-col gap-2")}>
      {depthLevel >= ENUM_LOCATION_TYPE.PROVINCE &&
        (!isMobile ? (
          <Combobox
            defaultValue={location?.province}
            value={location?.province ?? ""}
            onValueChange={(value) => handleLocationChange("province", value)}
            modal={modal}
            filterItems={(inputValue, items) =>
              items.filter(({ value }) => {
                const province = selectData.provinces?.find(
                  (province) => province === value
                );
                return !inputValue || checkIncludeByAscii(province, inputValue);
              })
            }
          >
            <ComboboxInput
              placeholder={placeholders?.province ?? "Chọn tỉnh/thành phố"}
              disabled={disabled}
              {...props}
            />
            <ComboboxContent>
              {selectData.provinces.map((province) => (
                <ComboboxItem
                  key={province}
                  value={province}
                  label={province}
                />
              ))}
              <ComboboxEmpty>No results</ComboboxEmpty>
            </ComboboxContent>
          </Combobox>
        ) : (
          <ComboboxDrawer
            disabled={disabled}
            selectData={selectData.provinces}
            value={location?.province ?? ""}
            onChange={(value: string) =>
              handleLocationChange("province", value)
            }
            placeholder={placeholders?.province ?? "Chọn tỉnh/thành phố"}
          />
        ))}

      {depthLevel >= ENUM_LOCATION_TYPE.DISTRICT &&
        (!isMobile ? (
          <Combobox
            defaultValue={location?.district}
            value={location?.district ?? ""}
            onValueChange={(value) => handleLocationChange("district", value)}
            modal={modal}
            filterItems={(inputValue, items) =>
              items.filter(({ value }) => {
                const district = selectData.districts?.find(
                  (district) => district === value
                );
                return !inputValue || checkIncludeByAscii(district, inputValue);
              })
            }
          >
            <ComboboxInput
              placeholder={placeholders?.district ?? "Chọn quận/huyện"}
              disabled={!location?.province || disabled}
              {...props}
            />
            <ComboboxContent>
              {selectData.districts.map((district) => (
                <ComboboxItem
                  key={district}
                  value={district}
                  label={district}
                />
              ))}
              <ComboboxEmpty>No results</ComboboxEmpty>
            </ComboboxContent>
          </Combobox>
        ) : (
          <ComboboxDrawer
            disabled={!location?.province || disabled}
            selectData={selectData.districts}
            value={location?.district ?? ""}
            onChange={(value: string) =>
              handleLocationChange("district", value)
            }
            placeholder={placeholders?.district ?? "Chọn quận/huyện"}
          />
        ))}

      {depthLevel >= ENUM_LOCATION_TYPE.WARD &&
        (!isMobile ? (
          <Combobox
            defaultValue={location?.ward}
            value={location?.ward ?? ""}
            onValueChange={(value) => handleLocationChange("ward", value)}
            modal={modal}
            filterItems={(inputValue, items) =>
              items.filter(({ value }) => {
                const ward = selectData.wards?.find((ward) => ward === value);
                return !inputValue || checkIncludeByAscii(ward, inputValue);
              })
            }
          >
            <ComboboxInput
              placeholder={placeholders?.ward ?? "Chọn phường/xã"}
              disabled={!location?.district || disabled}
              {...props}
            />
            <ComboboxContent>
              {selectData.wards.map((ward) => (
                <ComboboxItem key={ward} value={ward} label={ward} />
              ))}
              <ComboboxEmpty>No results</ComboboxEmpty>
            </ComboboxContent>
          </Combobox>
        ) : (
          <ComboboxDrawer
            disabled={!location?.district || disabled}
            selectData={selectData.wards}
            value={location?.ward ?? ""}
            onChange={(value: string) => handleLocationChange("ward", value)}
            placeholder={placeholders?.ward ?? "Chọn phường/xã"}
          />
        ))}

      {depthLevel >= ENUM_LOCATION_TYPE.STREET && (
        <Input
          disabled={disabled}
          value={location?.street}
          onChange={(e) =>
            handleLocationChange("street", e.currentTarget.value)
          }
          maxLength={50}
          placeholder={placeholders?.street ?? "Nhập địa chỉ chi tiết"}
          {...props}
        />
      )}
    </div>
  );
}
