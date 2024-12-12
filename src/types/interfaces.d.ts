/* eslint-disable no-unused-vars */
interface IDefaultPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

interface IDefaultLayoutProps extends Omit<IDefaultPageProps, "searchParams"> {
  children: React.ReactNode;
}

interface ISelectorLocationComponentProps {
  title?: string;
  desc?: string;
  translate?: string;
  noTranslateOptions?: boolean;
  typeTrigger?: number;
  search?: boolean;
  selectedValue: T;
  setSelectedValue: (value: T) => void;
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

interface locate {
  lat?: number;
  long?: number;
  ward?: any;
  tinh?: string;
  huyen?: string;
  xa?: string;
  diachi?: string;
}

interface SelectOption {
  value: string | any;
  icon?: string | any;
  emoji?: string | any;
  label?: string;
  price?: number;
  days?: number;
  desc?: string;
  Id?: string;
  Name?: string;
  Img?: string;
  isSelected?: boolean;

  [key: string]: any;
}

interface IMetadataSelect {
  translate?: string;
  name?: string;
  placeholder?: string;
  multiChoice: boolean;
  icon?: string;
  label: string;
  desc?: string;
  options?: SelectOption[];
}

