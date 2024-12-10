import { Input, InputProps } from '@/components/ui/input';

import { ChevronDownIcon } from 'lucide-react';
import { PopoverAnchor } from '@radix-ui/react-popover';
import type { UseComboboxGetInputPropsReturnValue } from 'downshift';
import { useComboboxContext } from './context';

export type TComboboxInputProps = Omit<
  InputProps,
  keyof UseComboboxGetInputPropsReturnValue
>;

export const ComboboxInput = (props: TComboboxInputProps) => {
  const { getInputProps } = useComboboxContext();

  return (
    <div className='relative w-full' data-combobox-input-wrapper=''>
      <PopoverAnchor asChild>
        <Input {...props} {...getInputProps?.()} />
      </PopoverAnchor>
      <div className='pointer-events-none absolute inset-y-0 end-3 grid h-full place-items-center'>
        <ChevronDownIcon className='size-4 opacity-50' />
      </div>
    </div>
  );
};
