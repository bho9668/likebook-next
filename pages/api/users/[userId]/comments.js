import { CommentModel } from '../../../../server/database/models'

export default async function handler(req, res) {

  // Not Logged In
  if (!req.cookies.jwt) {
    return res.status(403).json({ error: 'Need Authentication'});
  };

  if (req.method === 'GET') {
    const comments = await CommentModel.find({ author: req.query.userId }).exec();
    const count = await CommentModel.where({ author: req.query.userId }).countDocuments();

    const data = { count, comments }
    return res.status(200).json({ message:'Comments found', data });
  }

  return res.status(400).json({ data: 'only GET request' });
}