import { useMemo, type ComponentPropsWithoutRef } from 'react';
import { Check } from 'lucide-react';

import { useComboboxContext } from './context';
import { cn } from '@/lib/utils';

import type { ComboboxItemBase } from './types';

export type ComboboxItemProps = ComboboxItemBase &
  ComponentPropsWithoutRef<'li'>;

export const ComboboxItem = ({
  label,
  value,
  disabled,
  className,
  children,
  ...props
}: ComboboxItemProps) => {
  const { filteredItems, getItemProps, selectedItem } = useComboboxContext();

  const isSelected = selectedItem?.value === value;
  const item = useMemo(
    () => ({ disabled, label, value }),
    [disabled, label, value]
  );
  const index = (filteredItems || []).findIndex(
    item => item.value.toLowerCase() === value.toLowerCase()
  );
  if (index < 0) return null;

  return (
    <li
      {...props}
      data-index={index}
      className={cn(
        "h-10 aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-selected:bg-accent aria-selected:text-accent-foreground",
        "hover:bg-zinc-100 hover:text-zinc-900 hover:dark:bg-zinc-800 hover:dark:text-zinc-50",
        disabled && "pointer-events-none opacity-50",
        "text-sm outline-none",
        "flex cursor-pointer select-none rounded-sm px-2 py-1.5 justify-between items-center",
        "dark:text-zinc-300 dark:bg-zinc-950",
        className
      )}
      {...getItemProps?.({ item, index })}
    >
      {children || (
        <>
          <span className='text-sm'>{label}</span>
          {isSelected && (
            <span className='flex h-full items-center justify-center'>
              <Check className='size-4' />
            </span>
          )}
        </>
      )}
    </li>
  );
};
