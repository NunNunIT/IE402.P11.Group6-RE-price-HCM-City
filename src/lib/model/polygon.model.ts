import { Schema, model, models } from 'mongoose';

export interface IPoint {
  lat: number,
  long: number,
}

export interface IPolygon {
  points: IPoint[],
}

const PointSchema: Schema = new Schema({
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
}, { _id: false, strict: false });

const PolygonSchema: Schema = new Schema({
  points: { type: [PointSchema], required: true },
}, { strict: false });

export const Polygon = models?.Polygon ?? model('Polygon', PolygonSchema);