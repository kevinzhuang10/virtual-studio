import React, { Fragment } from 'react'

const EventDetail = ({ event }) => {
  return (
    <Fragment>
      <p>{event.title}</p>
      <p>{event.startTime}</p>
      <p>{event.duration}</p>
      <p>{event.description}</p>
    </Fragment>
  )
}

export default EventDetail
