import { Document, Schema, model, models } from 'mongoose';
import { IAnalysis, analysisSchema } from './analysis.schema';

export interface IDistrict extends Document {
  name: string;
  province: string;
  imageUrl: string[];
  analysis: IAnalysis;
}

export const DistrictSchema: Schema = new Schema({
  name: { type: String, required: true },
  province: { type: Schema.Types.ObjectId, ref: "Province", required: true },
  imageUrl: { type: [String], default: [] },
  analysis: analysisSchema,
}, { timestamps: true });

export const District = models?.District ?? model<IDistrict>('District', DistrictSchema);