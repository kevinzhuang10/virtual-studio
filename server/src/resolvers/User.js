function hostEvents(parent, args, { dataSources }) {
  return dataSources.userAPI.findUserById({ id: parent.id }).hostEvents()
}

function participantEvents(parent, args, { dataSources }) {
  return dataSources.userAPI.findUserById({ id: parent.id }).participantEvents()
}

module.exports = {
  hostEvents,
  participantEvents
}
