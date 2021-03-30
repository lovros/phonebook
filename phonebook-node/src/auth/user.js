requiredParam = require('../helpers/required-param')

module.exports = function makeUser (userInfo = requiredParam('userInfo')) {
  const validUser = validate(userInfo)
  const normalUser = normalize(validUser)
  return Object.freeze(normalUser)

  function validate ({
    username = requiredParam('username'),
    hashedPassword = requiredParam('hashedPassword'),
  }) {
    validateLength('username', 4, username)
    return { username, hashedPassword }
  }

  function validateLength (label, minimumLength, word) {
    if (word.length < minimumLength) {
      throw new Error(
        `${label} must be at least ${minimumLength} characters long.`
      )
    }
  }

  function normalize ({ username, hashedPassword }) {
    return {
      username: username.toLowerCase(),
      hashedPassword: hashedPassword
    }
  }

}