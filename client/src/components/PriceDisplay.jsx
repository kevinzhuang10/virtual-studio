import React from 'react'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'

const PriceDisplay = ({ model, price, range }) => {
  return (
    <div>
      <AttachMoneyIcon />
      <div>Free</div>
    </div>
  )
}

export default PriceDisplay
