const jwt = require('jsonwebtoken')

const TOKEN_SECRET = process.env.TOKEN_SECRET || "unsafe_secret"

module.exports.generateAccessToken = ({ data, expireTime }) => {
  return jwt.sign(data, TOKEN_SECRET, { expiresIn: expireTime });
}

module.exports.getLoggedInUser = ({ token, httpRequest }) => {
  let foundToken
  if (token) {
    foundToken = token
  } else if(httpRequest) {
    foundToken = httpRequest.headers.authorization
    if(!foundToken)
      return null
    if (foundToken.startsWith('Bearer '))
      foundToken = foundToken.slice(7, foundToken.length).trimLeft();
  }  else {
    return null
  }

  try {
      const user = jwt.verify(foundToken, TOKEN_SECRET)
      return user
  }
  catch (err) {
    console.log(err)
    return null
  }
}