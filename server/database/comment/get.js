import { CommentModel } from '../schema';

async function getAllComments() {
  return await CommentModel.find().exec();
}

async function getCommentById(id) {
  return await CommentModel.findById(id).exec();
};

export { getCommentById, getAllComments };