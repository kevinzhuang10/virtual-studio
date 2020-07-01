import React, { Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import EventListItem from '../components/EventListItem'

const GET_EVENTS = gql`
  query eventList($hostId: ID!) {
    getHostEvents(userId: $hostId) {
      id
      title
      participants {
        id
      }
    }
  }
`

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: 650,
  },
})

const EventListPage = () => {
  const classes = useStyles()
  const { data, loading, error } = useQuery(GET_EVENTS, {
    variables: {
      hostId: '11',
    },
  })

  if (loading) return <p>LOADING</p>
  if (error) return <p>ERROR</p>
  if (!data) return <p>Not found</p>

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Class&nbsp;Name</TableCell>
            <TableCell align="center">Start&nbsp;Time</TableCell>
            <TableCell align="center">#&nbsp;of&nbsp;Attendees</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.getHostEvents &&
            data.getHostEvents.map((event) => (
              <EventListItem key={event.id} event={event} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default EventListPage