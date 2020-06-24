const { DataSource } = require('apollo-datasource')

class UserAPI extends DataSource {
  constructor({ prisma }) {
    super()
    this.prisma = prisma
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context
  }

  getAllEvents() {
    return this.prisma.event.findMany()
  }

  async createEvent(title, userId) {
    const event = await this.prisma.event.create({
      data: {
        title,
        createdBy: { connect: { id: userId } },
      },
    })
    return event
  }

  getEventById(eventId) {
    return this.prisma.event.findOne({
      where: {
        id: eventId,
      },
    })
  }
}

module.exports = UserAPI
