import React from 'react'
import PeopleIcon from '@material-ui/icons/People'

const ParticipantList = ({ participants }) => {
  return (
    <div>
      <PeopleIcon />
      {participants && participants.length > 0
        ? participants.map((participant) => (
            <div key={participant.id}>{participant.name}</div>
          ))
        : 'No attendendees so far'}
    </div>
  )
}

export default ParticipantList
