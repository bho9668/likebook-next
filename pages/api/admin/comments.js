import { CommentModel } from "../../../server/database/models";

export default async function handler(req, res) {

  // List of all comments
  if (req.method === 'GET') {
    const comments = await CommentModel.find().exec();
    const count = await CommentModel.countDocuments();

    const data = { count, comments };

    return res.status(200).json({ message: 'Comments found', data });
  }
  
}