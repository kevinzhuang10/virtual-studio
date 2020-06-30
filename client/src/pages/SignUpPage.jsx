import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { AUTH_TOKEN } from '../constants'
import gql from 'graphql-tag'

export const SIGN_UP_MUTATION = gql`
  mutation signUp($email: String!, $password: String!, $name: String!) {
    signUp(email: $email, password: $password, name: $name) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

// const IS_AUTHENTICATED_QUERY = gql`
//   query isAuthenticated {
//     me @client {
//       id
//       name
//     }
//   }
// `

const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  let history = useHistory()

  // // redirect to home page if authenticated
  // // debugger
  // const { data: authData } = useQuery(IS_AUTHENTICATED_QUERY)
  // if (authData && authData.me) {
  //   history.push('/')
  // }

  const [signUp, { data, loading, error }] = useMutation(SIGN_UP_MUTATION, {
    onCompleted({ signUp }) {
      localStorage.setItem(AUTH_TOKEN, signUp.token)
      history.push('/')
    },
    update(cache, mutationResult) {
      // debugger
      // if (mutationResult && mutationResult.data && mutationResult.data.signUp)
      //   cache.writeData({ data: { me: { id: 123 } } })
      // cache.writeData({ data: { me: { id: 123 } } })
      cache.writeData({ data: { me: mutationResult.data.signUp.user } })
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    signUp({
      variables: {
        email,
        password,
        name,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          required
          id="email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div>
        <TextField
          required
          id="password"
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div>
        <TextField
          required
          id="name"
          label="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <Button variant="contained" type="submit">
        Sign Up
      </Button>
    </form>
  )
}

export default SignUpPage
