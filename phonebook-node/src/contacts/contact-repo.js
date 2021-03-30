makeContact = require('./contact')

module.exports = function makeContactRepo ({ database }) {
  return Object.freeze({
    add,
    findById,
    getItems,
    remove,
    update
  })

  async function getItems ({currentUser}) {
    const db = await database

    return (await db
      .collection('contacts')
      .find({ userId: db.makeId(currentUser._id) })
      .toArray())
  }

  async function add ({ currentUser, ...contact }) {    
    const db = await database
    
    const result = await db
      .collection('contacts')
      .insertOne({userId: db.makeId(currentUser._id), ...contact})
    return result.ops[0]
  }

  async function findById ({ currentUser, contactId }) {
    const db = await database
    const found = await db
      .collection('contacts')
      .findOne({ userId: db.makeId(currentUser._id), _id: db.makeId(contactId) })
    if (found)
      return found
    else
      return null
  }


  async function remove ({ currentUser, contactId }) {
    const db = await database
    if (contactId) {
      const { result } = await db.collection('contacts').deleteOne({ userId: db.makeId(currentUser._id), _id: db.makeId(contactId) })
      if(result.n > 0)
        return {deleted: result.n}
      else return {error: result}
    }
    return {error: "Missing parameter: contactId"}
  }

  async function update ({ currentUser, contactId, ...contact }) {
    const db = await database
    if (contactId) {
      const result = await db.collection('contacts').findOneAndReplace(
        { userId: db.makeId(currentUser._id), _id: db.makeId(contactId) },
        { userId: db.makeId(currentUser._id), ...contact }
      )
      if(result.lastErrorObject.updatedExisting)
        return {updated: result.lastErrorObject.updatedExisting}
      else
        return {error: "Did not update"}

      
    }
    return {error: "Missing parameter: contactId"}
  }

  function documentToContact ({ _id: contactId, ...doc }) {
    return makeContact({ contactId, ...doc })
  }
}