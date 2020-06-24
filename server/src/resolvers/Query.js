async function allEvents(parent, args, { dataSources }) {
  return dataSources.eventAPI.getAllEvents()
}

module.exports = {
  allEvents,
}
