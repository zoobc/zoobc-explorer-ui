import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import NumberFormat from 'react-number-format'

import { shortenHash } from '../utils/shorten'
import { useTranslation } from 'react-i18next'

const renderCurrenncy = text => {
  return (
    !!text && (
      <NumberFormat value={text} displayType={'text'} thousandSeparator={true} suffix={' BCZ'} />
    )
  )
}

const Title = ({ text }) => {
  const { t } = useTranslation()

  return t(text)
}

export const accountColumns = [
  {
    title: <Title text="Address" />,
    dataIndex: 'AccountAddress',
    key: 'AccountAddress',
    render(text) {
      return <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: <Title text="Balance" />,
    dataIndex: 'BalanceConversion',
    key: 'BalanceConversion',
    render: renderCurrenncy,
  },
  {
    title: <Title text="Last Active" />,
    dataIndex: 'LastActive',
    key: 'LastActive',
  },
  {
    title: <Title text="Rewards" />,
    dataIndex: 'TotalRewardsConversion',
    key: 'TotalRewardsConversion',
    render: renderCurrenncy,
  },
  {
    title: <Title text="Fees" />,
    dataIndex: 'TotalFeesPaidConversion',
    key: 'TotalFeesPaidConversion',
    render: renderCurrenncy,
  },
]

export const blockColumns = [
  {
    title: <Title text="Block ID" />,
    dataIndex: 'BlockID',
    key: 'BlockID',
    render(text) {
      return <Link to={`/blocks/${text}`}> {text}</Link>
    },
  },
  {
    title: <Title text="Height" />,
    dataIndex: 'Height',
    key: 'Height',
    render(text, record) {
      return <Link to={`/blocks/${record.BlockID}`}>{text}</Link>
    },
  },
  {
    title: <Title text="Timestamp" />,
    dataIndex: 'Timestamp',
    key: 'Timestamp',
    render(text) {
      return moment(text).format('lll')
    },
  },
  {
    title: <Title text="Blocksmith" />,
    dataIndex: 'BlocksmithID',
    key: 'BlocksmithID',
    render(text) {
      return shortenHash(text, 30)
    },
  },
  {
    title: <Title text="Fee" />,
    dataIndex: 'TotalFeeConversion',
    key: 'TotalFeeConversion',
    render: renderCurrenncy,
  },
  {
    title: <Title text="Rewards" />,
    dataIndex: 'TotalRewardsConversion',
    key: 'TotalRewardsConversion',
    render: renderCurrenncy,
  },
]

export const transactionColumns = [
  {
    title: <Title text="Transaction ID" />,
    dataIndex: 'TransactionID',
    key: 'TransactionID',
    render(text) {
      return <Link to={`/transactions/${text}`}>{text}</Link>
    },
  },
  {
    title: <Title text="Timestamp" />,
    dataIndex: 'Timestamp',
    key: 'Timestamp',
    render(text) {
      return moment(text).format('lll')
    },
  },
  {
    title: <Title text="Type" />,
    dataIndex: 'TransactionTypeName',
    key: 'TransactionTypeName',
  },
  {
    title: <Title text="Sender" />,
    dataIndex: 'Sender',
    key: 'Sender',
    render(text) {
      return <Link to={`/accounts/${text}`}>{shortenHash(text, 20)}</Link>
    },
  },
  {
    title: <Title text="Recipient" />,
    dataIndex: 'Recipient',
    key: 'Recipient',
    render(text) {
      return <Link to={`/accounts/${text}`}>{shortenHash(text, 20)}</Link>
    },
  },
  {
    title: <Title text="Confirmations" />,
    dataIndex: 'Confirmations',
    key: 'Confirmations',
  },
  {
    title: <Title text="Fees" />,
    dataIndex: 'FeeConversion',
    key: 'FeeConversion',
    render: renderCurrenncy,
  },
]

export const nodeColumns = [
  {
    title: <Title text="Public Key" />,
    dataIndex: 'NodePublicKey',
    key: 'NodePublicKey',
    render(text) {
      return <Link to={`/nodes/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: <Title text="Owner Address" />,
    dataIndex: 'OwnerAddress',
    key: 'OwnerAddress',
    render(text) {
      return <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: <Title text="Node Address" />,
    dataIndex: 'NodeAddress',
    key: 'NodeAddress',
  },
  {
    title: <Title text="Locked Funds" />,
    dataIndex: 'LockedFunds',
    key: 'LockedFunds',
    render: renderCurrenncy,
  },
  {
    title: <Title text="Status" />,
    dataIndex: 'RegistryStatus',
    key: 'RegistryStatus',
    render(text) {
      return !!text.toString() && (text.toString() === 'true' ? 'Registered' : 'In Queue')
    },
  },
  {
    title: <Title text="Score" />,
    dataIndex: 'ParticipationScore',
    key: 'ParticipationScore',
  },
]

export const blockReceiptColumns = [
  {
    title: <Title text="Sender" />,
    dataIndex: 'SenderPublicKey',
    key: 'SenderPublicKey',
    render(text) {
      return !!text && <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: <Title text="Receiver" />,
    dataIndex: 'ReceiverPublicKey',
    key: 'ReceiverPublicKey',
    render(text) {
      return !!text && <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: <Title text="Block" />,
    dataIndex: 'Height',
    key: 'Height',
  },
  {
    title: <Title text="Block ID" />,
    dataIndex: 'BlockID',
    key: 'BlockID',
  },
  {
    title: <Title text="Data Type" />,
    dataIndex: 'DataType',
    key: 'DataType',
  },
  {
    title: <Title text="Data Hash" />,
    dataIndex: 'DataHash',
    key: 'DataHash',
  },
  {
    title: <Title text="Merkle Root" />,
    dataIndex: 'ReceiptMerkleRoot',
    key: 'ReceiptMerkleRoot',
  },
  {
    title: <Title text="Receiver Signature" />,
    dataIndex: 'ReceiverSignature',
    key: 'ReceiverSignature',
  },
]
