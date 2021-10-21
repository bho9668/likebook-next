import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';


const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    creationTimestamp: { type: Date, required: true },
    friends: [{ type: Schema.Types.ObjectId, ref:'User'}],
    friendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
    provider: { type: String },
    providerId: { type: String },
  }
);

export const UserModel = mongoose.models.User || model('User', UserSchema);