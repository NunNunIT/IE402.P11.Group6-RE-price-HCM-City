"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaChevronDown, FaLocationDot } from "react-icons/fa6";
import { ChangeEvent, useCallback, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { LocateIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getRelativeLocation } from "@/utils/functions";
import selectData from "../data.json";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";

const Select: React.FC<ISelectorLocationComponentProps> = ({
  multiChoice = false,
  title,
  desc,
  search = false,
  typeTrigger,
  selectedValue,
  setSelectedValue,
  children,
  triggerCustomize,
  onlyDialog,
  onlySheet,
  positioning = false,
  typeOptions = 1,
  setCurrentPosition,
  viewOnly = false,
}) => {
  const isDesktop = useMediaQuery("(min-width: 860px)");
  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<any[]>(selectData);

  const renderButtonPositioning = () => (
    <Button
      onClick={allowAccessCurrentPosition}
      variant="outline"
      startIcon={<LocateIcon className="w-5" />}
      className="w-full col-span-2"
    >
      Vị trí của bạn
    </Button>
  );

  const allowAccessCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      toast.error("Trình duyệt không hỗ trợ truy cập vị trí của bạn");
      return;
    }

    const success = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      const newCurrentPosition = { lat: latitude, long: longitude };
      setCurrentPosition(newCurrentPosition);

      const payload = await getRelativeLocation(newCurrentPosition);
      if (!payload) return;

      const {
        address: { state: rawState },
      } = payload;
      if (!rawState) return;

      const state = rawState.replace("Tỉnh", "").replace("province", "").trim();
      if (!state) return;

      setSelectedValue(state);
    };

    const error = (err: GeolocationPositionError) => {
      console.error("Error while getting current position:", err.message);
    };

    const geolocationPromise = () =>
      new Promise<void>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            await success(position);
            resolve();
          },
          (err) => {
            error(err);
            reject(err);
          }
        );
      });

    toast.promise(geolocationPromise, {
      loading: "Đang xác định vị trí của bạn...",
      success: "Đã xác định vị trí của bạn",
      error: "Không thể truy cập vị trí của bạn",
    });
  }, [setCurrentPosition, setSelectedValue]);


  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilteredOptions(
      selectData.filter(
      (option) => option.Name.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(value.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""))
      )
    );
    setSearchText(value);
  }, []);

  const renderSelectTrigger2 = ({ value }: { value: string }) => (
    <div className="h-full flex flex-nowrap justify-center items-center gap-2 text-base min-w-[100px] text-nowrap cursor-pointer">
      <FaLocationDot className="size-4 text-zinc-800" />
      {value}
      <FaChevronDown className="size-2 text-zinc-800" />
    </div>
  );

  const renderSelectTrigger1 = () => triggerCustomize;

  const renderSelectTrigger = ({ value }: { value: string }) => {
    switch (typeTrigger) {
      case 1:
        return renderSelectTrigger1();
      case 2:
        return renderSelectTrigger2({ value });
      default:
        return renderSelectTrigger1();
    }
  };

  const RenderSearch = useCallback(({ value, onChange }: { value: string, onChange: any }) => (
    <div className="flex items-center justify-center pt-2">
      <div className="w-full relative flex flex-nowrap items-center">
        <Input
          id="q"
          name="q"
          autoCapitalize="off"
          placeholder="Tìm kiếm"
          type="search"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  ), []);

  const RenderOptions = (item: SelectorLocationOption) => {
    switch (typeOptions) {
      case 1:
        return RenderOptions1(item);
      case 2:
        return RenderOptions2(item);
      default:
        return RenderOptions1(item);
    }
  };

  const RenderOptions1 = (item: SelectorLocationOption) => (
    <div
      key={item.Name}
      className={cn(
        "group flex gap-2 items-center cursor-pointer p-2 h-fit",
        selectedValue === item.Name && "text-pri-red-1"
      )}
      onClick={() => setSelectedValue(item.Name!)}
    >
      <div className={cn(
        "flex justify-center items-center p-[2px] w-6 h-6 rounded-full border-2 group-hover:border-pri-red-1",
        selectedValue === item.Name ? "border-pri-red-1" : "border-zinc-500"
      )}>
        <div className={cn(
          "w-4 h-4 rounded-full",
          selectedValue === item.Name ? "bg-pri-red-1" : "bg-transparent"
        )} />
      </div>

      {item.Name}
    </div>
  );

  const RenderOptions2 = (item: SelectorLocationOption) => (
    <div
      key={item.Name}
      className={cn(
        "relative group cursor-pointer py-12",
        selectedValue === item.Name ? "text-white" : "text-white"
      )}
      style={{ backgroundImage: `url(${item.Img})`, backgroundSize: "cover" }}
      onClick={() => setSelectedValue(item.Name!)}
    >
      <div className={cn(
        "p-2 flex gap-2 items-end absolute bottom-0  w-full z-10",
        selectedValue === item.Name
          ? "h-fit bg-gradient-to-tr from-pri-red-1"
          : "h-1/2 bg-gradient-to-t from-black/80"
      )}>
        <div className={cn(
          "flex justify-center items-center p-[2px] w-6 h-6 rounded-full border-2 group-hover:border-pri-red-1",
          selectedValue === item.Name ? "border-white" : "border-zinc-500"
        )}>
          <div className={cn(
            "w-4 h-4 rounded-full",
            selectedValue === item.Name ? "bg-white" : "bg-transparent"
          )} />
        </div>
        {item.Name}
      </div>
    </div>
  );

  const [tempSelectedValue, setTempSelectedValue] = useState(selectedValue);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const RenderMultiOptions = (props: SelectorLocationOption) => {
    const isSelected =
      Array.isArray(tempSelectedValue) &&
      tempSelectedValue.includes(props.Name!);

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
        key={props.Name}
        className={cn(
          "group w-fit h-fit flex gap-2 items-center rounded-full cursor-pointer p-2 pr-3",
          isSelected
            ? "bg-pri-red-1 text-white hover:bg-pri-red-1/90"
            : "bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800"
        )}
        onClick={() => toggleChoice(props.Name!)}
      >
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full border-2",
            isSelected ? "bg-white" : "border-zinc-500"
          )}
        >
          <div className="w-4 h-4 rounded-full text-pri-red-1">
            {isSelected && <FaCheck />}
          </div>
        </div>
        {props.Name}
      </div>
    );
  };

  const handleOkClick = () => {
    setSelectedValue(tempSelectedValue);
    setIsDialogOpen(false);
    setIsSheetOpen(false);
  };

  const handleDialogOpenChange = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);
    if (isOpen) {
      setTempSelectedValue(selectedValue);
    }
  };

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen);
    if (isOpen) {
      setTempSelectedValue(selectedValue);
    }
  };

  if ((isDesktop || onlyDialog) && !onlySheet) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
        <div className="relative">
          {!viewOnly && (
            <DialogTrigger asChild>{renderSelectTrigger({ value: selectedValue })}</DialogTrigger>
          )}
          {viewOnly && renderSelectTrigger({ value: selectedValue })}
        </div>

        <DialogContent className="w-[50vw]">
          <DialogHeader>
            <DialogTitle className="uppercase">{title}</DialogTitle>
            <DialogDescription className="text-zinc-500 text-sm">
              {desc}
              {search && <RenderSearch value={searchText} onChange={handleSearchChange} />}
            </DialogDescription>
          </DialogHeader>

          {positioning && (
            <div className="w-full">
              <DialogClose asChild>{renderButtonPositioning()}</DialogClose>
            </div>
          )}

          <div
            className={cn(
              "gap-2 mb-8 overflow-auto h-full max-h-[50vh] no-scrollbar",
              multiChoice
                ? "flex flex-wrap justify-start"
                : typeOptions == 2
                  ? "grid grid-cols-2"
                  : "grid"
            )}
          >
            {filteredOptions?.map((item, index) =>
              multiChoice ? (
                <RenderMultiOptions key={index} {...item} />
              ) : (
                <DialogClose key={index}>{RenderOptions(item)}</DialogClose>
              )
            )}
          </div>

          {multiChoice && (
            <DialogFooter className="flex justify-end">
              <DialogClose>
                <Button onClick={handleOkClick} variant="priRed1">
                  OK
                </Button>
              </DialogClose>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  if ((!isDesktop || onlySheet) && !onlyDialog) {
    return (
      <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
        <div className="relative">
          {!viewOnly && (
            <SheetTrigger asChild>{renderSelectTrigger({ value: selectedValue })}</SheetTrigger>
          )}
          {viewOnly && renderSelectTrigger({ value: selectedValue })}
        </div>
        <SheetContent side="bottom" className="">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <div className="w-8"></div>
          </SheetHeader>
          <SheetDescription>
            {desc}
            {search && <RenderSearch value={searchText} onChange={handleSearchChange} />}
          </SheetDescription>
          {positioning && (
            <div className="col-span-2 w-full">
              <SheetClose asChild>{renderButtonPositioning()}</SheetClose>
            </div>
          )}

          <div
            className={cn(
              positioning ? "max-h-[68dvh]" : "max-h-[72dvh]",
              "gap-2 mt-2 mb-8 overflow-auto h-fit hide-scrollbar scroll-smooth",
              multiChoice
                ? "flex flex-wrap justify-start items-start"
                : typeOptions == 2
                  ? "grid grid-cols-2"
                  : "grid"
            )}
          >
            {filteredOptions?.map((item, index) =>
              multiChoice ? (
                <RenderMultiOptions key={index} {...item} />
              ) : (
                <SheetClose key={index}>{RenderOptions(item)}</SheetClose>
              )
            )}
          </div>

          {multiChoice && (
            <SheetFooter className="absolute bottom-2">
              <SheetClose>
                <Button
                  onClick={handleOkClick}
                  variant="priRed1"
                  className="w-full"
                >
                  OK
                </Button>
              </SheetClose>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    );
  }

  return <>{children}</>;
};

export default Select;
