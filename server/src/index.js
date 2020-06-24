const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const { PrismaClient } = require('@prisma/client')

const UserAPI = require('./datasources/user')
const EventAPI = require('./datasources/event')

const prisma = new PrismaClient()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    userAPI: new UserAPI({ prisma }),
    eventAPI: new EventAPI({ prisma }),
  }),
  context: context => context
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
