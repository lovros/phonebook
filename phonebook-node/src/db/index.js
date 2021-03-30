mongodb = require('mongodb')

const DB_PORT = process.env.DB_PORT || 27017

module.exports = async function makeDb () {
  // todo: check if db is already running
  const MongoClient = mongodb.MongoClient
  const url = `mongodb://localhost:${DB_PORT}` 
  const dbName = 'phonebook'
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
  
  try {
    await client.connect()
    const db = await client.db(dbName)
    db.makeId = makeIdFromString
    return db
    
  }  catch (e) {
    console.log(e)
  }

  return null
}
function makeIdFromString (id) {
  return new mongodb.ObjectID(id)
}