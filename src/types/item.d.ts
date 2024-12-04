export type ItemType = "realestate" | "location" | "news" | "all";

export type MockData = {
  type: ItemType;
  value: LocationCardProps | NewsCardProps | RealEstateCardProps;
};

export interface LocationCardProps {
  image?: string;
  title?: string;
  location?: string;
  duration?: string;
  workshopType?: string;
  rating?: number;
}

export interface NewsCardProps {
  image?: string;
  title?: string;
}

export interface RealEstateCardProps {
  image?: string;
  title?: string;
  location?: string;
  distance?: string;
  price?: string;
}
