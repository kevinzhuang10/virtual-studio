import React, { Fragment } from 'react'
import { Button, Container } from '@material-ui/core'
import DurationDisplay from './DurationDisplay'
import DateTimeDisplay from './DateTimeDisplay'
import DescriptionDisplay from './DescriptionDisplay'
import PriceDisplay from './PriceDisplay'

const EventDetail = ({ event }) => {
  return (
    <Container maxWidth="sm">
      <div>
        <h1>{event.title}</h1>
        <Button>Start</Button>
        <Button>Share</Button>
        <Button>Edit</Button>
      </div>
      <div>
        <div>
          <DateTimeDisplay dateTime={event.startTime} />
          <DurationDisplay duration={event.duration} />
          <PriceDisplay />
          <DescriptionDisplay description={event.description} />
        </div>
        <div>0 attendendees</div>
      </div>
    </Container>
  )
}

export default EventDetail
