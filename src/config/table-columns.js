import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import NumberFormat from 'react-number-format'

import { shortenHash } from '../utils/shorten'
import { useTranslation } from 'react-i18next'
import { Badge, Tooltip, Tag, Icon } from 'antd'
import { objectUtils } from '../utils'

const getBlocksmithIndicator = skipped => {
  if (skipped > 10) {
    return 'red'
  } else if (skipped >= 4 && skipped <= 10) {
    return 'orange'
  } else if (skipped >= 1 && skipped <= 3) {
    return 'yellow'
  } else {
    return 'green'
  }
}

const renderCurrenncy = text => {
  return (
    <NumberFormat value={text || 0} displayType={'text'} thousandSeparator={true} suffix={' ZBC'} />
  )
}

const getStatusTrx = (text, status) => {
  switch (status) {
    case 'Rejected':
      return (
        <span style={{ color: 'red' }}>
          <Icon type="close-circle" /> {text}
        </span>
      )
    case 'Expired':
      return (
        <span style={{ color: 'red' }}>
          <Icon type="close-circle" /> {text}
        </span>
      )
    case 'Pending':
      return (
        <span style={{ color: 'orange' }}>
          <Icon type="clock-circle" /> {text}
        </span>
      )
    default:
      return (
        <span style={{ color: 'green' }}>
          <Icon type="check-circle" /> {text}
        </span>
      )
  }
}

const renderTransactionType = (text, record) => {
  if (record.TransactionType === 1) {
    if (record.Escrow) {
      return (
        <>
          {getStatusTrx(text, record.Status)} <Tag color="#113D64">Escrow</Tag>
        </>
      )
    } else if (record.MultisigChild) {
      return (
        <>
          {getStatusTrx(text, record.Status)} <Tag color="#113D64">Multisignature</Tag>
        </>
      )
    } else {
      return getStatusTrx(text, record.Status)
    }
  }

  return getStatusTrx(text, record.Status)
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

const DateFormat = ({ date }) => {
  const { t } = useTranslation()

  return !!date ? moment(date).format('lll') : t('unknown')
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
    render(text) {
      return <DateFormat date={text} />
    },
  },
  {
    title: <Title text="Fees" />,
    dataIndex: 'TotalFeesPaidConversion',
    key: 'TotalFeesPaidConversion',
    render(text) {
      return (
        <NumberFormat
          value={text || 0}
          displayType={'text'}
          decimalScale={2}
          thousandSeparator={true}
          suffix={' ZBC'}
        />
      )
    },
  },
  {
    title: <Title text="Rewards" />,
    dataIndex: 'TotalRewardsConversion',
    key: 'TotalRewardsConversion',
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
      return <DateFormat date={text} />
    },
  },
  {
    title: <Title text="Blocksmith Address" />,
    dataIndex: 'BlocksmithAddress',
    key: 'BlocksmithAddress',
    render(text, record) {
      const skipped = []

      if (Array.isArray(record.SkippedBlocksmiths))
        record.SkippedBlocksmiths.map(
          data => !objectUtils.isContainsNullValue(data) && skipped.push(data)
        )

      return (
        <div className="blocksmith">
          <Tooltip title={`${skipped.length} skipped blocksmith`}>
            <Badge color={getBlocksmithIndicator(skipped.length)} />
          </Tooltip>
          <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
        </div>
      )
    },
  },
  {
    title: <Title text="Fees" />,
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
    width: 200,
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
    width: 200,
    render(text) {
      return <DateFormat date={text} />
    },
  },
  {
    title: <Title text="Type" />,
    dataIndex: 'TransactionTypeName',
    key: 'TransactionTypeName',
    width: 250,
    render: renderTransactionType,
  },
  {
    title: <Title text="Sender" />,
    dataIndex: 'Sender',
    key: 'Sender',
    width: 180,
    render(text) {
      return <Link to={`/accounts/${text}`}>{shortenHash(text, 20)}</Link>
    },
  },
  {
    title: <Title text="Recipient" />,
    dataIndex: 'Recipient',
    key: 'Recipient',
    width: 180,
    render(text) {
      return <Link to={`/accounts/${text}`}>{shortenHash(text, 20)}</Link>
    },
  },
  {
    title: <Title text="Amount" />,
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
  // {
  //   title: <Title text="Node Address" />,
  //   dataIndex: 'NodeAddress',
  //   key: 'NodeAddress',
  // },
  {
    title: <Title text="Locked Funds" />,
    dataIndex: 'LockedFunds',
    key: 'LockedFunds',
    render: renderCurrenncy,
  },
  {
    title: <Title text="Status" />,
    dataIndex: 'RegistrationStatus',
    key: 'RegistrationStatus',
    render(text) {
      return (
        !!text &&
        !!text.toString() &&
        (text.toString() === '0' ? 'Registered' : text.toString() === '1' ? 'In Queue' : 'Stray')
      )
    },
  },
  {
    title: <Title text="Score" />,
    dataIndex: 'ParticipationScore',
    key: 'ParticipationScore',
  },
]

