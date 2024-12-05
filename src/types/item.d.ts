export type ItemType = "realEstate" | "location" | "all";

export type MockData = {
  type: ItemType;
  value: LocationCardProps | RealEstateCardProps;
};

export interface LocationCardProps {
  image?: string;
  title?: string;
  location?: string;
  duration?: string;
  workshopType?: string;
  rating?: number;
}

export interface RealEstateCardProps {
  image?: string;
  title?: string;
  location?: string;
  distance?: string;
  price?: string;
}
