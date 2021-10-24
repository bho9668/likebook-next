import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';

const PostSchema = new Schema(
  {
    author: { type: String, ref: "User", required: true },
    textContent: { type: String, required: true },
    creationTimestamp: { type: Date, required: true},
    updateTimestamp: { type: Date, required: true},
    comments: [{ type: String, ref: "Comment" }],
    likes: [{ type: String, ref: "User" }],
  }
);

export const PostModel = mongoose.models.Post || model('Post', PostSchema);