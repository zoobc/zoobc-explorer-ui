import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import NumberFormat from 'react-number-format'

import { shortenHash } from '../utils/shorten'

const renderCurrenncy = text => {
  return (
    !!text && (
      <NumberFormat value={text} displayType={'text'} thousandSeparator={true} suffix={' BCZ'} />
    )
  )
}

export const accountColumns = [
  {
    title: 'Address',
    dataIndex: 'AccountAddress',
    key: 'AccountAddress',
    render(text) {
      return <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: 'Balance',
    dataIndex: 'BalanceConversion',
    key: 'BalanceConversion',
    render: renderCurrenncy,
  },
  {
    title: 'Last Active',
    dataIndex: 'LastActive',
    key: 'LastActive',
  },
  {
    title: 'Rewards',
    dataIndex: 'TotalRewardsConversion',
    key: 'TotalRewardsConversion',
    render: renderCurrenncy,
  },
  {
    title: 'Fees',
    dataIndex: 'TotalFeesPaidConversion',
    key: 'TotalFeesPaidConversion',
    render: renderCurrenncy,
  },
]

export const blockColumns = [
  {
    title: 'Block ID',
    dataIndex: 'BlockID',
    key: 'BlockID',
    render(text) {
      return <Link to={`/blocks/${text}`}>{text}</Link>
    },
  },
  {
    title: 'Height',
    dataIndex: 'Height',
    key: 'Height',
    render(text, record) {
      return <Link to={`/blocks/${record.BlockID}`}>{text}</Link>
    },
  },
  {
    title: 'Timestamp',
    dataIndex: 'Timestamp',
    key: 'Timestamp',
    render(text) {
      return moment(text).format('lll')
    },
  },
  {
    title: 'Blocksmith',
    dataIndex: 'BlocksmithID',
    key: 'BlocksmithID',
    render(text) {
      return shortenHash(text, 30)
    },
  },
  {
    title: 'Fee',
    dataIndex: 'TotalFeeConversion',
    key: 'TotalFeeConversion',
    render: renderCurrenncy,
  },
  {
    title: 'Rewards',
    dataIndex: 'TotalRewardsConversion',
    key: 'TotalRewardsConversion',
    render: renderCurrenncy,
  },
]

export const transactionColumns = [
  {
    title: 'Transaction ID',
    dataIndex: 'TransactionID',
    key: 'TransactionID',
    render(text) {
      return <Link to={`/transactions/${text}`}>{text}</Link>
    },
  },
  {
    title: 'Timestamp',
    dataIndex: 'Timestamp',
    key: 'Timestamp',
    render(text) {
      return moment(text).format('lll')
    },
  },
  {
    title: 'Type',
    dataIndex: 'TransactionTypeName',
    key: 'TransactionTypeName',
  },
  {
    title: 'Sender',
    dataIndex: 'Sender',
    key: 'Sender',
    render(text) {
      return <Link to={`/accounts/${text}`}>{shortenHash(text, 20)}</Link>
    },
  },
  {
    title: 'Recipient',
    dataIndex: 'Recipient',
    key: 'Recipient',
    render(text) {
      return <Link to={`/accounts/${text}`}>{shortenHash(text, 20)}</Link>
    },
  },
  {
    title: 'Confirmations',
    dataIndex: 'Confirmations',
    key: 'Confirmations',
  },
  {
    title: 'Fees',
    dataIndex: 'FeeConversion',
    key: 'FeeConversion',
    render: renderCurrenncy,
  },
]

export const nodeColumns = [
  {
    title: 'Public Key',
    dataIndex: 'NodePublicKey',
    key: 'NodePublicKey',
    render(text) {
      return <Link to={`/nodes/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: 'Owner Address',
    dataIndex: 'OwnerAddress',
    key: 'OwnerAddress',
    render(text) {
      return <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: 'Node Address',
    dataIndex: 'NodeAddress',
    key: 'NodeAddress',
  },
  {
    title: 'Locked Funds',
    dataIndex: 'LockedFunds',
    key: 'LockedFunds',
    render: renderCurrenncy,
  },
  {
    title: 'Status',
    dataIndex: 'RegistryStatus',
    key: 'RegistryStatus',
    render(text) {
      return !!text.toString() && (text.toString() === 'true' ? 'Registered' : 'In Queue')
    },
  },
  {
    title: 'Score',
    dataIndex: 'ParticipationScore',
    key: 'ParticipationScore',
  },
]

export const blockReceiptColumns = [
  {
    title: 'Sender',
    dataIndex: 'SenderPublicKey',
    key: 'SenderPublicKey',
    render(text) {
      return !!text && <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: 'Receiver',
    dataIndex: 'ReceiverPublicKey',
    key: 'ReceiverPublicKey',
    render(text) {
      return !!text && <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: 'Block',
    dataIndex: 'Height',
    key: 'Height',
  },
  {
    title: 'Block ID',
    dataIndex: 'BlockID',
    key: 'BlockID',
  },
  {
    title: 'Data Type',
    dataIndex: 'DataType',
    key: 'DataType',
  },
  {
    title: 'Data Hash',
    dataIndex: 'DataHash',
    key: 'DataHash',
  },
  {
    title: 'Merkle Root',
    dataIndex: 'ReceiptMerkleRoot',
    key: 'ReceiptMerkleRoot',
  },
  {
    title: 'Receiver Signature',
    dataIndex: 'ReceiverSignature',
    key: 'ReceiverSignature',
  },
]
