import { Schema, model, models } from 'mongoose';

// Định nghĩa interface cho Polygon
export interface IPolygon {
  points: [number, number][]; // Mảng các cặp tọa độ [x, y]
}

// Định nghĩa schema
const PolygonSchema = new Schema(
  {
    points: {
      type: [[Number, Number]], // Mảng 2 chiều gồm các số
      // required: true,   // Trường này bắt buộc phải có
    },
  },
  { strict: false, timestamps: true }
);

// Tạo model
export const Polygon = models?.Polygon || model('Polygon', PolygonSchema);
