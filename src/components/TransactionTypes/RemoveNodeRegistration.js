import React from 'react'
import { Card } from 'antd'

import DescItem from '../DescItem'

const RemoveNodeRegistration = ({ data }) => {
  return (
    <Card className="card-summary">
      <h4>Remove Node Registration</h4>
      <DescItem label="Node Pulic Key" value={data.NodePublicKey} />
    </Card>
  )
}

export default RemoveNodeRegistration
