function me(parent, args, { user }) {
  if (user) {
    return user
  }
  return null
}

function getHostEvents(parent, { userId }, { dataSources }) {
  // need to parse string to int because gql server seem to auto convert int to string from request
  userId = parseInt(userId, 10)
  return dataSources.eventAPI.getAllEvents({ userId })
}

function getEventById(parent, { eventId }, { dataSources }) {
  // need to parse string to int because gql server seem to auto convert int to string from request
  eventId = parseInt(eventId, 10)
  return dataSources.eventAPI.findEventById(eventId)
}

module.exports = {
  me,
  getHostEvents,
  getEventById,
}
