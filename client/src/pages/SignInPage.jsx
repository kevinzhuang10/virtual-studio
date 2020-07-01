import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { AUTH_TOKEN } from '../constants'
import gql from 'graphql-tag'
import { CircularProgress } from '@material-ui/core'

export const SIGN_IN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

const SignInPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let history = useHistory()

  const [signIn, { data, loading, error }] = useMutation(SIGN_IN_MUTATION, {
    onCompleted({ signIn }) {
      localStorage.setItem(AUTH_TOKEN, signIn.token)
      history.push('/')
    },
    update(cache, mutationResult) {
      cache.writeData({ data: { me: mutationResult.data.signIn.user } })
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
    signIn({
      variables: {
        email,
        password,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>Sign In</h4>
      <div>
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
        <Button onClick={() => history.push('/signup')}>
          Need to create an account?
        </Button>
      </div>
    </form>
  )
}

export default SignInPage
