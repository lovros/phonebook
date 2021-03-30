module.exports = function adaptRequest (req) {
  return Object.freeze({
    path: req.path,
    method: req.method,
    headers: req.headers,
    pathParams: req.params,
    queryParams: req.query,
    body: req.body
  })
}