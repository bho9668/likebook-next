import { getAllPosts } from "../../../server/database/post";

export default async function handler(req, res) {
  const posts = await getAllPosts()

  res.status(200).json({posts});
};