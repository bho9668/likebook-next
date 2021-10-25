import { CommentModel, UserModel } from "../../../../server/database/models";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {

    // Not Logged In
    if (!req.cookies.jwt) {
      return res.status(403).json({ error: 'Need Authentication' });
    };

    // Retrieve User Info from JWT cookie
    const decodedToken = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const user = await UserModel.findById(decodedToken.data._id).exec();

    const comment = await CommentModel.findById(req.query.commentId).exec();
    if (!comment) {
      return res.status(404).json({ data: 'Post not found' });
    };

    // Toggle like
    if (req.method === 'PUT') {

      if (!comment.likes.includes(user._id)) {
        comment.likes = [...comment.likes, user._id];
      } else {
        const index = comment.likes.indexOf(user._id);
        comment.likes.splice(index, 1);
      };

      const updatedComment = await comment.save();

      return res.status(200).json({ message: 'Comment liked/unliked', data: updatedComment });
    }
}