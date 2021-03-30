makeUser = require('./user')
passwordHandler = require('../helpers/password-handler')
httpError = require('../helpers/http-error')
httpSuccess = require('../helpers/http-success')

module.exports = function makeAuthEndpointHandler ({ authRepo }) {
  return async function handle (httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        if(httpRequest.path === "/login")
          return login(httpRequest)
        else if(httpRequest.path === "/register")
          return register(httpRequest)
        else
          return httpError({errorMessage: `${httpRequest.method} on unexpected path ${httpRequest.path}`})

      default:
        return httpError({errorMessage: `${httpRequest.method} method not allowed`})
    }
  }

  async function register (httpRequest) {
    let userInfo = httpRequest.body
    if (!userInfo) 
      return httpError({errorMessage: 'No POST body'})
    
    if(userInfo.password) {
      // validate password here
      let hash = await passwordHandler.hashPassword(userInfo.password)
      let password = userInfo.password
      delete userInfo.password
      userInfo.hashedPassword = hash
      const user = makeUser(userInfo)
      try {
        let createdUser = await authRepo.register({...user})
        let token = await authRepo.login({userPassword: password, ...createdUser}) 
        return httpSuccess({token: token})

      } catch (e) {
          // check for E11000 mongodb duplicate key error 
          const errorCode = e.message.split(' ')[0]
          if (errorCode === 'E11000')
            return httpError({errorMessage: 'Username taken'})
          else 
            throw e
      }
    } else {
      return httpError({errorMessage: 'Missing field: password'})
    }
  }

  async function login (httpRequest) {
    let userInfo = httpRequest.body
    if (!userInfo)
      return httpError({errorMessage: 'No POST body'})

    if(userInfo.password) {
      let hash = await passwordHandler.hashPassword(userInfo.password)
      let password =  userInfo.password
      delete userInfo.password
      userInfo.hashedPassword = hash
      const user = makeUser(userInfo)

      let token = await authRepo.login({userPassword: password, ...user}) 
      return httpSuccess({token: token})
    }
    else {
      return httpError({errorMessage: 'Missing field: password'})
    }
  }
}