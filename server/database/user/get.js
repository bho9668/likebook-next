import { UserModel } from '../models';

async function getAllUsers() {
  return await UserModel.find().exec();
}

async function getUserById(id) {
  return await UserModel.findById(id).exec();
};

async function getUserByEmail(email) {
  return await UserModel.findOne({ email }).exec();
};

async function getUserByProviderId(providerId) {
  return await UserModel.findOne({ providerId }).exec();
};

export { getUserById, getUserByEmail, getUserByProviderId, getAllUsers };