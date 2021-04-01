import axios from 'axios'

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000"

export default { register, login }

function register ({ user })  {

  return axios.post(`${API_BASE_URL}/register`, { ...user }, {
      headers: {
        'content-type': 'application/json'
      },
      validateStatus: function (status) {
        return status < 500 // Reject only if the status code is greater than or equal to 500
      }
    })
}

function login  ({ user })  {
  return axios.post(`${API_BASE_URL}/login`, { ...user }, {
    headers: {
      'content-type': 'application/json'
    },
    validateStatus: function (status) {
      return status < 500
    }
  })
}
