const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    getHostEvents(userId: ID!): [Event!]!
    getEventById(eventId: ID!): Event
  }

  type Mutation {
    signUp(
      email: String!
      password: String!
      name: String!
      role: UserRole!
    ): AuthResponse
    signIn(email: String!, password: String!): AuthResponse
    # signOut(email: String!): AuthResponse
    createEvent(title: String!): EventUpdateResponse!
    updateEvent(title: String!): EventUpdateResponse!
    registerEvent(eventId: ID!): EventRegistrationResponse!
  }

  enum UserRole {
    HOST
    PARTICIPANT
  }

  type AuthResponse {
    token: String
    user: User
  }

  type User {
    id: ID!
    email: String!
    name: String!
    role: UserRole!
    hostEvents: [Event!]!
    participantEvents: [Event!]!
  }

  type Event {
    id: ID!
    title: String!
    host: User!
    participants: [User!]!
    startUrl: String!
    joinUrl: String!
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

  type EventRegistrationResponse {
    success: Boolean!
    message: String
    data: Event!
  }
`

module.exports = typeDefs
