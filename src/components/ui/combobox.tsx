"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


export function Combobox({
  selectData,
  value,
  onChange,
  placeholder = "Select an option...",
  disabled = false,
  modal,
}: {
  selectData: string[];
  value: string;
  onChange: (__value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  modal?: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      modal={modal}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between dark:text-zinc-300 dark:bg-zinc-900",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          disabled={disabled}
        >
          {value || (
            <span className="placeholder:text-zinc-500 dark:placeholder:text-zinc-400">
              {placeholder}
            </span>
          )}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 dark:bg-zinc-950">
        <Command>
          <CommandInput
            placeholder={placeholder}
            className="h-9 dark:text-zinc-300 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 dark:bg-zinc-950"
          />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {selectData.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  className="dark:text-zinc-300 dark:bg-zinc-950"
                  onSelect={(currentValue: string) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {item}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4 dark:text-zinc-300",
                      value === item ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
