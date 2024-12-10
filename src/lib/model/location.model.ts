import { ILocation, LocationSchema } from './locate.schema';
import { Schema, model, models } from 'mongoose';

export interface ILocationModel {
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
  category: { type: String, default: "default" },
  locate: LocationSchema,
  imageUrl: { type: [String], default: [] },
  avgStarGGMap: { type: Number },
  exts: { type: [String], default: [] },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to User model
}, { timestamps: true });

export const Location = models?.Location ?? model('Location', locationSchema);
