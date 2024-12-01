import { Document, Schema, model, models } from 'mongoose';
import { IAnalysis, analysisSchema } from './analysis.schema';

import { IPolygon } from './polygon.model';

export interface IWard extends Document {
  name: string;
  district: string;
  imageUrl: string[];
  polygon: IPolygon[];
  analysis?: IAnalysis;
}

export const WardSchema: Schema = new Schema({
  name: { type: String, required: true },
  district: { type: Schema.Types.ObjectId, ref: "District", required: true },
  imageUrl: { type: [String], default: [] },
  polygon: { type: [{ type: Schema.Types.ObjectId, ref: "Polygon" }], default: [] },
  analysis: { type: analysisSchema, required: false },
}, { timestamps: true });

export const Ward = models?.Ward ?? model<IWard>('Ward', WardSchema);