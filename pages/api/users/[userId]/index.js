import { UserModel } from "../../../../server/database/models";

export default async function getUserApi(req, res) {

  // Not Logged In
  if (!req.cookies.jwt) {
    return res.status(403).json({ error: 'Need Authentication'});
  };

  const user = await UserModel.findById(req.query.userId).exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  };

  if (req.method === 'GET') {
    return res.status(200).json({ message: "User found", data: user });
  };

  if (req.method === 'PUT') {
    return res.status(400).json({ message: 'Not implemented' });
  };

  if (req.method === 'DELETE') {
    user.remove();
    return res.status(200).json({ message: "User deleted" });
  };
};