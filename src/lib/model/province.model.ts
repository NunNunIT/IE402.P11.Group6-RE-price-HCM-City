import { Document, Schema, model, models } from 'mongoose';
import { IAnalysis, analysisSchema } from './analysis.schema';

export interface IProvince extends Document {
  name: string;
  imageUrl: string[];
  analysis: IAnalysis;
}

export const ProvinceSchema: Schema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: [String], default: [] },
  analysis: analysisSchema,
}, { timestamps: true });

export const Province = models?.Province ?? model<IProvince>('Province', ProvinceSchema);