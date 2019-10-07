import React from 'react'
import { Card } from 'antd'

import DescItem from '../DescItem'

const RemoveAccount = ({ data }) => {
  return (
    <Card className="card-summary">
      <h4>Remove Account</h4>
      <DescItem label="Setter Address" value={data.NodeAddress} />
      <DescItem label="Recipient Address" value={data.AccountAddress} />
      <DescItem label="Property" value={data.Property} />
      <DescItem label="Value" value={data.Value} />
    </Card>
  )
}

export default RemoveAccount
