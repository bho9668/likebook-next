import jwt from 'jsonwebtoken';
import { UserModel } from "../../server/database/schema";

export default async function handler(req, res) {
    
  // Not Logged In
  if (!req.cookies.jwt) {
    return res.status(403).json({ error: 'Nobody, Need Authentication'});
  };

  // Retrieve User Info from JWT cookie
  const decodedToken = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  let user = await UserModel.findById(decodedToken.data._id).exec();
  
  return res.status(200).json({ data: user });

};