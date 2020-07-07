import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Button, TableRow, TableCell } from '@material-ui/core'
import moment from 'moment'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { Link } from 'react-router-dom'

const EventListItem = ({ event }) => {
  const startTimeInUnixMilli = parseInt(event.startTime, 10)

  return (
    <TableRow key={event.id}>
      <TableCell component="th" scope="row">
        {event.title}
      </TableCell>
      <TableCell align="center">
        {moment(startTimeInUnixMilli).format('ddd, MMM D, h:mm a')}
      </TableCell>
      <TableCell align="center">{event.participants.length}</TableCell>
      <TableCell align="center">
        <StyledLink to={`/events/${event.id}`}>
          <NavigateNextIcon />
        </StyledLink>
      </TableCell>
    </TableRow>
  )
}

// ========== Styled Components ==========
const StyledLink = styled(Link)`
  text-decoration: none;
`

export default EventListItem
