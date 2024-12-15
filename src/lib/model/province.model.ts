import { IAnalysis, analysisSchema } from './analysis.schema';
import { Schema, model, models } from 'mongoose';

export interface IProvince {
  _id: string;
  name: string;
  imageUrl: string[];
  analysis: IAnalysis;
}

export const ProvinceSchema: Schema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: [String], default: [] },
  analysis: analysisSchema,
}, { timestamps: true, strict: false });

export const Province = models?.Province ?? model<IProvince>('Province', ProvinceSchema);