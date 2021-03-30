const bcrypt = require('bcrypt')

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10

module.exports.hashPassword = async (password) => {
  
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    // Hash password
    return await bcrypt.hash(password, salt)

  } catch (error) {
    console.log(error)
  }

  return null
}

module.exports.passwordMatchesHash = async ({ password, hash }) => {  
  return bcrypt.compare(password, hash)
}