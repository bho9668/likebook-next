import { getAllUsers } from "../../../server/database/user";
import { UserModel } from "../../../server/database/schema";
import { hashPassword } from '../../../server/auth/utils'

export default async function handler(req, res) {

  // List all users
  if (req.method === 'GET') {
    const users = await getAllUsers()
    res.status(200).json({ data: users });
  }

  // Create user
  if (req.method === 'POST') {
    const { firstName, lastName, email, password } = req.body;

    // Duplicate verification
    const alreadyUser = await UserModel.findOne({ email });
    if (alreadyUser) {
      return res.status(409).json({ data: 'Email already used' });
    };

    // Email Validation
    if (!/\b\w+\@\w+\.\w+(?:\.\w+)?\b/.test(email)) {
      return res.status(400).json({ data: 'Enter a valid email address.' });
    };

    // Password Validation
    if (password.length < 5 || password.length > 20) {
      return res.status(400).json({ data: 'Password must be between 5 and 20 characters.' });
    };

    const user = await UserModel.create(
      {
        firstName,
        lastName,
        email,
        password: await hashPassword(password),
        creationTimestamp: new Date().getTime(),
      }
    )

    return res.status(200).json({ data: user });
  }

  if (req.method === 'DELETE') {
    const email = req.body.email;
    const userToDelete = await UserModel.findOneAndDelete({email: email});

    if (!userToDelete) {
      return res.status(404).json({ data: 'User not found' });
    };
    
    return res.status(200).json({ data: 'User deleted' });

  }

};