/* eslint-disable no-unused-vars */
type TPosition = {
  lat: number;
  long: number;
};

interface ISelectorLocationComponentProps {
  title?: string;
  desc?: string;
  translate?: string;
  noTranslateOptions?: boolean;
  typeTrigger?: number;
  search?: boolean;
  selectedValue: string | string[];
  setSelectedValue: (value: string | string[]) => void;
  triggerCustomize?: any;
  children?: any;
  onlyDialog?: boolean;
  onlySheet?: boolean;
  multiChoice?: boolean;
  positioning?: boolean;
  currentPosition?: TPosition;
  setCurrentPosition?: any;
  typeOptions?: number;
  viewOnly?: boolean;
}

interface SelectorLocationOption {
  Id?: string;
  Name?: string;
  Img?: string;
  Districts?: any[];
  isSelected?: boolean;
}


