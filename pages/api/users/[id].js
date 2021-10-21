import { getUserById } from "../../../server/database/user";
import { to } from 'await-to-js';

export default async function getUserApi({ query: { id }, res }) {
  const [err, user] = await to(getUserById(id)); 

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
      .json({ success: false, data: 'User API Error'})
  }

  return res
    .status(200)
    .json(user)
}