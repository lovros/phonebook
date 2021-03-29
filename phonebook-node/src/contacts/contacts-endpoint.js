makeContact = require('./contact')

module.exports = function makeContactsEndpointHandler ({ contactRepo }) {
  return async function handle (httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return postContact(httpRequest)

      case 'GET':
        return getContacts(httpRequest)

      case 'DELETE':
        return deleteContacts(httpRequest)

      case 'PUT':
        return putContacts(httpRequest)

      default:
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 405,
          data: JSON.stringify({
            success: false,
            error: `${httpRequest.method} method not allowed.`
          })
        }
    }
  }

  async function getContacts (httpRequest) {
    const { id } = httpRequest.pathParams || {}

    const result = id
      ? await contactRepo.findById({ contactId: id })
      : await contactRepo.getItems()
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      data: JSON.stringify(result)
    }
  }

  async function postContact (httpRequest) {
    let contactInfo = httpRequest.body
    if (!contactInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      })
    }

    const contact = makeContact(contactInfo)
    const result = await contactRepo.add({...contact})
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 201,
      data: JSON.stringify(result)
    }
  }

  async function deleteContacts (httpRequest) {
    const { id } = httpRequest.pathParams || {}

    const result = await contactRepo.remove({contactId: id})
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      data: JSON.stringify(result)
    }
  }

  async function putContacts (httpRequest) {
    const { id } = httpRequest.pathParams || {}
    let contactInfo = httpRequest.body
    if (!contactInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No PUT body.'
      })
    }

    const contact = makeContact(contactInfo)
    const result = await contactRepo.update({contactId: id, ...contact})
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      data: JSON.stringify(result)
    }
  }

}