import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import NumberFormat from 'react-number-format'

import { shortenHash } from '../utils/shorten'
import { useTranslation } from 'react-i18next'
import { Badge } from 'antd'

//mock badge indicator
const randomBadgeColor = () => {
  const color = ['green', 'blue', 'yellow', 'red', 'black', '#b5b7b9']

  return color[Math.floor(Math.random() * color.length)]
}

const renderCurrenncy = text => {
  return (
    !!text && (
      <NumberFormat value={text} displayType={'text'} thousandSeparator={true} suffix={' ZBC'} />
    )
  )
}

const renderAmountCurrenncy = (text, record) => {
  const path = window.location.pathname

  if (path.search('accounts') === 1) {
    const accountAddress = path.split('/')[2]
    const isSender = record.Sender === accountAddress

    return (
      !!text && (
        <NumberFormat
          value={text}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' ZBC'}
          style={{ color: isSender ? 'red' : 'green' }}
        />
      )
    )
  }

  return (
    !!text && (
      <NumberFormat value={text} displayType={'text'} thousandSeparator={true} suffix={' ZBC'} />
    )
  )
}

const Title = ({ text }) => {
  const { t } = useTranslation()

  return t(text)
}

export const accountColumns = [
  {
    title: <Title text='Address' />,
    dataIndex: 'AccountAddress',
    key: 'AccountAddress',
    render(text) {
      return <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: <Title text='Balance' />,
    dataIndex: 'BalanceConversion',
    key: 'BalanceConversion',
    render: renderCurrenncy,
  },
  {
    title: <Title text='Last Active' />,
    dataIndex: 'LastActive',
    key: 'LastActive',
    render(text) {
      return moment(text).format('lll')
    },
  },
  {
    title: <Title text='Fees' />,
    dataIndex: 'TotalFeesPaidConversion',
    key: 'TotalFeesPaidConversion',
    render: renderCurrenncy,
  },
  {
    title: <Title text='Rewards' />,
    dataIndex: 'TotalRewardsConversion',
    key: 'TotalRewardsConversion',
    render: renderCurrenncy,
  },
]

export const blockColumns = [
  {
    title: <Title text='Block ID' />,
    dataIndex: 'BlockID',
    key: 'BlockID',
    render(text) {
      return <Link to={`/blocks/${text}`}> {text}</Link>
    },
  },
  {
    title: <Title text='Height' />,
    dataIndex: 'Height',
    key: 'Height',
    render(text, record) {
      return <Link to={`/blocks/${record.BlockID}`}>{text}</Link>
    },
  },
  {
    title: <Title text='Timestamp' />,
    dataIndex: 'Timestamp',
    key: 'Timestamp',
    render(text) {
      return moment(text).format('lll')
    },
  },
  {
    title: <Title text='Blocksmith Address' />,
    dataIndex: 'BlocksmithAddress',
    key: 'BlocksmithAddress',
    render(text) {
      return (
        <div className='blocksmith'>
          <Badge color={randomBadgeColor()} />
          <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
        </div>
      )
    },
  },
  {
    title: <Title text='Fees' />,
    dataIndex: 'TotalFeeConversion',
    key: 'TotalFeeConversion',
    render: renderCurrenncy,
  },
  {
    title: <Title text='Rewards' />,
    dataIndex: 'TotalRewardsConversion',
    key: 'TotalRewardsConversion',
    render: renderCurrenncy,
  },
]

export const transactionColumns = [
  {
    title: <Title text='Transaction ID' />,
    dataIndex: 'TransactionID',
    key: 'TransactionID',
    render(text) {
      return <Link to={`/transactions/${text}`}>{text}</Link>
    },
  },
  {
    title: <Title text='Height' />,
    dataIndex: 'Height',
    key: 'Height',
    render(text, record) {
      return <Link to={`/blocks/${record.BlockID}`}>{text}</Link>
    },
  },
  {
    title: <Title text='Timestamp' />,
    dataIndex: 'Timestamp',
    key: 'Timestamp',
    render(text) {
      return moment(text).format('lll')
    },
  },
  {
    title: <Title text='Type' />,
    dataIndex: 'TransactionTypeName',
    key: 'TransactionTypeName',
  },
  {
    title: <Title text='Sender' />,
    dataIndex: 'Sender',
    key: 'Sender',
    render(text) {
      return <Link to={`/accounts/${text}`}>{shortenHash(text, 20)}</Link>
    },
  },
  {
    title: <Title text='Recipient' />,
    dataIndex: 'Recipient',
    key: 'Recipient',
    render(text) {
      return <Link to={`/accounts/${text}`}>{shortenHash(text, 20)}</Link>
    },
  },
  {
    title: <Title text='Amount' />,
    dataIndex: 'Amount',
    key: 'Amount',
    render: renderAmountCurrenncy,
  },
  // {
  //   title: <Title text='Confirmations' />,
  //   dataIndex: 'Confirmations',
  //   key: 'Confirmations',
  // },
  {
    title: <Title text='Fees' />,
    dataIndex: 'FeeConversion',
    key: 'FeeConversion',
    render: renderCurrenncy,
  },
]

export const nodeColumns = [
  {
    title: <Title text='Public Key' />,
    dataIndex: 'NodePublicKey',
    key: 'NodePublicKey',
    render(text) {
      return <Link to={`/nodes/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: <Title text='Owner Address' />,
    dataIndex: 'OwnerAddress',
    key: 'OwnerAddress',
    render(text) {
      return <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: <Title text='Node Address' />,
    dataIndex: 'NodeAddress',
    key: 'NodeAddress',
  },
  {
    title: <Title text='Locked Funds' />,
    dataIndex: 'LockedFunds',
    key: 'LockedFunds',
    render: renderCurrenncy,
  },
  {
    title: <Title text='Status' />,
    dataIndex: 'RegistryStatus',
    key: 'RegistryStatus',
    render(text) {
      return (
        !!text.toString() &&
        (text.toString() === '0' ? 'Registered' : text.toString() === '1' ? 'In Queue' : 'Stray')
      )
    },
  },
  {
    title: <Title text='Score' />,
    dataIndex: 'ParticipationScore',
    key: 'ParticipationScore',
  },
]

export const publishedReceiptColumns = [
  {
    title: <Title text='Sender' />,
    dataIndex: 'BatchReceipt.SenderPublicKey',
    key: 'BatchReceipt.SenderPublicKey',
    render(text) {
      return !!text && <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: <Title text='Receiver' />,
    dataIndex: 'BatchReceipt.ReceiverPublicKey',
    key: 'BatchReceipt.ReceiverPublicKey',
    render(text) {
      return !!text && <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: <Title text='Block' />,
    dataIndex: 'BatchReceipt.Height',
    key: 'BatchReceipt.Height',
  },
  {
    title: <Title text='Data Type' />,
    dataIndex: 'BatchReceipt.DataType',
    key: 'BatchReceipt.DataType',
  },
  {
    title: <Title text='Data Hash' />,
    dataIndex: 'BatchReceipt.DataHash',
    key: 'BatchReceipt.DataHash',
  },
  {
    title: <Title text='Merkle Root' />,
    dataIndex: 'BatchReceipt.ReceiptMerkleRoot',
    key: 'BatchReceipt.ReceiptMerkleRoot',
  },
  {
    title: <Title text='Receiver Signature' />,
    dataIndex: 'BatchReceipt.ReceiverSignature',
    key: 'BatchReceipt.ReceiverSignature',
  },
]
