import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { AUTH_TOKEN } from '../constants'
import gql from 'graphql-tag'
import { CircularProgress } from '@material-ui/core'

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

const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  let history = useHistory()

  const [signUp, { data, loading, error }] = useMutation(SIGN_UP_MUTATION, {
    onCompleted({ signUp }) {
      localStorage.setItem(AUTH_TOKEN, signUp.token)
      history.push('/')
    },
    update(cache, mutationResult) {
      cache.writeData({ data: { me: mutationResult.data.signUp.user } })
    },
  })

  if (loading) {
    return <CircularProgress />
  }
  if (error) {
    return <p>error occured</p>
  }

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
      <h4>Sign Up</h4>
      <div>
        <div>
          <TextField
            required
            id="name"
            label="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
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
      </div>
      <div>
        <Button variant="contained" type="submit">
          Sign Up
        </Button>
      </div>
      <div>
        <Button onClick={() => history.push('/signin')}>
          Already have an account?
        </Button>
      </div>
    </form>
  )
}

export default SignUpPage
