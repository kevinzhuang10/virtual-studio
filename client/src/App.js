import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import styled from 'styled-components'
import EventListPage from './pages/EventListPage'
import EventDetailPage from './pages/EventDetailPage'
import UpdateEventPage from './pages/UpdateEventPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import NavBar from './components/NavBar'
import NavDrawer from './components/NavDrawer'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'

const GET_CURRENT_USER = gql`
  query currentUser {
    me {
      id
    }
  }
`

function App() {
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'network-only',
  })

  if (loading) {
    return <div>loading</div>
  }

  return (
    <Router>
      <StyledRoot>
        <CssBaseline />
        <NavBar />
        <NavDrawer />
        <Content>
          <Toolbar />
          <Switch>
            <Route path="/events/new">
              <UpdateEventPage />
            </Route>
            <Route path="/signin">
              <SignInPage />
            </Route>
            <Route path="/signup">
              <SignUpPage />
            </Route>
            <Route path="/events/:eventId">
              <EventDetailPage />
            </Route>
            <Route path="/events">
              <EventListPage />
            </Route>
            <Route path="/">
              <div>Home Page</div>
            </Route>
          </Switch>
        </Content>
      </StyledRoot>
    </Router>
  )
}

const Content = styled.main`
  flex-grow: 1;
  padding: 24px;
`

const StyledRoot = styled.div`
  display: flex;
`

export default App
