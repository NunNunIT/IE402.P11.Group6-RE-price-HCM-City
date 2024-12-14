import { Schema, model, models } from "mongoose";

export interface INews {
  title: string;
  content: string;
  owner: string; // Reference to User model
  reviews: string[]; // Array of references to Review model
}

const newsSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reviews: {
      type: [{ type: Schema.Types.ObjectId, ref: "Review" }],
      default: [],
    },
  },
  { timestamps: true }
);

export interface INewsArticle {
  _id: string;
  img: string;
  title: string;
  content: string;
  owner: string;
  userId: string;
  reviews: string[];
  createdAt: string;
  updatedAt: string;
  _v: number;
}

export const News = models?.News ?? model("News", newsSchema);
