import { ILocation, LocationSchema } from "./locate.schema";
import { Schema, model, models } from "mongoose";

export interface IReply {
  date: Date;
  content: string;
}

const ReplySchema = new Schema({
  date: { type: Date, required: true },
  content: { type: String, required: true }
});

export interface IQA {
  userId: string;
  content: string;
  replies: IReply[];
}

const QASchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Assuming 'User' model exists
  content: { type: String, required: true },
  replies: [ReplySchema],
});

export interface IInfo {
  bed: number;
  bath: number;
  // Add other fields as needed (e.g. parking spaces, floors)
}

const InfoSchema = new Schema({
  bed: { type: Number, required: true },
  bath: { type: Number, required: true },
  // Add other fields as needed (e.g. parking spaces, floors)
}, { _id: false });

export interface IRealEstate {
  _id: string;
  title: string;
  desc: string;
  price: number;
  area: number;
  locate: ILocation;
  ward: string;
  imageUrls: string[];
  info: IInfo;
  polygon: string;
  exts: string[];
  QA: IQA[];
  isAuth: boolean;
  owner: string;
}

const RealEstateSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  area: { type: Number, required: true },
  locate: { type: LocationSchema, required: true },
  imageUrls: [{ type: String, required: true }],
  info: { type: InfoSchema, required: true },
  polygon: { type: Schema.Types.ObjectId, ref: 'Polygon', required: true }, // Reference to Polygon model
  exts: [{ type: String }],
  QA: [QASchema],
  isAuth: { type: Boolean, default: false },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true } // Reference to User model
}, { timestamps: true, strict: false });

export const RealEstate = models?.RealEstate ?? model('RealEstate', RealEstateSchema);
