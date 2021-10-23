import { getCommentById } from "../../../server/database/comment";
import { to } from 'await-to-js';

export default async function handler({ query: { commentId }, res }) {
  const [err, comment] = await to(getCommentById(commentId)); 

  if (!comment) {
    console.log('Comment not found');
    return res
      .status(404)
      .json({ success: false, data: 'Comment not found'});
  };

  if (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, data: 'Comment API Error'});
  };

  return res
    .status(200)
    .json(comment);
};