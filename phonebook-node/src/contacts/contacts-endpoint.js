const makeContact = require('./contact')
const httpError = require('../helpers/http-error')
const httpSuccess = require('../helpers/http-success')
const authHandler = require('../helpers/auth-handler')

module.exports = function makeContactsEndpointHandler ({ contactRepo }) {
  return async function handle (httpRequest) {
    let currentUser = authHandler.getLoggedInUser({httpRequest})
    if(!currentUser)
      return httpError({errorMessage: "Not logged in"})
    
      switch (httpRequest.method) {
      case 'POST':
        return postContacts({httpRequest: httpRequest, currentUser: currentUser})

      case 'GET':
        return getContacts({httpRequest: httpRequest, currentUser: currentUser})

      case 'DELETE':
        return deleteContacts({httpRequest: httpRequest, currentUser: currentUser})
        
      case 'PUT':
        return putContacts({httpRequest: httpRequest, currentUser: currentUser})

      default:
        return httpError({errorMessage: `${httpRequest.method} method not allowed`})
    }
  }

  async function getContacts ({httpRequest: httpRequest, currentUser: currentUser}) {
    const { id } = httpRequest.pathParams || {}
    const result = id
      ? await contactRepo.findById({ currentUser: currentUser, contactId: id })
      : await contactRepo.getItems({ currentUser: currentUser })
      return httpSuccess({result})
  }

  async function postContacts ({httpRequest: httpRequest, currentUser: currentUser}) {
    let contactInfo = httpRequest.body
    if (!contactInfo)
      return httpError({errorMessage: 'No POST body'})
    const contact = makeContact(contactInfo)
    const result = await contactRepo.add({currentUser: currentUser, ...contact})
    return httpSuccess({result})
  }

  async function deleteContacts ({httpRequest: httpRequest, currentUser: currentUser}) {
    const { id } = httpRequest.pathParams || {}
    const result = await contactRepo.remove({currentUser: currentUser, contactId: id})
    if(result.error)
      return httpError({errorMessage: result.error})
    else
      return httpSuccess({result})

  }

  async function putContacts ({httpRequest: httpRequest, currentUser: currentUser}) {
    const { id } = httpRequest.pathParams || {}
    let contactInfo = httpRequest.body
    if (!contactInfo)
      return httpError({errorMessage: 'No PUT body'})
    const contact = makeContact(contactInfo)
    const result = await contactRepo.update({currentUser: currentUser, contactId: id, ...contact})
    if(result.error)
      return httpError({errorMessage: result.error})
    else
      return httpSuccess({result})
  }

}