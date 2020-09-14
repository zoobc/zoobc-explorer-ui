import React from 'react'
import { Card } from 'antd'

import DescItem from '../DescItem'

const SetupAccount = ({ data }) => {
  return (
    <Card className="transaction-card">
      <h4 className="transaction-card-title page-title">Setup Account</h4>
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
      <DescItem label="Much Time" style={{ display: 'none' }} value={data.MuchTime} />
    </Card>
  )
}

export default SetupAccount
