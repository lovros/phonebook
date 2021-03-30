makeDb = require( '../db')
makeAuthRepo = require('./auth-repo')
makeAuthEndpointHandler = require('./auth-endpoint')

const database = makeDb()
const authRepo = makeAuthRepo({ database })
const authEndpointHandler = makeAuthEndpointHandler({ authRepo })

module.exports = authEndpointHandler
