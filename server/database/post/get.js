import { PostModel } from '../schema';

async function getPostById(id) {
  return await PostModel.findById(id).exec();
};

export { getPostById };