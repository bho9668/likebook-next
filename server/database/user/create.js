import { UserModel } from '../models'

async function createUser({
  firstName,
  lastName,
  email,
  password,
  providerId,
  provider
}) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findOne({ email })

    if (user) {
      return reject('Email is already in use')
    }

    return resolve(
      await UserModel.create({
        providerId,
        provider,
        firstName,
        lastName,
        email,
        password,
        creationTimestamp: new Date().getTime(),
        friends: [],
        friendRequests: [],
      })
    )
  })
}

export { createUser }