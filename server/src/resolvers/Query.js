function events(parent, { userId }, { dataSources }) {
  // need to parse string to int because gql server seem to auto convert int to string from request
  userId = parseInt(userId, 10)
  return dataSources.eventAPI.getAllEvents({ userId })
}

module.exports = {
  events,
}
