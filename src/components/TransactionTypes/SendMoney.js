import React from 'react'
import { Card } from 'antd'
import NumberFormat from 'react-number-format'

import DescItem from '../DescItem'

const SendMoney = ({ data }) => {
  return (
    <Card className="transaction-card">
      <h4 className="transaction-card-title">Send Money</h4>
      <DescItem
        label="Amount"
        value={
          <NumberFormat
            value={data.AmountConversion || 0}
            displayType={'text'}
            thousandSeparator={true}
            suffix={' ZBC'}
          />
        }
      />
    </Card>
  )
}

export default SendMoney
