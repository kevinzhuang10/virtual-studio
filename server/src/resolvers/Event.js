function createdBy(parent, args, { dataSources }) {
  return dataSources.eventAPI.getEventById(parent.id).createdBy()
}

module.exports = {
  createdBy,
}
