import React, { useState } from 'react'
import { TextField } from '@material-ui/core'

const SignInPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  return (
    <form>
      <TextField
        id="email"
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="password"
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        id="name"
        label="Name"
        onChange={(e) => setName(e.target.value)}
      />
    </form>
  )
}

export default SignInPage
