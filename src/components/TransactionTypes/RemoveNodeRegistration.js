import React from 'react'
import { Card } from 'antd'

import DescItem from '../DescItem'

const RemoveNodeRegistration = ({ data }) => {
  return (
    <Card className="transaction-card">
      <h4 className="transaction-card-title">Remove Node Registration</h4>
      <DescItem label="Node Pulic Key" value={data.NodePublicKey} />
    </Card>
  )
}

export default RemoveNodeRegistration
