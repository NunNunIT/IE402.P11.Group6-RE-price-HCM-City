import { Document, Schema, model, models } from 'mongoose';
import { IAnalysis, analysisSchema } from './analysis.schema';

import { IPolygon } from './polygon.model';

export interface IWard extends Document {
  name: string;
  district: string;
  imageUrls: string[];
  polygon: IPolygon[];
  analysis?: IAnalysis;
}

export const WardSchema: Schema = new Schema({
  name: { type: String, required: true },
  polygon: { type: [{ type: Schema.Types.ObjectId, ref: "Polygon" }], default: [] },
  district: { type: Schema.Types.ObjectId, ref: "District", required: true },
  imageUrls: { type: [String], default: [] },
  analysis: { type: analysisSchema },
}, { timestamps: true, strict: false });

export const Ward = models?.Ward ?? model('Ward', WardSchema);