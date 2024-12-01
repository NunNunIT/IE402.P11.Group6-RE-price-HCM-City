import { Schema, model, models } from "mongoose";

import { ENUM_REF_TYPE } from "@/utils";

export interface IComment extends Document {
  itemId: string;
  refType: ENUM_REF_TYPE;
  userId: string;
  content: string;
}

const CommentSchema = new Schema({
  itemId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "refType",
  },
  refType: { type: String, enum: ENUM_REF_TYPE, required: true },
  userId: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true });

export const Comment = models?.Comment ?? model<IComment>('Comment', CommentSchema);