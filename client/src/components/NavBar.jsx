import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../constants'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

const NavBar = () => {
  const classes = useStyles()
  let history = useHistory()

  const { data, client } = useQuery(GET_CURRENT_USER)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Virtual Studio
          </Typography>
          {data && data.me ? (
            <Button
              className={classes.authButtion}
              onClick={() => {
                localStorage.clear()
                client.resetStore()
                history.push(`/`)
              }}
            >
              logout
            </Button>
          ) : (
            <Fragment>
              <Link to="/signin">
                <Button className={classes.authButtion} color="inherit">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button className={classes.authButtion} color="inherit">
                  Sign up
                </Button>
              </Link>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
