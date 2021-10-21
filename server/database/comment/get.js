import { CommentModel } from '../schema';

async function getCommentById(id) {
  return await CommentModel.findById(id).exec();
};

export { getCommentById };