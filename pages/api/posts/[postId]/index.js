import { getPostById } from "../../../../server/database/post";
import { PostModel, UserModel } from "../../../../server/database/models";
import jwt from 'jsonwebtoken';
import { to } from 'await-to-js';

export default async function handler(req, res) {

  // Not Logged In
  if (!req.cookies.jwt) {
    return res.status(403).json({ error: 'Need Authentication' });
  };

  // Retrieve User Info from JWT cookie
  const decodedToken = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  const user = await UserModel.findById(decodedToken.data._id).exec();

  if (req.method === 'GET') {
    const postId = req.query.postId;
    const [err, post] = await to(getPostById(postId)); 

    if (!post) {
      console.log('Post not found');
      return res.status(404).json({ success: false, data: 'Post not found'});
    };

    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, data: 'Post API Error'})
    }

    return res.status(200).json(post)
  }

  if (req.method === 'DELETE') {
    const postId = req.query.postId;

    const post = await PostModel.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({ data: 'Post not found' });
    };

    return res.status(200).json({ data: post });

  }
}