const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    allEvents: [Event!]!
  }

  type Mutation {
    signUp(email: String!, password: String!, name: String!): AuthResponse
    signIn(email: String!, password: String!): AuthResponse
    # signOut(email: String!): AuthResponse
    createEvent(title: String!): EventUpdateResponse!
    updateEvent(title: String!): EventUpdateResponse!
  }

  type AuthResponse {
    token: String
    user: User
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
    createdBy: User!
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
