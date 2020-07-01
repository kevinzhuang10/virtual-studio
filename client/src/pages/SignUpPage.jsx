import React, { useState } from 'react'
import styled from 'styled-components'
import { TextField, Button, Container } from '@material-ui/core'
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
    <StyledContainer maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Label>Sign Up</Label>
        <StyledSubContainer>
          <StyledTextField
            required
            id="name"
            label="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
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
          <StyledButton variant="contained" type="submit">
            Sign Up
          </StyledButton>
          <StyledButton onClick={() => history.push('/signin')}>
            Already have an account?
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

export default SignUpPage
