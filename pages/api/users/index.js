import { getAllUsers } from "../../../server/database/user";
import { UserModel } from "../../../server/database/models";
import { hashPassword } from '../../../server/auth/utils'

export default async function handler(req, res) {

  // List of all users
  if (req.method === 'GET') {
    const users = await UserModel.find().exec();
    const count = await UserModel.countDocuments();

    const data = { count, users };

    return res.status(200).json({ message: 'Users found', data });
  }

  // Create a user
  if (req.method === 'POST') {
    const { firstName, lastName, email, password } = req.body;

    // Duplicate Verification
    const alreadyUser = await UserModel.findOne({ email });
    if (alreadyUser) {
      return res.status(409).json({ message: "Email already used" });
    };

    // Email Validation
    if (!/\b\w+\@\w+\.\w+(?:\.\w+)?\b/.test(email)) {
      return res.status(400).json({ message: 'Enter a valid email address.' });
    };

    // Password Validation
    if (password.length < 5 || password.length > 20) {
      return res.status(400).json({ message: 'Password must be between 5 and 20 characters.' });
    };

    const newUser = await UserModel.create(
      {
        _id: email,
        firstName,
        lastName,
        email,
        password: await hashPassword(password),
        creationTimestamp: new Date().getTime(),
      }
    )

    return res.status(200).json({ message:"User Created", data: newUser });
  }

  return res.status(400).json({ message: "Only GET and POST Requests, to modify or delete use /users/userId" })

};