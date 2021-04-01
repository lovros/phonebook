const adaptRequest = require('./helpers/adapt-request.js')
const handleContactsRequest = require('./contacts')
const handleAuthRequest = require('./auth')

const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 4000

const app = express()
let corsOptions = {
  origin: 'http://localhost:8080'
}
app.use(cors(corsOptions))
app.use(express.urlencoded({extended: true}))
app.use(express.json());


app.all('/login', authenticationController)
app.all('/register', authenticationController)
app.all('/contacts/:id', contactsController)
app.all('/contacts', contactsController)

function contactsController (req, res) {
  const httpRequest = adaptRequest(req)
  handleContactsRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode)
        .send(data)
    )
    .catch(e => {
      console.log(e)
      res.status(500).end()
    })
}

function authenticationController (req, res) {
  const httpRequest = adaptRequest(req)
  handleAuthRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode)
        .send(data)
    )
    .catch(e => {
      console.log(e)
      res.status(500).end()
    })
}

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})