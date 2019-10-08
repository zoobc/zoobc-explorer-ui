import React from 'react'
import { Card } from 'antd'
import NumberFormat from 'react-number-format'

import DescItem from '../DescItem'

const SendMoney = ({ data }) => {
  return (
    <Card className="card-summary">
      <h4>Send Money</h4>
      <DescItem
        label="Amount"
        value={
          <NumberFormat
            value={data.AmountConversion || 0}
            displayType={'text'}
            thousandSeparator={true}
            suffix={' BCZ'}
          />
        }
      />
    </Card>
  )
}

export default SendMoney
