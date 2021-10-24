import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';

const CommentSchema = new Schema(
  {
    post: { type: String, ref: "Post", required: true },
    author: { type: String, ref: "User", required: true },
    textContent: { type: String, required: true },
    creationTimestamp: { type: Date, required: true},
    updateTimestamp: { type: Date, required: true},
    //comments: [{ type: String, ref: "Comment" }],
    likes: [{ type: String, ref: "User" }],
  }
);

export const CommentModel = mongoose.models.Comment || model('Comment', CommentSchema);