import { PostModel, UserModel } from "../../../../server/database/models";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {

    // Not Logged In
    if (!req.cookies.jwt) {
      return res.status(403).json({ error: 'Need Authentication' });
    };
  
    // Retrieve User Info from JWT cookie
    const decodedToken = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const user = await UserModel.findById(decodedToken.data._id).exec();

    const post = await PostModel.findById(req.query.postId).exec();
    if (!post) {
      return res.status(404).json({ data: 'Post not found' });
    };

    // Toggle like
    if (req.method === 'PUT') {
      
      if (!post.likes.includes(user._id)) {
        post.likes = [...post.likes, user._id];
      } else {
        const index = post.likes.indexOf(user._id);
        post.likes.splice(index, 1);
      };

      const updatePost = await post.save();

      return res.status(200).json({ message:'Post liked/unliked', data: updatePost });
    }
}