import { ILocation, LocationSchema } from './locate.schema';
import { Schema, model, models } from 'mongoose';

import { ENUM_MARKER_SYMBOL } from '@/utils';

export interface ILocationModel {
  ggMapId?: string;
  ggMapUrl?: string;
  title: string;
  desc?: string;
  category: ENUM_MARKER_SYMBOL;
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
  category: { type: [String], enum: ENUM_MARKER_SYMBOL, default: ENUM_MARKER_SYMBOL.DEFAULT },
  locate: LocationSchema,
  imageUrl: { type: [String], default: [] },
  avgStarGGMap: { type: Number },
  exts: { type: [String], default: [] },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to User model
}, { timestamps: true });

export const Location = models?.Location ?? model('Location', locationSchema);
