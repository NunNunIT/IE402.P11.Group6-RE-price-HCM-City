"use client";

import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxItemProps, useComboboxContext } from "@/components/customize-ui/combobox";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabsType4";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { FaLocationDot } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import { SelectorLocationDialogSheet } from "@/components";
import VNLocationData from '../../VNLocationSelector/data.json';
import { cn } from "@/lib/utils";

export default function SearchTabs() {
  const [searchProvince, setSearchProvince] = useState<string>(
    "Hồ Chí Minh"
  );

  const [value, onValueChange] = useState<string>("");
  const [currentPosition, setCurrentPosition] = useState<TPosition>(undefined);

  const ward = useMemo(() => {
    const context = value.split(",");
    if (context.length === 2) return undefined;
    return context[0]
      .replace("Xã ", "")
      .replace("Thị trấn ", "")
      .replace("Phường ", "");
  }, [value]);
  const district = useMemo(() => {
    const context = value.split(",");
    if (context.length === 2) return context[0];
    return context[1];
  }, [value]);

  return (
    <Tabs defaultValue="realEstate" className="w-full max-w-4xl">
      <TabsList className="">
        <TabsTrigger className="w-36" value="realEstate">
          Bất động sản
        </TabsTrigger>
        <TabsTrigger className="w-36" value="news">
          Tin tức
        </TabsTrigger>
      </TabsList>
      <TabsContent value="realEstate" className="p-4">
        <form
          action={`/search-result`}
          method="GET"
          className={cn(
            "gap-8 flex w-full rounded-md",
            "border border-zinc-200 bg-white px-4 py-2 text-sm",
            "ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed",
            "disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950",
            "dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300"
          )}
        >
          <input type="hidden" name="ward" value={ward} />
          <input type="hidden" name="district" value={district} />
          <input type="hidden" name="province" value={searchProvince} />
          <SelectorLocationDialogSheet
            search={true}
            multiChoice={false}
            selectedValue={searchProvince}
            setSelectedValue={setSearchProvince}
            typeTrigger={2}
            positioning
            currentPosition={currentPosition}
            setCurrentPosition={setCurrentPosition}
            typeOptions={2}
          />
          <Combobox value={value} onValueChange={onValueChange}>
            <ComboboxInput
              startIcon={<IoSearchOutline className="size-6" />}
              placeholder="Nhập địa điểm tìm kiếm"
            />
            <ComboboxContent>
              {VNLocationData
                .find((province) => province.Name === searchProvince)
                ?.Districts
                .map(({ Wards: wards, ...district }) => {
                  const key = `${district.Id}`;
                  const label = `${district.Name}, ${searchProvince}`;
                  return [
                    <ComboboxItem key={key} value={label} label={label} className="justify-start">
                      <CustomizeComboboxItemChildren value={label} label={label} />
                    </ComboboxItem>,
                    ...wards.map((ward) => {
                      const key = `${district.Id + (ward as any)?.Id}`;
                      const label = `${ward.Level} ${(ward as any)?.Name}, ${district.Name}, ${searchProvince}`;
                      return (
                        <ComboboxItem key={key} value={label} label={label} className="justify-start">
                          <CustomizeComboboxItemChildren value={label} label={label} />
                        </ComboboxItem>
                      );
                    })
                  ]
                })}
              <ComboboxEmpty>Không tìm thấy</ComboboxEmpty>
            </ComboboxContent>
          </Combobox>
          <Button type="submit">
            <IoSearchOutline className="size-6" />
          </Button>
        </form>
      </TabsContent>
      <TabsContent value="news" className="p-4">
        <div className="gap-8 flex w-full rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300">
          <Input
            type="text"
            placeholder="Tìm kiếm tin tức"
            startIcon={<IoSearchOutline className="size-6" />}
            className="border-none"
          />
          <Button>
            <IoSearchOutline className="size-6" />
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}

function CustomizeComboboxItemChildren({ label, value }: ComboboxItemProps) {
  const { selectedItem } = useComboboxContext();
  const isSelected = selectedItem?.value === value;

  return (
    <>
      <FaLocationDot className="size-5 mr-2" />
      <span className='text-sm'>{label}</span>
      {isSelected && (
        <span className='ml-auto flex h-full items-center justify-center'>
          <Check className='size-4' />
        </span>
      )}
    </>
  )
}
