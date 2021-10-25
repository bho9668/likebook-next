import { UserModel } from "../../../server/database/models";

export default async function handler(req, res) {

  // List of all users
  if (req.method === 'GET') {
    const users = await UserModel.find().exec();
    const count = await UserModel.countDocuments();

    const data = { count, users };

    return res.status(200).json({ message: 'Users found', data });
  }

}