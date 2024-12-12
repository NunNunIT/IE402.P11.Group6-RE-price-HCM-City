"use client";

// import libs
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
// import { useMediaQuery } from "usehooks-ts";
// import { isRowSelected } from "@tanstack/react-table";

// import components
import { CiSearch } from "react-icons/ci";
import { IoCheckmark } from "react-icons/io5";
// import { Button } from "@mui/material";
// import { ThemeMuiProvider } from "@/providers";
import { Input } from "@/components/ui/input";
import IconDemandValue from "@/components/icon-demand-value";
import Image from "next/image";
import { CurrencyText } from "@/components/customize-ui";

const Select: React.FC<ISelectComponentProps> = ({
  // label,
  error,
  translate,
  noTranslateOptions = false,
  search,
  // type,
  metadataSelect,
  selectedValue,
  setSelectedValue,
  // children,
  // triggerCustomize,
  // urlPart,
  hideLabel = false,
  desc,
  layoutOptionClassName,
  typeLayoutOption,
  disabled = false,
}) => {
  // console.log("selectDataselectData", selectData);
  // console.log("selectedValueselectedValue", selectedValue);

  const t = useTranslations(translate || "Profile");
  const tCommon = useTranslations("common");
  // const isDesktop = useMediaQuery("(min-width: 860px)");

  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<SelectOption[]>(
    metadataSelect.options
  );

  useEffect(() => {
    setFilteredOptions(metadataSelect.options);
  }, [metadataSelect.options]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value);
    if (typeLayoutOption != 3) {
      setFilteredOptions(
        metadataSelect.options.filter((option) =>
          t(option.value || "")
            .toLowerCase()
            .includes(value.toLowerCase())
        )
      );
    } else if (typeLayoutOption == 3) {
      setFilteredOptions(
        metadataSelect.options.filter((option) =>
          (option.value?.name || "")
            .toLowerCase()
            .normalize("NFD") // Tách các ký tự có dấu thành ký tự và dấu
            .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
            .replace(/đ/g, "d") // Chuyển 'đ' thành 'd'
            .replace(/Đ/g, "D") // Chuyển 'Đ' thành 'D'
            .includes(value.toLowerCase())
        )
      );
    }
  };

  const renderSearch = () => (
    <div className="flex items-center justify-center pt-2">
      <div className="w-full relative flex flex-nowrap items-center">
        <Input
          id="q"
          name="q"
          // className={`inline w-full rounded-lg border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-pri-red-1 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-pri-red-1 sm:text-sm`}
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
  );

  const renderOptionsLayout1 = (item: any, isSelected: boolean) => (
    <div
      className={`w-full h-full border-2 px-4 py-6 rounded-lg cursor-pointer flex flex-col items-center justify-center ${
        isSelected
          ? "border-pri-red-1 dark:bg-zinc-900 bg-zinc-100"
          : "border-gray-300"
      } `}
    >
      <span className="mr-2">
        <IconDemandValue value={item?.icon} />
      </span>
      <span className="text-wrap text-center">
        {noTranslateOptions ? item?.value : t(item?.value)}
      </span>
    </div>
  );

  const renderOptionsLayout2 = (item: any, isSelected: boolean) => (
    <div
      key={item.value}
      className={`group snap-center relative w-full min-w-[20rem] flex flex-col justify-between items-start rounded-lg cursor-pointer p-6 ${
        isSelected
          ? "bg-pri-red-1 text-white hover:bg-pri-red-1/90"
          : "bg-zinc-100 hover:bg-zinc-200 text-zinc-900"
      }`}
    >
      <div className="absolute top-2 right-3 text-white">
        {isSelected && <IoCheckmark className="size-8" />}
      </div>
      <span
        className={`w-fit rounded-full text-nowrap mb-2 ${
          isSelected ? "bg-zinc-900 text-white px-3" : ""
        }`}
      >
        {item.desc}
      </span>
      <span className="text-xl font-bold mb-3">
        {noTranslateOptions ? item.value : t(item.value)}
      </span>
      <span className="text-2xl font-semibold">{item.price}</span>
    </div>
  );

  const renderOptionsLayout3 = (item: any, isSelected: boolean) => {
    return (
      <div
        className={`grid grid-cols-[8rem_auto] max-h-[8rem] gap-2 border-2 rounded-lg cursor-pointer overflow-hidden ${
          isSelected
            ? "border-pri-red-1 dark:bg-zinc-900 bg-zinc-100"
            : "border-gray-300"
        } `}
      >
        <div className="w-28 h-28 aspect-square overflow-hidden">
          <Image
            src={item?.value?.img}
            alt={item?.value?.name}
            width={200}
            height={200}
            loading="lazy"
            className="h-full w-full aspect-square object-cover"
            unoptimized
          />
        </div>
        <span className="py-3 text-base font-medium text-zinc-900 dark:text-white line-clamp-4">
          {item?.value?.name ?? "name"}
        </span>
      </div>
    );
  };

  const renderOptionsLayout4 = (item: any, isSelected: boolean) => (
    <div
      className={`border-2 px-3 py-3 rounded-lg cursor-pointer flex flex-row gap-2 items-center justify-center ${
        isSelected
          ? "border-pri-red-1 dark:bg-zinc-900 bg-zinc-100"
          : "border-gray-300"
      } `}
    >
      <IconDemandValue value={item?.icon} />
      <span className="text-wrap text-center">
        {noTranslateOptions ? item?.value : t(item?.value)}
      </span>
    </div>
  );

  const renderOptionsLayout5 = (item: any, isSelected: boolean) => (
    <div
      key={item.value}
      className={`group w-full flex flex-col gap-2 justify-between items-center rounded-lg ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } p-3 overflow-hidden ${
        isSelected
          ? "bg-pri-red-1 text-white hover:bg-pri-red-1/90"
          : "bg-zinc-100 hover:bg-zinc-200 text-zinc-900"
      }`}
    >
      <div className="flex flex-row gap-3 items-center">
        <div
          className={`flex justify-center items-center w-6 h-6 rounded-full border-2 ${
            isSelected ? "bg-white" : "border-zinc-500"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full text-pri-red-1 flex justify-between items-center`}
          >
            {isSelected && <IoCheckmark className="size-5" />}
          </div>
        </div>
        <span>{noTranslateOptions ? item.value : t(item.value)}</span>
      </div>
      <span className="text-base font-semibold">
        <CurrencyText price={item.price} />/
        {item.value === "weekly"
          ? tCommon("week")
          : item.value === "monthly"
          ? tCommon("month")
          : tCommon("day")}
      </span>
    </div>
  );

  const renderOptionLayouts = (item: any, isSelected: boolean) => {
    switch (typeLayoutOption) {
      case 1:
        return renderOptionsLayout1(item, isSelected);
      case 2:
        return renderOptionsLayout2(item, isSelected);
      case 3:
        return renderOptionsLayout3(item, isSelected);
      case 4:
        return renderOptionsLayout4(item, isSelected);
      case 5:
        return renderOptionsLayout5(item, isSelected);
      default:
        return renderOptionsLayout1(item, isSelected);
    }
  };

  const renderOptions = (item: SelectOption) => {
    // console.log("itemitemitem", item);
    return (
      <div
        className="w-full h-full"
        onClick={
          !disabled
            ? () =>
                setSelectedValue(
                  typeLayoutOption == 3 ? item?.value?.id : item?.value
                )
            : () => {}
        }
      >
        {renderOptionLayouts(
          item,
          typeLayoutOption == 3
            ? item?.value?.id == selectedValue
            : item?.value == selectedValue
        )}
      </div>
    );
  };

  // const [tempSelectedValue, setTempSelectedValue] = useState(selectedValue);

  const renderMultiOptions = (item: SelectOption) => {
    const isSelected =
      Array.isArray(selectedValue) && selectedValue.includes(item?.value);

    const toggleChoice = (value: string) => {
      if (Array.isArray(selectedValue)) {
        const updatedSelected = selectedValue.includes(value)
          ? selectedValue.filter((choiceValue) => choiceValue !== value)
          : [...selectedValue, value];
        setSelectedValue(updatedSelected);
      }
    };

    return (
      <div className="w-full h-full" onClick={() => toggleChoice(item?.value)}>
        {renderOptionLayouts(item, isSelected)}
      </div>
    );
  };

  return (
    <div className="w-full pb-6 relative">
      {(metadataSelect.label != "" && !hideLabel) && (
        <label
          htmlFor=""
          className={`px-4 font-bold ${
            error ? "text-red-500" : "text-black dark:text-white"
          }`}
        >
          {t(metadataSelect.label)}
        </label>
      )}
      {desc && t(metadataSelect.desc)}
      {search && <div>{renderSearch()}</div>}
      <div
        className={`${
          layoutOptionClassName ? layoutOptionClassName : "grid grid-cols-3"
        } gap-4 mt-2`}
      >
        {filteredOptions.map((item: any) =>
          metadataSelect.multiChoice ? (
            <div key={item?.value}>{renderMultiOptions(item)}</div>
          ) : (
            <div key={item?.value}>{renderOptions(item)}</div>
          )
        )}
      </div>
      {error && (
        <p className="absolute font-medium bottom-0 px-4 text-red-500">
          {t(error)}
        </p>
      )}
    </div>
  );
};

export default Select;
