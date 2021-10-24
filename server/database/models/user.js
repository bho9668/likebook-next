import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';


const UserSchema = new Schema(
  {
    _id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    creationTimestamp: { type: Date, required: true },
    avatar: { type: String },
    friends: [{ type: String, ref:'User'}],
    friendRequests: [{ type: String, ref: "User" }],
    provider: { type: String },
    providerId: { type: String },
  }
);

export const UserModel = mongoose.models.User || model('User', UserSchema); //Avoid overcreation of model