makeContact = require('./contact')

module.exports = function makeContactRepo ({ database }) {
  return Object.freeze({
    add,
    findById,
    getItems,
    remove,
    update
  })

  async function getItems () {
    const db = await database
    const query = {}

    return (await db
      .collection('contacts')
      .find(query)
      .toArray())
  }

  async function add ({ contactId, ...contact }) {    
    const db = await database
    if (contactId) {
      contact._id = db.makeId(contactId)
    }
    const { result, ops } = await db
      .collection('contacts')
      .insertOne(contact)
    return {
      success: result.ok === 1,
      created: documentToContact(ops[0])
    }
  }

  async function findById ({ contactId }) {
    const db = await database
    const found = await db
      .collection('contacts')
      .findOne({ _id: db.makeId(contactId) })
    if (found) {
      return found
    }
    return null
  }


  async function remove ({ contactId }) {
    const db = await database
    if (contactId) {
      const { result, error } = await db.collection('contacts').deleteOne({_id: db.makeId(contactId)});
      return {deleted: result.n}
    }
    return {success: false, missingParam: "contactId"}
  }

  async function update ({ contactId, ...contact }) {
    const db = await database
    if (contactId) {
      const result = await db.collection('contacts').findOneAndReplace(
        {_id: db.makeId(contactId)},
        { ...contact }
     )
      return {success: result.lastErrorObject.updatedExisting}
    }
    return {success: false, missingParam: "contactId"}
  }

  function documentToContact ({ _id: contactId, ...doc }) {
    return makeContact({ contactId, ...doc })
  }
}