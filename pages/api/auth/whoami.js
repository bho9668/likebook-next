import jwt from 'jsonwebtoken';
import { UserModel } from "../../../server/database/models";

export default async function handler(req, res) {
    
  // Not Logged In
  if (!req.cookies.jwt) {
    return res.status(403).json({ isLoggedIn: false });
  };

  // Retrieve User Info from JWT cookie
  const decodedToken =  jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  let user = await UserModel.findById(decodedToken.data._id).exec();

  if (user) { 
    return res.status(200).json({ isLoggedIn: true, data: user });
  } else {
    return res.status(403).json({ isLoggedIn: false });
  };

};