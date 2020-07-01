import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'
import { ApolloProvider } from '@apollo/react-hooks'
import { AUTH_TOKEN, AUTH_PREFIX } from './constants'
import { typeDefs, resolvers } from './resolvers'
// import injectStyles from './styles'

const cache = new InMemoryCache()

const authToken = localStorage.getItem(AUTH_TOKEN)
const link = new HttpLink({
  uri: 'http://localhost:4000/',
  headers: {
    authorization: authToken ? `${AUTH_PREFIX}${authToken}` : '',
  },
})

const client = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers,
})

// initialized local cache
cache.writeData({
  data: {
    me: null,
  },
})

// injectStyles()
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
