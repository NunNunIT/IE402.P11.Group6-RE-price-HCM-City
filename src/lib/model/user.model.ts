import { ENUM_GENDER, ENUM_REF_TYPE, ENUM_ROLE } from "@/utils";

import { Schema } from "mongoose";

interface INotification extends Document {
  title: string;
  content: string;
  link: string;
  date: Date;
  isSeen: boolean;
}

const NotificationSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  link: { type: String, required: true },
  date: { type: Date, default: Date.now },
  isSeen: { type: Boolean, default: false },
});

export interface IUser extends Document {
  username: string;
  email: string;
  avt: string;
  phone: string;
  birthday: Date;
  gender: ENUM_GENDER; // true for male, false for female
  address: {
    province: string;
    district: string;
    ward: string;
    street: string;
  };
  locationFav: string[];
  realEstatesFav: string[];
  notifications: INotification[];
  role: ENUM_ROLE;
}

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  avt: { type: String, required: true },
  phone: { type: String, required: true },
  birthday: { type: Date, required: true },
  gender: { type: String, enum: ENUM_GENDER, default: ENUM_GENDER.Unknown },
  address: {
    type: {
      province: { type: String, default: "" },
      district: { type: String, default: "" },
      ward: { type: String, default: "" },
      street: { type: String, default: "" },
    },
    default: {
      province: "",
      district: "",
      ward: "",
      street: "",
    },
  },
  locationFav: { type: [{ type: Schema.Types.ObjectId, ref: ENUM_REF_TYPE.Location }], default: [] },
  realEstatesFav: { type: [{ type: Schema.Types.ObjectId, ref: ENUM_REF_TYPE.RealEstate }], default: [] },
  notifications: { type: [NotificationSchema], default: [] },
  role: { type: String, enum: ENUM_ROLE, default: ENUM_ROLE.User },
})

export const User = models?.User ?? model<IUser>('User', UserSchema);