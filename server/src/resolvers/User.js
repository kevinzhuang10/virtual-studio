function events(parent, args, { dataSources }) {
  return dataSources.userAPI.findUserById({ id: parent.id }).createdEvents()
}

module.exports = {
  events,
}
