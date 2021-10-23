import { getPostById } from "../../../server/database/post";
import { to } from 'await-to-js';

export default async function handler({ query: { postId }, res }) {
  const [err, post] = await to(getPostById(postId)); 

  if (!post) {
    console.log('Post not found');
    return res
      .status(404)
      .json({ success: false, data: 'Post not found'});
  };

  if (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, data: 'Post API Error'})
  }

  return res
    .status(200)
    .json(post)
}