import React from 'react'
import { Card } from 'antd'

import DescItem from '../DescItem'

const SetupAccount = ({ data }) => {
  return (
    <Card className="transaction-card">
      <h4 className="transaction-card-title">Setup Account</h4>
      <DescItem label="Setter Address" value={data.NodeAddress} />
      <DescItem label="Recipient Address" value={data.AccountAddress} />
      <DescItem label="Property" value={data.Property} />
      <DescItem label="Value" value={data.Value} />
      <DescItem label="Much Time" value={data.MuchTime} />
    </Card>
  )
}

export default SetupAccount
