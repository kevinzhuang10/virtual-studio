import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import EventListPage from './pages/EventListPage'
import EventDetailPage from './pages/EventDetailPage'

function App() {
  return (
    <Router>
      <Fragment>
        <nav>
          <ul>
            <li>
              <Link to="/">Events</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/event/:eventId">
            <EventDetailPage />
          </Route>
          <Route path="/">
            <EventListPage />
          </Route>
        </Switch>
      </Fragment>
    </Router>
  )
}

export default App
