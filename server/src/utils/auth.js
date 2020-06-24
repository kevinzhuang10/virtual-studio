const jwt = require('jsonwebtoken')
const APP_SECRET = 'GraphQL-is-aw3some'

function getUserId(req) {
  const Authorization = req.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)
    if (userId) {
      return userId
    }
  }

  throw new Error('Not authenticated')
}

function checkAuthentication(context) {
  if (context.user !== null) {
    return
  }

  throw new Error('Not authenticated')
}

module.exports = {
  APP_SECRET,
  getUserId,
  checkAuthentication
}
