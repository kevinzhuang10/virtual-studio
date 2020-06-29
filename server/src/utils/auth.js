const jwt = require('jsonwebtoken')
const APP_SECRET = process.env.APP_SECRET
const AUTHORIZATION_PREFIX = 'Bearer '

function getUserId(req) {
  const Authorization = req.get('Authorization')
  if (Authorization && isValidAuthorizationFormat(Authorization)) {
    const token = Authorization.replace(AUTHORIZATION_PREFIX, '')
    const { userId } = jwt.verify(token, APP_SECRET)
    if (userId) {
      return userId
    }
  }

  return null
}

function checkAuthentication(context) {
  if (context.user !== null) {
    return
  }

  throw new Error('Not authenticated')
}

function isValidAuthorizationFormat(authorization) {
  return authorization.startsWith(AUTHORIZATION_PREFIX)
}

module.exports = {
  APP_SECRET,
  getUserId,
  checkAuthentication,
}
