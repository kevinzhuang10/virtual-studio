const { DataSource } = require('apollo-datasource')
const ZoomAPI = require('./zoom')

class EventAPI extends DataSource {
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

  getAllEvents({ userId }) {
    return this.prisma.event.findMany({
      where: {
        host: {
          id: userId,
        },
      },
    })
  }

  async createEvent({ title, user, startUrl, joinUrl }) {
    const event = await this.prisma.event.create({
      data: {
        title,
        startUrl,
        joinUrl,
        startTime: new Date(),
        duration: 60,
        host: { connect: { id: user.id } },
      },
    })

    return event
  }

  async registerEvent({ user, eventId }) {
    const event = await this.prisma.event.update({
      where: { id: eventId },
      data: {
        participants: {
          connect: [{ id: user.id }],
        },
      },
    })

    return event
  }

  findEventById(eventId) {
    return this.prisma.event.findOne({
      where: {
        id: eventId,
      },
    })
  }
}

module.exports = EventAPI
