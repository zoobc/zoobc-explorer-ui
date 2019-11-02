import React from 'react'
import { Card } from 'antd'

import DescItem from '../DescItem'

const ClaimNodeRegistration = ({ data }) => {
  return (
    <Card className="transaction-card">
      <h4 className="transaction-card-title">Claim Node Registration</h4>
      <DescItem label="Account Address" value={data.AccountAddress} />
      <DescItem label="Node Pulic Key" value={data.NodePublicKey} />
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

export default ClaimNodeRegistration
