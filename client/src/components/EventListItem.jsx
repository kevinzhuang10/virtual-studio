import React, { Fragment } from 'react'
import { TableRow, TableCell } from '@material-ui/core'
import moment from 'moment'

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
    </TableRow>
  )
}

export default EventListItem
