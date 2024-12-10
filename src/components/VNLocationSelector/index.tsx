"use client";

// import libs
import {
  type Dispatch,
  type SetStateAction,
  useCallback, useMemo,
} from "react";
import { useMediaQuery } from "usehooks-ts";

// import components
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
} from '@/components/customize-ui/combobox';
import { ComboboxDrawer } from "../customize-ui";

// import data
import VNLocationData from "../VNLocationSelector/data.json";

// import utils
import { ELocationType, checkIncludeByAscii } from "@/utils";
import { cn } from "@/lib/utils";

interface ILocation {
  province?: string | null;
  district?: string | null;
  ward?: string | null;
  street?: string | null;
}

type TLocationSelectProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value"
  | "onChange"
  | "placeholder"
> & {
  value: ILocation;
  onChange: Dispatch<SetStateAction<ILocation>>;
  depthLevel?: ELocationType;
  placeholders?: {
    province?: string;
    district?: string;
    ward?: string;
    street?: string;
  }
  modal?: boolean;
}

export default function LocationSelect(
  { value: location, onChange: setLocation, className,
    depthLevel = ELocationType.WARD,
    placeholders, modal,
    disabled,
    ...props
  }: TLocationSelectProps
) {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const selectDatas = useMemo(() => {
    const selectedProvince = location?.province
      ? VNLocationData.find((province) => province.Name === location?.province)
      : undefined;
    const selectedDistrict = location?.district
      ? selectedProvince?.Districts.find((district) => district.Name === location.district)
      : undefined;

    return {
      ...(depthLevel >= ELocationType.PROVINCE
        && {
        provinces: VNLocationData.map((province) => province.Name),
      }),
      ...(depthLevel >= ELocationType.DISTRICT
        && {
        districts: selectedProvince
          ? selectedProvince.Districts.map(district => district.Name)
          : [],
      }),
      ...(depthLevel >= ELocationType.WARD
        && {
        wards: selectedDistrict
          ? selectedDistrict.Wards.map((ward: any) => ward.Name || ward.Level)
          : [],
      }),
    };
  }, [location, depthLevel]);

  const handleLocationChange = useCallback((key: keyof ILocation, value: string) => {
    if (location?.[key] === value) {
      setLocation?.(location);
      return location;
    }

    const newLocation: ILocation = { ...location, [key]: value };

    if (
      key === 'province'
      && depthLevel >= ELocationType.DISTRICT
    ) {
      newLocation.district = undefined;
      if (depthLevel >= ELocationType.WARD) {
        newLocation.ward = undefined;
      }
    } else if (
      key === 'district'
      && depthLevel >= ELocationType.WARD
    ) {
      newLocation.ward = undefined;
    }

    setLocation?.(newLocation);
    return newLocation;
  }, [location, depthLevel, setLocation]);

  return (
    <div className={cn(className ?? "flex flex-col gap-2")}>
      {depthLevel >= ELocationType.PROVINCE && (
        !isMobile ? (
          <Combobox
            defaultValue={location?.province}
            value={location?.province ?? ''}
            onValueChange={(value) => handleLocationChange('province', value)}
            modal={modal}
            filterItems={(inputValue, items) =>
              items.filter(({ value }) => {
                const province = selectDatas.provinces?.find((province) => province === value);
                return !inputValue
                  || checkIncludeByAscii(province, inputValue)
              })}
          >
            <ComboboxInput
              placeholder={placeholders?.province ?? "Select a province"}
              disabled={disabled}
              {...props}
            />
            <ComboboxContent>
              {selectDatas.provinces.map((province) => (
                <ComboboxItem key={province} value={province} label={province} />
              ))}
              <ComboboxEmpty>No results</ComboboxEmpty>
            </ComboboxContent>
          </Combobox>
        ) : (
          <ComboboxDrawer
            disabled={disabled}
            selectData={selectDatas.provinces}
            value={location?.province ?? ''}
            onChange={(value: string) => handleLocationChange('province', value)}
            placeholder={placeholders?.province ?? "Select a province"}
          />
        )
      )}

      {depthLevel >= ELocationType.DISTRICT && (
        !isMobile ? (
          <Combobox
            defaultValue={location?.district}
            value={location?.district ?? ''}
            onValueChange={(value) => handleLocationChange('district', value)}
            modal={modal}
            filterItems={(inputValue, items) =>
              items.filter(({ value }) => {
                const district = selectDatas.districts?.find((district) => district === value);
                return !inputValue
                  || checkIncludeByAscii(district, inputValue)
              })}
          >
            <ComboboxInput
              placeholder={placeholders?.district ?? "Select a district"}
              disabled={!location?.province}
              {...props}
            />
            <ComboboxContent>
              {selectDatas.districts.map((district) => (
                <ComboboxItem key={district} value={district} label={district} />
              ))}
              <ComboboxEmpty>No results</ComboboxEmpty>
            </ComboboxContent>
          </Combobox>
        ) : (
          <ComboboxDrawer
            disabled={!location?.province}
            selectData={selectDatas.districts}
            value={location?.district ?? ''}
            onChange={(value: string) => handleLocationChange('district', value)}
            placeholder={placeholders?.district ?? "Select a district"}
          />
        )
      )}

      {depthLevel >= ELocationType.WARD && (
        !isMobile ? (
          <Combobox
            defaultValue={location?.ward}
            value={location?.ward ?? ''}
            onValueChange={(value) => handleLocationChange('ward', value)}
            modal={modal}
            filterItems={(inputValue, items) =>
              items.filter(({ value }) => {
                const ward = selectDatas.wards?.find((ward) => ward === value);
                return !inputValue
                  || checkIncludeByAscii(ward, inputValue)
              })}
          >
            <ComboboxInput
              placeholder={placeholders?.ward ?? "Select a ward"}
              disabled={!location?.district}
              {...props}
            />
            <ComboboxContent>
              {selectDatas.wards.map((ward) => (
                <ComboboxItem key={ward} value={ward} label={ward} />
              ))}
              <ComboboxEmpty>No results</ComboboxEmpty>
            </ComboboxContent>
          </Combobox>
        ) : (
          <ComboboxDrawer
            disabled={!location?.district}
            selectData={selectDatas.wards}
            value={location?.ward ?? ''}
            onChange={(value: string) => handleLocationChange('ward', value)}
            placeholder={placeholders?.ward ?? "Select a ward"}
          />
        )
      )}
    </div >
  );
}
