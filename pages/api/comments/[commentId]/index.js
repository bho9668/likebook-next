import { CommentModel } from "../../../../server/database/models"

export default async function handler(req, res) {

  // Not Logged In
  if (!req.cookies.jwt) {
    return res.status(403).json({ error: 'Need Authentication'});
  };

  const comment = await CommentModel.findById(req.query.commentId).exec();

  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  };

  if (req.method === 'GET') {
    return res.status(200).json({ message: 'Comment found', data: comment });
  };

  if (req.method === 'PUT') {
    return res.status(400).json({ message: 'Not implemented' });
  };

  if (req.method === 'DELETE') {
    comment.remove();
    return res.status(200).json({ message: "Comment deleted" });
  };

};