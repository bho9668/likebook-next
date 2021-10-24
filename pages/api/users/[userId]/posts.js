import { PostModel } from '../../../../server/database/models'

export default async function handler(req, res) {

  // Not Logged In
  if (!req.cookies.jwt) {
    return res.status(403).json({ error: 'Need Authentication'});
  };

  if (req.method === 'GET') {
    const posts = await PostModel.find({ author: req.query.userId }).exec();
    const count = await PostModel.where({ author: req.query.userId }).countDocuments();

    const data = { count, posts }
    return res.status(200).json({ message: 'Posts found', data });
  }

  return res.status(400).json({ data: 'only GET request' });
}