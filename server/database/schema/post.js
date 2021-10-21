import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';

const PostSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    textContent: { type: String, required: true },
    creationTimestamp: { type: Date, required: true},
    updateTimestamp: { type: Date, required: true},
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  }
);

export const PostModel = mongoose.models.Post || model('Post', PostSchema);