import { ILocation, LocationSchema } from "./locate.schema";
import { Schema, model, models } from "mongoose";

export interface IReply {
  date?: Date;
  content?: string;
}

const ReplySchema = new Schema({
  date: { type: Date },
  content: { type: String }
});

export interface IQA {
  userId: string;
  content: string;
  replies: IReply[];
}

const QASchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming 'User' model exists
  content: { type: String, required: true },
  replies: [ReplySchema],
});

export interface IInfo {
  bed?: number;
  bath?: number;
  // Add other fields as needed (e.g. parking spaces, floors)
}

const InfoSchema = new Schema({
  bed: { type: Number },
  bath: { type: Number },
  // Add other fields as needed (e.g. parking spaces, floors)
}, { _id: false, strict: false });

export interface IRealEstate {
  _id: string;
  title: string;
  desc: string;
  price: number;
  area: number;
  type: string;
  locate: ILocation;
  imageUrls: string[];
  info: IInfo;
  polygon?: string;
  QA: IQA[];
  isAuth: string;
  owner: string;
}

const RealEstateSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  area: { type: Number, required: true },
  type: { type: String, required: true },
  locate: { type: LocationSchema, required: true },
  imageUrls: [{ type: String, required: true }],
  info: { type: InfoSchema },
  polygon: { type: Schema.Types.ObjectId, ref: 'Polygon' }, // Reference to Polygon model
  QA: [QASchema],
  isAuth: { type: String, enum: ["none", "pending", "auth"], default: "none" },
  owner: { type: Schema.Types.ObjectId, ref: 'User'} // Reference to User model
}, { timestamps: true, strict: false });

export const RealEstate = models?.RealEstate ?? model('RealEstate', RealEstateSchema);