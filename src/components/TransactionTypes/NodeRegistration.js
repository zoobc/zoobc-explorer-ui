import React from 'react'
import { Card } from 'antd'
import NumberFormat from 'react-number-format'

import DescItem from '../DescItem'

const NodeRegistration = ({ data }) => {
  return (
    <Card className="card-summary">
      <h4>Node Registration</h4>
      <DescItem label="Node Address" value={data.NodeAddress} />
      <DescItem label="Account Address" value={data.AccountAddress} />
      <DescItem label="Node Pulic Key" value={data.NodePublicKey} />
      <DescItem
        label="Locked Balance"
        value={
          <NumberFormat
            value={data.LockedBalanceConversion || 0}
            displayType={'text'}
            thousandSeparator={true}
            suffix={' BCZ'}
          />
        }
      />
      <DescItem
        label="POOW Message Bytes"
        value={data.ProofOfOwnership && data.ProofOfOwnership.MessageBytes}
      />
      <DescItem
        label="POOW Signature"
        value={data.ProofOfOwnership && data.ProofOfOwnership.Signature}
      />
    </Card>
  )
}

export default NodeRegistration
