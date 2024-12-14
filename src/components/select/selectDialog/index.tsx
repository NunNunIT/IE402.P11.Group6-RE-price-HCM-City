"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { IoIosArrowDown } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { FaCheck } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { LuChevronsUpDown } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";

import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { checkIncludeByAscii } from "@/utils";
import { Label } from "@/components/ui/label";

const Select: React.FC<ISelectComponentProps> = ({
  error,
  search = false,
  type,
  metadataSelect,
  selectedValue,
  setSelectedValue,
  children,
  triggerCustomize,
  onlyDialog,
  onlySheet,
  required = false,
  desc = false,
  icon = false,
  disabled = false,
}) => {
  const isDesktop = useMediaQuery("(min-width: 860px)");
  const [errorNull, setErrorNull] = useState(false);

  const renderSelectTrigger1 = useMemo(
    () => (
      <div className="px-2 py-4 flex flex-row gap-6 flex-nowrap items-center justify-between border-b-[1px] border-zinc-300 dark:border-zinc-700">
        <div className=" text-base font-medium flex flex-row gap-2 flex-nowrap justify-center items-center">
          {metadataSelect.icon && (
            <div className="inline-block mr-2 w-8 h-8">{metadataSelect.icon}</div>
          )}
          <div className="grid grid-cols-1">
            <p className="text-left whitespace-normal tracking-normal">{metadataSelect.label}</p>
            <p className="text-left whitespace-normal tracking-normal text-zinc-500 text-sm">
              {metadataSelect.desc}
            </p>
          </div>
        </div>
        <div className="min-w-5 flex flex-nowrap items-right justify-end gap-2 text-sm text-zinc-500 dark:text-zinc-500">
          <div className="inline-block mr-2 w-4 h-4">
            <IoIosArrowForward />
          </div>
        </div>
      </div>
    ),
    [metadataSelect.desc, metadataSelect.icon, metadataSelect.label]
  );

  const renderSelectTrigger2 = useMemo(
    () => (
      <div className="flex items-center min-h-12 cursor-pointer group rounded-md border dark:border-zinc-800 border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 dark:bg-zinc-900">
        <div className="flex flex-wrap gap-1 items-center">
          {Array.isArray(selectedValue) ? (
            selectedValue.length && selectedValue[0] != "" ? (
              selectedValue.map((item) => (
                <div key={item} className="p-1 px-2 rounded-full bg-pri-red-1 text-base text-white">
                  {item}
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-500">placeholder</p>
            )
          ) : selectedValue != "" ? (
            <div className="p-1 px-2 rounded-full bg-pri-red-1 text-base text-white">
              {selectedValue}
            </div>
          ) : (
            <p className="text-sm text-zinc-500">placeholder</p>
          )}
        </div>
      </div>
    ),
    [selectedValue]
  );

  const renderSelectTrigger4 = useMemo(
    () => (
      <div className="cursor-pointer flex md:flex-col flex-row md:justify-between justify-start md:items-start items-center md:gap-1 gap-3 py-1 md:ml-2">
        <span className="text-xs text-zinc-600 dark:text-zinc-300">{metadataSelect.desc}</span>
        <div className="flex flex-row gap-1 flex-nowrap items-center text-sm line-clamp-1">
          <CiLocationOn className="size-5 text-pri-orange-1" />
          <span className="text-nowrap line-clamp-1 h-6">{selectedValue}</span>
        </div>
      </div>
    ),
    [metadataSelect.desc, selectedValue]
  );

  const renderSelectTrigger5 = useMemo(() => triggerCustomize, [triggerCustomize]);

  const renderSelectTrigger6 = useMemo(
    () => (
      <div className="cursor-pointer w-full pb-6 relative">
        <label
          htmlFor={metadataSelect.label}
          className={cn("px-4 font-bold", error ? "text-red-500" : "text-black dark:text-white")}
        >
          {metadataSelect.label}
        </label>
        <div
          className={cn(
            "w-full px-6 py-5 md:py-3 rounded-full dark:bg-zinc-900 dark:text-white bg-zinc-100 text-black",
            "!outline-none border input-root",
            error ? "border-red-500" : "border-transparent"
          )}
        >
          <span className="flex items-center">
            <span className={cn("block truncate capitalize", !selectedValue && "text-zinc-400")}>
              {selectedValue ? selectedValue : metadataSelect.placeholder}
            </span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5">
            <LuChevronsUpDown aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </span>
        </div>
        {error && <p className="absolute font-medium bottom-0 px-4 text-red-500">{error}</p>}
      </div>
    ),
    [error, metadataSelect.label, metadataSelect.placeholder, selectedValue]
  );

  const handleBlur = useCallback(() => {
    if (required && !selectedValue) {
      setErrorNull(true);
    } else {
      setErrorNull(false);
    }
  }, [required, selectedValue]);

  const renderSelectTrigger7 = useMemo(
    () => (
      <div className={`${required ? "mb-5" : "mb-2"}`}>
        <Label
          htmlFor={metadataSelect.name}
          className="font-medium text-zinc-800 dark:text-zinc-200 text-base flex flex-row gap-1"
        >
          {required && <span className="text-red-600 dark:text-red-500 text-base">*</span>}
          {metadataSelect.label}
        </Label>

        <div className="relative pl-3">
          {desc && (
            <p className="text-zinc-600 dark:text-zinc-500 text-xs mb-1">
              {metadataSelect.desc}
            </p>
          )}

          <div className="relative w-full mt-1">
            {icon && (
              <div className="w-fit h-full absolute left-2 inset-y-0 flex items-center text-zinc-500 dark:text-zinc-500">
              </div>
            )}

            <div
              onBlur={handleBlur}
              className={cn(
                "relative overflow-hidden line-clamp-1 flex flex-wrap items-center gap-2 h-12 w-full mxs:!max-w-none mm:!max-w-none ml:!max-w-none rounded-md border border-zinc-200 bg-white py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
                Array.isArray(selectedValue) && selectedValue.length !== 0 ? "px-2" : "px-4",
                icon ? "pl-10" : "",
                error || errorNull ? "border-red-600 dark:border-red-500" : ""
              )}
            >
              {Array.isArray(selectedValue) ? (
                selectedValue.length === 0 ? (
                  <div className="text-zinc-500 dark:text-zinc-400">
                    {metadataSelect?.placeholder}
                  </div>
                ) : (
                  selectedValue.slice(-3).map((item) => (
                    <div
                      key={item}
                      className={cn(
                        "bg-zinc-200/80 dark:bg-zinc-700 px-2 py-0.5 rounded-full",
                        item != ""
                          ? "text-zinc-900 dark:text-zinc-100"
                          : "text-zinc-500 dark:text-zinc-400"
                      )}
                    >
                      {item != "" ? item : metadataSelect?.placeholder}
                    </div>
                  ))
                )
              ) : (
                <div className={cn(selectedValue !== "" ? "" : "text-zinc-500")}>
                  {selectedValue != "" ? selectedValue : metadataSelect?.placeholder}
                </div>
              )}
              <IoIosArrowDown className="absolute flex items-center top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {errorNull && (
          <span className="absolute -bottom-5 text-red-500 text-xs">
            {metadataSelect.label}
          </span>
        )}
      </div>
    ),
    [desc, error, errorNull, handleBlur, icon, required, metadataSelect.desc, metadataSelect.label, metadataSelect.name, metadataSelect?.placeholder, selectedValue]
  );

  const renderSelectTrigger8 = useMemo(
    () => (
      <div
        className={cn(
          "w-full bg-white dark:bg-zinc-900 md:bg-transparent rounded-md md:rounded-none",
          "md:shadow-none shadow-md px-3 py-6 flex flex-row gap-3 items-center justify-between",
          "cursor-pointer"
        )}
      >
        <div className="w-full flex flex-col">
          <div className="flex flex-row gap-2">
            <span className="text-zinc-900 dark:text-zinc-100">{metadataSelect?.label}</span>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-600">{metadataSelect?.desc}</p>
        </div>
        <div className="w-fit min-w-[12rem] flex flex-row gap-2 justify-end items-center">
          {selectedValue}
          <IoIosArrowDown className="size-3" />
        </div>
      </div>
    ),
    [metadataSelect?.desc, metadataSelect?.label, selectedValue]
  );

  const RenderSelectTrigger = useCallback(
    ({ type }: { type: number }) => {
      switch (type) {
        case 1:
          return renderSelectTrigger1;
        case 2:
          return renderSelectTrigger2;
        case 4:
          return renderSelectTrigger4;
        case 5:
          return renderSelectTrigger5;
        case 6:
          return renderSelectTrigger6;
        case 7:
          return renderSelectTrigger7;
        case 8:
          return renderSelectTrigger8;
        default:
          return renderSelectTrigger1;
      }
    },
    [
      renderSelectTrigger1,
      renderSelectTrigger2,
      renderSelectTrigger4,
      renderSelectTrigger5,
      renderSelectTrigger6,
      renderSelectTrigger7,
      renderSelectTrigger8,
    ]
  );

  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<SelectOption[]>(metadataSelect.options);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchText(value);
      setFilteredOptions(
        metadataSelect.options.filter((option) => checkIncludeByAscii(option.value || "", value))
      );
    },
    [metadataSelect.options]
  );

  useEffect(() => {
    setFilteredOptions(metadataSelect.options);
  }, [metadataSelect.options]);

  const RenderSearch = useCallback(
    () => (
      <div className="flex items-center justify-center pt-2">
        <div className="w-full relative flex flex-nowrap items-center">
          <Input
            id="q"
            name="q"
            // className={`inline w-full rounded-lg border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-pri-red-1 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-pri-red-1 sm:text-sm`}
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
    ),
    [handleSearchChange, searchText]
  );

  const RenderOptions = useCallback(
    (item: SelectOption) => (
      <div
        key={item.value}
        className={cn(
          "group flex gap-2 items-center cursor-pointer p-2",
          selectedValue === item.value && "text-pri-red-1"
        )}
        onClick={() => setSelectedValue(item.value)}
      >
        <div
          className={cn(
            "flex justify-center items-center p-[2px] w-6 h-6 rounded-full border-2 group-hover:border-pri-red-1",
            selectedValue === item.value ? "border-pri-red-1" : "border-zinc-500"
          )}
        >
          <div
            className={cn(
              "w-4 h-4 rounded-full",
              selectedValue === item.value ? "bg-pri-red-1" : "bg-transparent"
            )}
          />
        </div>
        {item.value}
      </div>
    ),
    [selectedValue, setSelectedValue]
  );

  const [tempSelectedValue, setTempSelectedValue] = useState(selectedValue);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const RenderMultiOptions = useCallback(
    (props: SelectOption) => {
      const isSelected =
        Array.isArray(tempSelectedValue) && tempSelectedValue.includes(props.value);

      const toggleChoice = (value: string) => {
        if (Array.isArray(tempSelectedValue)) {
          const updatedSelected = tempSelectedValue.includes(value)
            ? tempSelectedValue.filter((choiceValue) => choiceValue !== value)
            : [...tempSelectedValue, value];
          setTempSelectedValue(updatedSelected);
        }
      };

      return (
        <div
          key={props.value}
          className={cn(
            "group w-fit flex gap-2 items-center rounded-full cursor-pointer p-2 pr-3",
            isSelected
              ? "bg-pri-red-1 text-white  hover:bg-pri-red-1/90"
              : "bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800"
          )}
          onClick={() => toggleChoice(props.value)}
        >
          <div
            className={cn(
              "flex justify-center items-center w-6 h-6 rounded-full border-2",
              isSelected ? "bg-white" : "border-zinc-500"
            )}
          >
            <div className="w-4 h-4 rounded-full text-pri-red-1">{isSelected && <FaCheck />}</div>
          </div>
          {props.value}
        </div>
      );
    },
    [tempSelectedValue]
  );

  const handleOkClick = useCallback(() => {
    setSelectedValue(tempSelectedValue);
    setIsDialogOpen(false);
    setIsSheetOpen(false);
  }, [setSelectedValue, tempSelectedValue]);

  const handleDialogOpenChange = useCallback(
    (isOpen: boolean) => {
      if (disabled) return;

      setIsDialogOpen(isOpen);
      if (isOpen) setTempSelectedValue(selectedValue);
    },
    [disabled, selectedValue]
  );

  const handleSheetOpenChange = useCallback(
    (isOpen: boolean) => {
      setIsSheetOpen(isOpen);
      if (isOpen) {
        setTempSelectedValue(selectedValue);
      }
    },
    [selectedValue]
  );

  if ((isDesktop || onlyDialog) && !onlySheet) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
        <div className="relative">
          <DialogTrigger disabled={disabled} asChild>
            {RenderSelectTrigger({ type })}
          </DialogTrigger>
          {disabled && <div className="absolute inset-0 cursor-not-allowed bg-zinc-400/25" />}
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="uppercase">{metadataSelect.label}</DialogTitle>
            <DialogDescription className="text-zinc-500 text-sm">
              {metadataSelect.desc}
              {search && <RenderSearch />}
            </DialogDescription>
          </DialogHeader>
          <div
            className={cn(
              "gap-2 mb-8 overflow-auto max-h-[50vh] no-scrollbar",
              metadataSelect.multiChoice ? "flex flex-wrap" : "grid"
            )}
          >
            {children}
            {filteredOptions.map((item) =>
              metadataSelect.multiChoice ? (
                <div key={item.value}>{RenderMultiOptions(item)}</div>
              ) : (
                <DialogClose key={item.value}>{RenderOptions(item)}</DialogClose>
              )
            )}
          </div>
          {metadataSelect.multiChoice && (
            <DialogFooter className="absolute bottom-0 right-0 p-2 md:pr-8 w-full justify-end">
              <div className="w-full md:w-fit flex justify-end right-0 gap-4">
                <DialogClose onClick={handleOkClick} className="w-full">
                  OK
                </DialogClose>
              </div>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <div className="relative">
        <SheetTrigger disabled={disabled} asChild>
          {RenderSelectTrigger({ type })}
        </SheetTrigger>
        {disabled && <div className="absolute inset-0 cursor-not-allowed bg-zinc-400/25" />}
      </div>
      <SheetContent className="inset-0 flex flex-col px-2" side="bottom">
        <SheetHeader className="flex-initial h-fit z-50 relative w-full flex flex-row justify-between items-center">
          <SheetTitle className="uppercase">{metadataSelect.label}</SheetTitle>
          <div className="w-8"></div>
        </SheetHeader>
        <SheetDescription className="text-zinc-500 text-sm">
          {metadataSelect.desc}
          {search && <RenderSearch />}
        </SheetDescription>

        <div
          className={cn(
            "gap-2 py-8 overflow-auto",
            metadataSelect.multiChoice ? "flex flex-wrap" : "grid"
          )}
        >
          {children}
          {filteredOptions.map((item: any) =>
            metadataSelect.multiChoice ? (
              <div key={item.value}>
                <RenderMultiOptions {...item} />
              </div>
            ) : (
              <SheetClose key={item.value}>
                <RenderOptions {...item} />
              </SheetClose>
            )
          )}
        </div>
        {metadataSelect.multiChoice && (
          <SheetFooter className="absolute bottom-0 right-0 w-full p-2">
            <div className="w-full flex justify-end items-center gap-4">
              <SheetClose onClick={handleOkClick} className="w-full">
                OK
              </SheetClose>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Select;
