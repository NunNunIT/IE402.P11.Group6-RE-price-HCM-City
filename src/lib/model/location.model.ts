import { Document, Schema, model, models } from 'mongoose';

import { ILocation } from './locate.schema';

export interface ILocationModel extends Document {
  ggMapId?: string;
  ggMapUrl?: string;
  title: string;
  desc?: string;
  categories: string[];
  locate: ILocation;
  imageUrls: string[];
  avgStarGGMap: number;
  exts: string[];
  owner: string;
}

const locationSchema = new Schema({
  ggMapId: { type: String, required: true },
  ggMapUrl: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  categories: { type: [String], default: [] },
  locate: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
    ward: { type: Schema.Types.ObjectId, ref: 'Ward', required: true },  // Reference to Ward model
  },
  imageUrl: { type: [String], default: [] },
  avgStarGGMap: { type: Number },
  exts: { type: [String], default: [] },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to User model
}, { timestamps: true });

export const Location = models?.Location ?? model<ILocationModel>('Location', locationSchema);
