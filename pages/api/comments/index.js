import { getAllComments } from "../../../server/database/comment";

export default async function handler(req, res) {
  const comments = await getAllComments()

  res.status(200).json({comments});
};