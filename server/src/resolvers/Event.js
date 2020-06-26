function host(parent, args, { dataSources }) {
  return dataSources.eventAPI.findEventById(parent.id).host()
}

function participants(parent, args, { dataSources }) {
  return dataSources.eventAPI.findEventById(parent.id).participants()
}

module.exports = {
  host,
  participants,
}
