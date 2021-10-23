import { getUserById } from "../../../server/database/user";
import { to } from 'await-to-js';
import { UserModel } from "../../../server/database/schema";

export default async function getUserApi(req, res) {

  if (req.method === 'GET') {
    const [err, user] = await to(getUserById(req.query.userId)); 

    if (!user) {
      console.log('User not found');
      return res
        .status(404)
        .json({ success: false, data: 'User not found'});
    };

    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, data: 'User API Error'});
    };

    return res
      .status(200)
      .json(user);
  }

  if (req.method === 'DELETE') {
    const userIdToDelete = req.query.userId;
    const userToDelete = await UserModel.findByIdAndDelete({_id: userIdToDelete});

    if (!userToDelete) {
      return res.status(404).json({ data: 'User not found' });
    };

    return res.status(200).json({ data: userToDelete });
  }

};