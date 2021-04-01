requiredParam = require('../helpers/required-param')

module.exports = function makeContact (contactInfo = requiredParam('contactInfo')) {
  const validContact = validate(contactInfo)
  const normalContact = normalize(validContact)
  return Object.freeze(normalContact)

  function validate ({
    firstName = requiredParam('firstName'),
    lastName = requiredParam('lastName'),
    emailAddress = requiredParam('emailAddress'),
    phoneNumber = requiredParam('phoneNumber'),
    note = requiredParam('note'),
    base64Photo
  }) {
    validateName('first', firstName)
    validateName('last', lastName)
    return { firstName, lastName, emailAddress, phoneNumber, note, base64Photo }
  }

  function validateName (label, name) {
    if (name.length < 2) {
      throw new Error(
        `A contact's ${label} name must be at least 2 characters long.`
      )
    }
  }

  function normalize ({ firstName, lastName, emailAddress, phoneNumber, note, base64Photo }) {
    return {
      firstName: firstLetterToUpper(firstName),
      lastName: firstLetterToUpper(lastName),
      emailAddress: emailAddress.toLowerCase(),
      phoneNumber: phoneNumber,
      note: note,
      base64Photo: base64Photo
    }
  }

  function firstLetterToUpper(word) {
    if (word.length === 1)
      return word.toUpperCase()
    else
      return word.charAt(0).toUpperCase() + word.slice(1)
  }
}