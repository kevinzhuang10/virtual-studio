import React, { useState } from 'react'
import styled from 'styled-components'
import { TextField, Button, Container } from '@material-ui/core'
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
    <StyledContainer maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Label>Sign In</Label>
        <StyledSubContainer>
          <StyledTextField
            required
            id="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <StyledTextField
            required
            id="password"
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </StyledSubContainer>
        <StyledSubContainer>
          <SignInButton variant="contained" type="submit">
            Sign In
          </SignInButton>
          <StyledButton onClick={() => history.push('/signup')}>
            Need to create an account?
          </StyledButton>
        </StyledSubContainer>
      </form>
    </StyledContainer>
  )
}

const Label = styled.h4`
  text-align: center;
`

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  margin-top: 60px;
`

const StyledSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  justify-content: center;
  align-items: center;
`

const StyledTextField = styled(TextField)`
  margin: 10px;
  width: 250px;
`

const StyledButton = styled(Button)`
  margin: 10px;
`

const SignInButton = styled(Button)`
  margin: 10px;
  max-width: 120px;
`

export default SignInPage
