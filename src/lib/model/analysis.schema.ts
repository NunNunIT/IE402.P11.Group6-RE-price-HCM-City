import { Schema } from "mongoose";

export interface IAnalysis {
  [year: number]: {
    priceAVG: number;
    [month: number]: number;
  }
}

export const analysisSchema = new Schema({
  type: Map,
  of: {
    priceAVG: { type: Number, required: true },
    additionalData: {
      type: Map,
      of: Number
    }
  },
  default: {}
}, { _id: false, timestamps: true });