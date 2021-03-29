const adaptRequest = require('./helpers/adapt-request.js')
const handleContactsRequest = require('./contacts')
express = require('express')
const PORT = process.env.PORT || 4000

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json());


//app.post('/login', authenticationController)
//app.post('/register', authenticationController)

app.all('/contacts', contactsController)
//app.post('/contacts', contactsController)
app.get('/contacts/:id', contactsController)
app.put('/contacts/:id', contactsController)
app.delete('/contacts/:id', contactsController)

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

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})