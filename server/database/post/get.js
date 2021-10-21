import { PostModel } from '../schema';

async function getAllPosts() {
  return await PostModel.find().exec();
}

async function getPostById(id) {
  return await PostModel.findById(id).exec();
};

async function getUserPost(userId) {
  return await PostModel.find({author: userId}).exec();
};

export { getPostById, getUserPost, getAllPosts };