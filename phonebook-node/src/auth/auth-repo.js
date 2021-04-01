makeUser = require('./user')
authHandler = require('../helpers/auth-handler')
passwordHandler = require('../helpers/password-handler')

module.exports = function makeAuthRepo ({ database }) {
  return Object.freeze({
    register,
    login,
  })

  async function register ({...user }) {   
    const db = await database
    const { result, ops } = await db
      .collection('users')
      .insertOne({...user})
    createdUser = ops[0]
    return createdUser
  }

  async function login ({ userPassword, ...user }) {
    const db = await database
    const foundUser = await db
      .collection('users')
      .findOne({ username: user.username })

    if (foundUser) {
      if (await passwordHandler.passwordMatchesHash({ password: userPassword, hash: foundUser.hashedPassword}))
        return {token: authHandler.generateAccessToken({data: foundUser, expireTime: "2h"})}
      else return {error: "Incorrect password"}
    }
    else
      return {error: "No such username exists"}
  }

  function documentToUser ({ _id: userId, ...doc }) {
    return makeUser({ userId, ...doc })
  }
}