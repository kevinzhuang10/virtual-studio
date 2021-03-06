require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const { PrismaClient } = require('@prisma/client')

const UserAPI = require('./datasources/user')
const EventAPI = require('./datasources/event')
const ZoomAPI = require('./datasources/zoom')
const { getUserId } = require('./utils/auth')

const prisma = new PrismaClient()

const context = async ({ req }) => {
  // attempt to extract user info from req
  const userId = getUserId(req)
  if (!userId) {
    return
  }

  const user = await prisma.user.findOne({
    where: {
      id: userId,
    },
  })

  return {
    user,
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    reportSchema: true,
    graphVariant: 'current',
  },
  dataSources: () => ({
    userAPI: new UserAPI({ prisma }),
    eventAPI: new EventAPI({ prisma }),
    zoomAPI: new ZoomAPI(),
  }),
  context,
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
