import { PostModel } from "../../../server/database/models";

export default async function handler(req, res) {

  // List of all posts
  if (req.method === 'GET') {
    const posts = await PostModel.find().exec();
    const count = await PostModel.countDocuments();

    const data = { count, posts };

    return res.status(200).json({ message: 'Posts found', data });
  }
  
}