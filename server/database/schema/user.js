import { model, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true, select: false },
    creationTimestamp: { type: Date, required: true },
    friends: [{ type: Schema.Types.ObjectId, ref:'User'}],
    friendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
    provider: { type: String },
    providerId: { type: String },
  }
);

const UserModel = model('User', UserSchema);

export { UserModel };