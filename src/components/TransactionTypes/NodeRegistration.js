import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'

import DescItem from '../DescItem'
import CopyToClipboard from '../CopyToClipboard'

const NodeRegistration = ({ data }) => {
  return (
    <Card className="transaction-card">
      <h4 className="transaction-card-title">Node Registration</h4>
      <DescItem label="Node Address" value={data.NodeAddress} />
      <DescItem
        label="Account Address"
        value={
          <CopyToClipboard
            text={data.AccountAddress}
            component={<Link to={`/nodes/${data.AccountAddress}`}>{data.AccountAddress}</Link>}
            keyID="accountAddress"
          />
        }
      />
      <DescItem
        label="Node Pulic Key"
        value={
          <CopyToClipboard
            text={data.NodePublicKey}
            component={<Link to={`/nodes/${data.NodePublicKey}`}>{data.NodePublicKey}</Link>}
            keyID="nodePublickKey"
          />
        }
      />
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
