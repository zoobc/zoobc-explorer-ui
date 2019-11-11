import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'

import DescItem from '../DescItem'

const NodeRegistration = ({ data }) => {
  return (
    <Card className="transaction-card">
      <h4 className="transaction-card-title">Node Registration</h4>
      <DescItem label="Node Address" value={data.NodeAddress} />
      <DescItem
        label="Account Address"
        value={<Link to={`/nodes/${data.AccountAddress}`}>{data.AccountAddress}</Link>}
      />
      <DescItem
        label="Node Pulic Key"
        value={<Link to={`/nodes/${data.NodePublicKey}`}>{data.NodePublicKey}</Link>}
      />
      <DescItem
        label="Locked Balance"
        value={
          <NumberFormat
            value={data.LockedBalanceConversion || 0}
            displayType={'text'}
            thousandSeparator={true}
            suffix={' ZBC'}
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
