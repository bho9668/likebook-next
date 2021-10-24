import jwt from 'jsonwebtoken';
import { UserModel } from '../../../../server/database/models';

export default async function handler(req, res) {

  // Not Logged In
  if (!req.cookies.jwt) {
    return res.status(403).json({ error: 'Need Authentication'});
  }

  // Retrieve User Info from JWT cookie
  const decodedToken = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  let user = await UserModel.findById(decodedToken.data._id).exec();
  const userId = await user._id;

  if (req.method === 'GET') {
    return res
      .status(200)
      .json({ success: true, data: 'Nothing now'})
  }

  if (req.method === 'PUT') {
    const acceptedID = req.body.acceptedId;
    let asker = await UserModel.findById(acceptedID);
    let userFriendRequests = user.friendRequests;

    if (asker.friends.includes(acceptedID)) {
      return res.status(400).json({ success: false, data: 'Already friends' })
    } 

    if (!userFriendRequests.includes(acceptedID)) {
      return res.status(400).json({ success: false, data: 'This user doesn\'t request you' })
    }

    // Add friendship relation to both user
    asker.friends = [...asker.friends, userId];
    user.friends = [...user.friends, acceptedID];

    // Remove friendship request
    const index = user.friendRequests.indexOf(acceptedID);
    user.friendRequests.splice(index, 1);

    const updateUser = await user.save();
    const updateAsker = await asker.save();

    return res
      .status(200)
      .json({ success: true, data: updateUser })

  }

  if (request.method === 'DELETE') {
    const deleteID = req.body.deleteID;
  }

}