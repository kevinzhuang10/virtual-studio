import React, { Fragment } from 'react'
import { Button, Container } from '@material-ui/core'
import DurationDisplay from './DurationDisplay'
import DateTimeDisplay from './DateTimeDisplay'
import DescriptionDisplay from './DescriptionDisplay'
import PriceDisplay from './PriceDisplay'
import ParticipantList from './ParticipantList'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const domain = 'http://localhost:3000'

const EventDetail = ({ event, handleStart, handleShare, handleEdit }) => {
  const startTimeInUnixMilli = parseInt(event.startTime, 10)

  return (
    <Container maxWidth="sm">
      <div>
        <h1>{event.title}</h1>
        <Button onClick={() => handleStart(event.startUrl)}>Start</Button>
        <CopyToClipboard
          text={`${domain}/events/${event.id}`}
          onCopy={() => handleShare(event.id)}
        >
          <Button>Share</Button>
        </CopyToClipboard>
        <Button onClick={() => handleEdit(event.id)}>Edit</Button>
      </div>
      <div>
        <div>
          <DateTimeDisplay unixMilli={startTimeInUnixMilli} />
          <DurationDisplay duration={event.duration} />
          <PriceDisplay />
          <DescriptionDisplay description={event.description} />
        </div>
        <ParticipantList participants={event.participants} />
      </div>
    </Container>
  )
}

export default EventDetail
