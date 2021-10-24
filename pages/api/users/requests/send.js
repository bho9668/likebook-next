import jwt from 'jsonwebtoken';
import { UserModel } from '../../../../server/database/models'

export default async function handler(req, res) {

  // Not Logged In
  if (!req.cookies.jwt) {
    return res.status(403).json({ error: 'Need Authentication'});
  };

  // Retrieve User Info from JWT cookie
  const decodedToken = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  const user = await UserModel.findById(decodedToken.data._id).exec();
  const userId = await user._id;

  // See user friend requests
  if (req.method === 'GET') {
    return res
      .status(200)
      .json({ success: true, data: decodedToken.data.friendRequests });
    
  };

  // Send a friend Request
  // TODO Add 404 Error
  if (req.method === 'PUT') {
    const senderID = userId;
    const receiverID = req.body.receiverID;

    if (!senderID || !receiverID) {
      return res.status(400).json({ success: false, data: 'Missing/Uncompleted Body' });
    };

    if (senderID === receiverID) {
      return res.status(400).json({ success: false, data: 'Cannot friend yourself' });
    };
    
    let receiver = await UserModel.findOne({ _id: receiverID }).exec();

    if (receiver.friendRequests.includes(senderID)) {
      return res.status(400).json({ success: false, data: 'Friend Request already sent'})
    };

    if (receiver.friends.includes(senderID)) {
      return res.status(400).json({ success: false, data: 'You are already friends'})
    };
    
    receiver.friendRequests = [...receiver.friendRequests, senderID]
  
    const updateReceiver = await receiver.save()
    
    return res.status(200).json({ success: true, data: updateReceiver})
  }

  return res.status(500).json({ success: false, data: 'Only GET and POST requests' })

}