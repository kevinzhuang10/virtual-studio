import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../constants'
import { useHistory } from 'react-router-dom'
import { drawerWidth } from './NavDrawer'
import StyledLink from './Link'

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  authButtion: {
    marginRight: theme.spacing(4),
  },
  title: {
    flexGrow: 1,
  },
}))

const GET_CURRENT_USER = gql`
  query currentUser {
    me @client {
      id
    }
  }
`

// maybe pass in auth data from app
const NavBar = () => {
  const client = useApolloClient()
  const classes = useStyles()
  let history = useHistory()

  const { data } = useQuery(GET_CURRENT_USER)

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Virtual Studio
        </Typography>
        {data && data.me ? (
          <StyledButton
            onClick={() => {
              localStorage.clear()
              client.resetStore()
              history.push(`/`)
            }}
          >
            logout
          </StyledButton>
        ) : (
          <Fragment>
            <StyledLink to="/signin">
              <StyledButton>Sign In</StyledButton>
            </StyledLink>
            <StyledLink to="/signup">
              <StyledButton>Sign Up</StyledButton>
            </StyledLink>
          </Fragment>
        )}
      </Toolbar>
    </StyledAppBar>
  )
}

const StyledAppBar = styled(AppBar)`
  && {
    width: 1440px;
    margin-left: 240px;
  }
`

const StyledButton = styled(Button)`
  color: white;
  margin-right: 32px;
`

export default NavBar
