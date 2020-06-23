const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    events(userId: ID!): [Event!]!
    event(id: ID!): Event
    me: User
  }

  type Mutation {
    createEvent(title: String!, description: String!, startTime: String!, endTime: String!, priceType: PriceType!, price: Float): EventUpdateResponse!
    updateEvent(title: String!, description: String!, startTime: String!, endTime: String!, priceType: PriceType!, price: Float): EventUpdateResponse!
  }

  type User {
    id: ID!
    email: String!
    name: String!
    events: [Event!]!
  }

  type Event {
    id: ID!
    title: String!
    description: String!
    startTime: String!
    endTime: String!
    priceType: PriceType!
    price: Float
  }

  enum PriceType {
    FIXED
    FLEXIBLE
    FREE
  }

  type EventUpdateResponse {
    success: Boolean!
    message: String
    data: Event!
  }
`

module.exports = typeDefs
