import { Document, Schema, model, models } from 'mongoose';

export interface IPoint {
  lat: number,
  long: number,
}

export interface IPolygon extends Document {
  points: IPoint[],
}

const PointSchema: Schema = new Schema({
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
}, { _id: false });

const PolygonSchema: Schema = new Schema({
  points: { type: [PointSchema], required: true },
}, { timestamps: true });

export const Polygon = models?.Polygon ?? model<IPolygon>('Polygon', PolygonSchema);