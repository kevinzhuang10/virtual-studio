import gql from 'graphql-tag'
import { AUTH_TOKEN } from './constants'

export const typeDefs = gql`
  extend type Query {
    isAuthenticated: Boolean!
    currentUser: User
    me: User
  }
`

export const resolvers = {}
