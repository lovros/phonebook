
class RequiredParameterError extends Error {
    constructor (param) {
      super(`${param} can not be null or undefined.`)
  
      // check browser support for captureStackTrace
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, RequiredParameterError)
      }
    }
}

module.exports =  function requiredParam (param) {
  throw new RequiredParameterError(param)
}