import React from 'react'
import { Card } from 'antd'

import DescItem from '../DescItem'

const RemoveAccount = ({ data }) => {
  return (
    <Card className="transaction-card">
      <h4 className="transaction-card-title page-title">Remove Account</h4>
      <DescItem
        label="Setter Address"
        style={{ display: 'none' }}
        value={data.NodeAddress}
        textClassName="monospace-text"
      />
      <DescItem
        label="Recipient Address"
        style={{ display: 'none' }}
        value={data.AccountAddress}
        textClassName="monospace-text"
      />
      <DescItem label="Property" style={{ display: 'none' }} value={data.Property} />
      <DescItem label="Value" style={{ display: 'none' }} value={data.Value} />
    </Card>
  )
}

export default RemoveAccount
