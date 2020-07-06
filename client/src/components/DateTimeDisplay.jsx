import React from 'react'
import EventIcon from '@material-ui/icons/Event';
import moment from 'moment'

const DateTimeDisplay = ({ unixMilli }) => {
  return (
    <div>
      <EventIcon />
      <div>{moment(unixMilli).format('dddd, MMMM Do YYYY, h:mm a')}</div>
    </div>
  )
}

export default DateTimeDisplay
