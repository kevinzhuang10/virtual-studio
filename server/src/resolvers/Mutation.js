const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils/auth')

async function signUp(parent, args, { dataSources }, info) {
  const hashedPassword = await bcrypt.hash(args.password, 10)
  const { password, ...user } = await dataSources.userAPI.createUser({
    ...args,
    password: hashedPassword,
  })
  const token = jwt.sign({ userId: user.id }, APP_SECRET)
  return {
    token,
    user,
  }
}

async function signIn(parent, args, { dataSources }) {
  const { password, ...user } = await dataSources.userAPI.findUser({
    email: args.email,
  })

  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function createEvent(parent, { title }, context, info) {
  const userId = getUserId(context)
  console.log('userId yo', userId)
  const event = await context.dataSources.eventAPI.createEvent(title, userId)
  return {
    success: !!event,
    message: 'it worked?',
    data: event,
  }
}

module.exports = {
  signUp,
  signIn,
  createEvent,
}
