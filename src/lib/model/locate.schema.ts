import { Schema } from "mongoose";

export interface ILocation {
  lat: number;
  long: number;
  ward: String;
  tinh: String;
  huyen: String;
  xa: String;
  diachi: String;
}

export const LocationSchema = new Schema(
  {
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
    ward: { type: Schema.Types.ObjectId, ref: "Ward", required: true }, // Reference to Ward model
    tinh: { type: String, required: false },
    huyen: { type: String, required: false },
    xa: { type: String, required: false },
    diachi: { type: String, required: false },
  },
  { _id: false, strict: false }
);