export const publishedReceiptColumns = [
  {
    title: <Title text="Sender" />,
    dataIndex: 'BatchReceipt.SenderPublicKey',
    key: 'BatchReceipt.SenderPublicKey',
    render(text) {
      return !!text && <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: <Title text="Receiver" />,
    dataIndex: 'BatchReceipt.ReceiverPublicKey',
    key: 'BatchReceipt.ReceiverPublicKey',
    render(text) {
      return !!text && <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: <Title text="Block" />,
    dataIndex: 'BatchReceipt.Height',
    key: 'BatchReceipt.Height',
  },
  {
    title: <Title text="Data Type" />,
    dataIndex: 'BatchReceipt.DataType',
    key: 'BatchReceipt.DataType',
  },
  {
    title: <Title text="Data Hash" />,
    dataIndex: 'BatchReceipt.DataHash',
    key: 'BatchReceipt.DataHash',
  },
  {
    title: <Title text="Merkle Root" />,
    dataIndex: 'BatchReceipt.ReceiptMerkleRoot',
    key: 'BatchReceipt.ReceiptMerkleRoot',
  },
  {
    title: <Title text="Receiver Signature" />,
    dataIndex: 'BatchReceipt.ReceiverSignature',
    key: 'BatchReceipt.ReceiverSignature',
  },
]

export const skippedBlocksmithColumns = [
  {
    title: <Title text="Public Key" />,
    dataIndex: 'BlocksmithPublicKey',
    key: 'BlocksmithPublicKey',
  },
  {
    title: <Title text="PoP Change" />,
    dataIndex: 'POPChange',
    key: 'POPChange',
  },
  {
    title: <Title text="Height" />,
    dataIndex: 'BlockHeight',
    key: 'BlockHeight',
  },
  {
    title: <Title text="Index" />,
    dataIndex: 'BlocksmithIndex',
    key: 'BlocksmithIndex',
  },
]

export const latestBlockColumns = [
  {
    title: <Title text="Height" />,
    dataIndex: 'Height',
    key: 'Height',
    render(text, record) {
      return (
        <Link to={`/blocks/${record.BlockID}`}>
          <small>{text}</small>
        </Link>
      )
    },
  },
  {
    title: <Title text="Timestamp" />,
    dataIndex: 'Timestamp',
    key: 'Timestamp',
    render(text) {
      return (
        <small>
          <DateFormat date={text} />
        </small>
      )
    },
  },
  {
    title: <Title text="Blocksmith Address" />,
    dataIndex: 'BlocksmithAddress',
    key: 'BlocksmithAddress',
    render(text, record) {
      const skipped = []

      if (Array.isArray(record.SkippedBlocksmiths))
        record.SkippedBlocksmiths.map(
          data => !objectUtils.isContainsNullValue(data) && skipped.push(data)
        )

      return (
        <div className="blocksmith">
          <small>
            <Tooltip title={`${skipped.length} skipped blocksmith`}>
              <Badge color={getBlocksmithIndicator(skipped.length)} />
            </Tooltip>
            <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
          </small>
        </div>
      )
    },
  },
]

export const latestTransactionColumns = [
  {
    title: <Title text="Fees" />,
    dataIndex: 'FeeConversion',
    key: 'FeeConversion',
    render(text) {
      return <small>{renderCurrenncy(text)}</small>
    },
  },

  {
    title: <Title text="Timestamp" />,
    dataIndex: 'Timestamp',
    key: 'Timestamp',
    width: 200,
    render(text) {
      return (
        <small>
          <DateFormat date={text} />
        </small>
      )
    },
  },
  {
    title: <Title text="Transaction ID" />,
    dataIndex: 'TransactionID',
    key: 'TransactionID',
    render(text) {
      return (
        <Link to={`/transactions/${text}`}>
          <small>{text}</small>
        </Link>
      )
    },
    width: 200,
  },
]
