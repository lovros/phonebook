import axios from 'axios'

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000"

export default { getContacts, getContactById, deleteContactById, updateContact, addContact }

function getContacts ({ token })  {
  return axios.get(`${API_BASE_URL}/contacts`, {
      headers: {
        'content-type': 'application/json',
        'Authorization': token
      },
      validateStatus: function (status) {
        return status < 500 // Reject only if the status code is greater than or equal to 500
      }
    })
}

function getContactById ({ token, id })  {
  return axios.get(`${API_BASE_URL}/contacts/${id}`, {
      headers: {
        'content-type': 'application/json',
        'Authorization': token
      },
      validateStatus: function (status) {
        return status < 500
      }
    })
}

function updateContact ({ token, id, contact })  {
  return axios.put(`${API_BASE_URL}/contacts/${id}`, { ...contact }, {
      headers: {
        'content-type': 'application/json',
        'Authorization': token
      },
      validateStatus: function (status) {
        return status < 500
      }
    })
}

function addContact ({ token, contact })  {
  return axios.post(`${API_BASE_URL}/contacts`, { ...contact }, {
      headers: {
        'content-type': 'application/json',
        'Authorization': token
      },
      validateStatus: function (status) {
        return status < 500
      }
    })
}

function deleteContactById ({ token, id })  {
  return axios.delete(`${API_BASE_URL}/contacts/${id}`, {
      headers: {
        'content-type': 'application/json',
        'Authorization': token
      },
      validateStatus: function (status) {
        return status < 500
      }
    })
}
