"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { IoIosArrowDown } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { IoCheckmark } from "react-icons/io5";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";

import { cn } from "@/lib/utils";
import { checkIncludeByAscii } from "@/utils";


const renderSelectTrigger2 = (icon: any, iconSelectedValue: any, selectedValue: any) => (
  <Button
    variant="outline"
    role="combobox"
    aria-expanded={false}
    className="w-full flex justify-start gap-2"
    endIcon={<IoIosArrowDown className="size-6" />}
  >
    <span className="text-left w-full">
      {selectedValue || "Select option..."}
    </span>
  </Button>
);

const Select: React.FC<ISelectComponentProps> = ({
  search = false,
  type,
  metadataSelect,
  selectedValue,
  setSelectedValue,
  children,
  triggerCustomize,
  onlyPopover,
  onlyDrawer,
  desc = false,
  icon = false,
  disabled = false,
  hideLabel = false,
}) => {
  const isDesktop = useMediaQuery("(min-width: 860px)");
  const [iconSelectedValue, setIconSelectedValue] = useState<string>("");
  const renderSelectTrigger1 = useCallback(() => triggerCustomize, [triggerCustomize]);
  const RenderSelectTrigger = useCallback(({ type, icon, iconSelectedValue, selectedValue }: { type: number, icon: any, iconSelectedValue: any, selectedValue: any }) => {
    switch (type) {
      case 1:
        return renderSelectTrigger1();
      case 2:
        return renderSelectTrigger2(icon, iconSelectedValue, selectedValue);
      default:
        return renderSelectTrigger1();
    }
  }, [renderSelectTrigger1]);

  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<SelectOption[]>(
    metadataSelect.options
  );

  useEffect(() => {
    setFilteredOptions(metadataSelect.options);
  }, [metadataSelect.options]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value);
    setFilteredOptions(
      metadataSelect.options.filter((option) =>
        checkIncludeByAscii(option.value || "", value)
      )
    );
  }, [metadataSelect.options]);

  const RenderSearch = useCallback(() => (
    <div className="flex items-center justify-center pt-2">
      <div className="w-full relative flex flex-nowrap items-center">
        <Input
          id="q"
          name="q"
          autoCapitalize="off"
          placeholder="Tìm kiếm"
          type="search"
          value={searchText}
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className={`absolute right-2 inline-flex w-fit h-5/6 aspect-square items-center justify-center px-6 py-0 rounded-lg border border-transparent bg-zinc-100 dark:bg-zinc-900 font-medium text-pri-red-1 shadow-sm hover:bg-zinc-200 dark:hover:bg-zinc-800  focus:outline-none`}
        >
          <CiSearch className="w-auto h-1/2" />
        </button>
      </div>
    </div>
  ), [handleSearchChange, searchText]);

  const RenderOptions = useCallback((item: SelectOption) => (
    <div
      key={item.value}
      className={cn(
        "group text-base rounded-md flex flex-row flex-nowrap justify-start gap-3 items-center cursor-pointer p-2 w-full hover:bg-zinc-50 hover:dark:bg-zinc-950",
        selectedValue === item.value && "text-pri-red-1 dark:text-pri-red-1 bg-zinc-100 dark:bg-zinc-900"
      )}
      onClick={() => {
        setSelectedValue(item?.value);
        setIconSelectedValue(item?.icon);
        setIsPopoverOpen(false);
      }}
    >
      <div className="flex flex-col justify-start items-start">
        {item?.value}
        <span className="text-xs text-zinc-600 dark:text-zinc-300 text-wrap">
          {desc && item?.desc}
        </span>
      </div>
      {selectedValue === item.value && (
        <IoCheckmark className="size-6 text-pri-red-1" />
      )}
    </div>
  ), [desc, selectedValue, setSelectedValue]);

  const [, setTempSelectedValue] = useState(selectedValue);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handlePopoverOpenChange = (isOpen: boolean) => {
    if (disabled) return;

    setIsPopoverOpen(isOpen);
    if (isOpen) setTempSelectedValue(selectedValue);
  };

  const handleDrawerOpenChange = (isOpen: boolean) => {
    setIsDrawerOpen(isOpen);
    if (isOpen) {
      setTempSelectedValue(selectedValue);
    }
  };

  if ((isDesktop || onlyPopover) && !onlyDrawer) {
    return (
      <Popover open={isPopoverOpen} onOpenChange={handlePopoverOpenChange}>
        <div className="relative mb-0.5">
          {!hideLabel && metadataSelect.label}
          <PopoverTrigger disabled={disabled} asChild>
            {RenderSelectTrigger({ type, icon, iconSelectedValue, selectedValue })}
          </PopoverTrigger>
          {disabled && (
            <div className="absolute inset-0 cursor-not-allowed bg-zinc-400/25" />
          )}
        </div>

        <PopoverContent className="relative w-[--radix-popover-trigger-width] space-y-1">
          <Command className="w-full">
            <CommandList className="w-full">
              <CommandGroup className="w-full">
                {filteredOptions.map((item) => (
                  <CommandItem
                    className="w-full"
                    key={item.value}
                    value={item.value}
                    onSelect={() => {
                      setSelectedValue(item.value);
                      setIsPopoverOpen(false);
                    }}
                  >
                    {RenderOptions(item)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          {/* <div className="w-full"> */}
          {/* {filteredOptions.map((item) => (
            <div className="w-full" key={item.value}>
              {RenderOptions(item)}
            </div>
          ))} */}
          {/* </div> */}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={isDrawerOpen} onOpenChange={handleDrawerOpenChange}>
      <div className="relative">
        <DrawerTrigger disabled={disabled} asChild>
          {RenderSelectTrigger({ type, icon, iconSelectedValue, selectedValue })}
        </DrawerTrigger>
        {disabled && (
          <div className="absolute inset-0 cursor-not-allowed bg-zinc-400/25" />
        )}
      </div>
      <DrawerContent className="p-4">
        <DrawerHeader className="flex-initial h-fit z-50 relative w-full flex flex-col justify-between items-center">
          <DrawerTitle className="uppercase">
            {metadataSelect.label}
          </DrawerTitle>
          <DrawerDescription className="text-zinc-500 text-sm">
            {metadataSelect.desc}
            {search && <RenderSearch />}
          </DrawerDescription>
        </DrawerHeader>

        <div className={cn("gap-2 py-8 overflow-auto", "grid")}>
          {children}
          {filteredOptions.map((item: any) => (
            <DrawerClose key={item.value}>
              <RenderOptions {...item} />
            </DrawerClose>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Select;
