import { CommentModel, UserModel } from "../../../server/database/models"

export default async function handler(req, res) {

  // Not Logged In
  if (!req.cookies.jwt) {
    return res.status(403).json({ error: 'Need Authentication'});
  };

  if (req.method === 'GET') {
    const comments = await CommentModel.find().exec();
    const count = await CommentModel.countDocuments();

    const data = { count, comments };
    return res.status(200).json({ message: 'Comments found', data });
  };

  if (req.method === 'POST') {

    const newComment = await CommentModel.create(
      {
        post: req.body.postId,
        author: req.body.userId,
        textContent: req.body.textContent,
        creationTimestamp: new Date().getTime(),
        updateTimestamp: new Date().getTime(),
        likes: [],
      }
    );

    return res.json({ message: 'Comment created', data: newComment });

  }

};