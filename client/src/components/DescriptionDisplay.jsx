import React from 'react'
import DescriptionIcon from '@material-ui/icons/Description'

const DescriptionDisplay = ({ description }) => {
  return (
    <div>
      <DescriptionIcon />
      <div>{description}</div>
    </div>
  )
}

export default DescriptionDisplay
