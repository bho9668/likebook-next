import { getUserPost } from "../../../../server/database/post";
import { to } from 'await-to-js';

export default async function handler({ query: { userId }, res }) {
  const [err, posts] = await to(getUserPost(userId)); 

  if (!posts) {
    console.log('No post found');
    return res
      .status(404)
      .json({ success: false, data: 'No post found'});
  };

  if (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, data: 'Post API Error'})
  }

  return res
    .status(200)
    .json(posts)
}

