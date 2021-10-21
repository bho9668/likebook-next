import { getAllUsers } from "../../../server/database/user";

export default async function handler(req, res) {
  const users = await getAllUsers()

  res.status(200).json({users});
};