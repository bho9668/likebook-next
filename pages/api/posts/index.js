import { getAllPosts } from "../../../server/database/post";
import { PostModel, UserModel } from "../../../server/database/schema";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {

  // Not Logged In
  if (!req.cookies.jwt) {
    return res.status(403).json({ error: 'Need Authentication' });
  };

  // Retrieve User Info from JWT cookie
  const decodedToken = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  const user = await UserModel.findById(decodedToken.data._id).exec();

  // Get all posts
  if (req.method === 'GET') {
    const posts = await getAllPosts();
    res.status(200).json({ data: posts });
  };

  // Create a post
  if (req.method === 'POST') {

    const post = await PostModel.create(
      {
        author: user._id,
        textContent: req.body.textContent,
        creationTimestamp: new Date().getTime(),
        updateTimestamp: new Date().getTime(),
      }
    )

    return res.status(200).json({ data: post })

  }

};