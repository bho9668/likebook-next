import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';

const CommentSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    textContent: { type: String, required: true },
    creationTimestamp: { type: Date, required: true},
    updateTimestamp: { type: Date, required: true},
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  }
);

export const CommentModel = mongoose.models.Comment || model('Comment', CommentSchema);