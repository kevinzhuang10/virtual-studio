const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, checkAuthentication } = require('../utils/auth')

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
  const user = await dataSources.userAPI.findUserByEmail({
    email: args.email,
  })

  if (!user) {
    throw new Error('No such user found')
  }

  const { password } = user

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
  checkAuthentication(context)
  // create zoom event
  const createdZoomMeeting = await context.dataSources.zoomAPI.createMeeting({
    topic: title,
    startTime: '2020-6-25T18:00:00Z',
  })

  if (!createdZoomMeeting) {
    throw new Error('Failed to create zoom meeting')
  }

  const { start_url, join_url } = createdZoomMeeting

  // create new event with zoom meeting info
  const event = await context.dataSources.eventAPI.createEvent({
    title,
    user: context.user,
    startUrl: start_url,
    joinUrl: join_url,
  })

  return {
    success: !!event,
    message: `event created with event id: ${event.id}`,
    data: event,
  }
}

async function registerEvent(parent, { eventId }, context, info) {
  checkAuthentication(context)
  eventId = parseInt(eventId, 10)

  const event = await context.dataSources.eventAPI.findEventById(eventId)
  if (!event) {
    throw new Error('Invalid event ID')
  }

  const registeredEvent = await context.dataSources.eventAPI.registerEvent({
    eventId,
    user: context.user,
  })

  return {
    success: !!registeredEvent,
    message: `user ${context.user.id} registered to event id: ${registeredEvent.id}`,
    data: registeredEvent,
  }
}

module.exports = {
  signUp,
  signIn,
  createEvent,
  registerEvent,
}
