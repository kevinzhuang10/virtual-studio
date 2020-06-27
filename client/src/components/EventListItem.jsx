import React, { Fragment } from 'react'
import { TableRow, TableCell } from '@material-ui/core'

const EventListItem = ({ key, event }) => {
  return (
    <TableRow key={key}>
      <TableCell component="th" scope="row">
        {event.title}
      </TableCell>
      <TableCell align="center">{event.startTime}</TableCell>
      <TableCell align="center">{event.participants.length}</TableCell>
    </TableRow>
  )
}

export default EventListItem
