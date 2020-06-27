import React, { Fragment } from 'react'

const EventDetail = ({ event }) => {
  return (
    <Fragment>
      <p>{event.title}</p>
      <p>{event.startTime}</p>
    </Fragment>
  )
}

export default EventDetail
