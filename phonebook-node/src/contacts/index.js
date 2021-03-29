makeDb = require( '../db')
makeContactRepo = require('./contact-repo')
makeContactsEndpointHandler = require('./contacts-endpoint')

const database = makeDb()
const contactRepo = makeContactRepo({ database })
const contactsEndpointHandler = makeContactsEndpointHandler({ contactRepo })

module.exports = contactsEndpointHandler
