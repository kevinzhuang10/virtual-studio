const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const { createStore } = require('./utils')

const UserAPI = require('./datasources/user')
const EventAPI = require('./datasources/event')

const store = createStore()

const server = new ApolloServer({
  typeDefs,
  dataSources: () => ({
    userAPI: new UserAPI({ store }),
    eventAPI: new EventAPI({ store }),
  }),
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
