import React from 'react'
import { Card } from 'antd'
import NumberFormat from 'react-number-format'

import DescItem from '../DescItem'

const UpdateNodeRegistration = ({ data }) => {
  return (
    <Card className="transaction-card">
      <h4 className="transaction-card-title">Update Node Registration</h4>
      <DescItem label="Node Address" value={data.NodeAddress} />
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

export default UpdateNodeRegistration
