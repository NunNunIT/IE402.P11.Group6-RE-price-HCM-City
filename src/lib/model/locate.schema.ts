import { Schema } from "mongoose";

export interface ILocation {
  lat: number;
  long: number;
  ward: String;
}

export const LocationSchema = new Schema({
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
  ward: { type: Schema.Types.ObjectId, ref: 'Ward', required: true } // Reference to Ward model
}, { _id: false, strict: false });
