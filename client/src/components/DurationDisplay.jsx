import React from 'react'
import ScheduleIcon from '@material-ui/icons/Schedule'

const DurationDisplay = ({ duration }) => {
  return (
    <div>
      <ScheduleIcon />
      <div>{`${duration} minutes`}</div>
    </div>
  )
}

export default DurationDisplay
