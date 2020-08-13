import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import NumberFormat from 'react-number-format'

import { shortenHash } from '../utils/shorten'
import { useTranslation } from 'react-i18next'
import { Badge, Tooltip, Tag, Icon } from 'antd'
import { objectUtils } from '../utils'
import Timestamp from '../components/Timestamp'
import { InfoCircleOutlined } from '@ant-design/icons'

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
    <NumberFormat
      value={text || 0}
      displayType={'text'}
      thousandSeparator={true}
      suffix={' ZBC'}
      className="page-title"
    />
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
      <NumberFormat
        value={text}
        displayType={'text'}
        thousandSeparator={true}
        suffix={' ZBC'}
        className="page-title"
      />
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
    title: <Title text="address" />,
    dataIndex: 'AccountAddress',
    key: 'AccountAddress',

    render(text) {
      return <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: <Title text="balance" />,
    dataIndex: 'BalanceConversion',
    key: 'BalanceConversion',
    render: renderCurrenncy,
  },
  {
    title: <Title text="last active" />,
    dataIndex: 'LastActive',
    key: 'LastActive',
    render(text) {
      return <DateFormat date={text} />
    },
  },
  {
    title: <Title text="fees" />,
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
          className="page-title"
        />
      )
    },
  },
  {
    title: <Title text="rewards" />,
    dataIndex: 'TotalRewardsConversion',
    key: 'TotalRewardsConversion',
    render: renderCurrenncy,
  },
]

export const blockColumns = [
  {
    title: (
      <div>
        <Title text="block id" />{' '}
        <Tooltip
          placement="bottom"
          title="An identifier which facilitates easy identification of blocks of the blockchain"
        >
          <InfoCircleOutlined />
        </Tooltip>
      </div>
    ),
    dataIndex: 'BlockID',
    key: 'BlockID',
    render(text) {
      return <Link to={`/blocks/${text}`}> {text}</Link>
    },
  },
  {
    title: (
      <div>
        <Title text="height" />{' '}
        <Tooltip
          placement="bottom"
          title="The position of the block in the ZooBC blockchain. For example, Height 0, would be the very first block, which is also called the Genesis Block"
        >
          <InfoCircleOutlined />
        </Tooltip>
      </div>
    ),
    dataIndex: 'Height',
    key: 'Height',
    render(text, record) {
      return <Link to={`/blocks/${record.BlockID}`}>{text}</Link>
    },
  },
  {
    title: <Title text="timestamp" />,
    dataIndex: 'Timestamp',
    key: 'Timestamp',
    render(text) {
      return <DateFormat date={text} style={{ color: 'white' }} />
    },
  },
  {
    title: (
      <div>
        <Title text="blocksmith address" />{' '}
        <Tooltip placement="bottom" title="Account that generated the block">
          <InfoCircleOutlined />
        </Tooltip>
      </div>
    ),
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
    title: <Title text="fees" />,
    dataIndex: 'TotalFeeConversion',
    key: 'TotalFeeConversion',
    render: renderCurrenncy,
  },
  {
    title: <Title text="rewards" />,
    dataIndex: 'TotalRewardsConversion',
    key: 'TotalRewardsConversion',
    render: renderCurrenncy,
  },
]

export const transactionColumns = [
  {
    title: (
      <div>
        <Title text="transaction id" />{' '}
        <Tooltip
          placement="bottom"
          title="An identifier which failitates easy identification of transactions on the ZooBC blockchain"
        >
          <InfoCircleOutlined />
        </Tooltip>
      </div>
    ),
    dataIndex: 'TransactionID',
    key: 'TransactionID',
    render(text) {
      return <Link to={`/transactions/${text}`}>{text}</Link>
    },
    width: 200,
  },
  {
    title: (
      <div>
        <Title text="height" />{' '}
        <Tooltip placement="bottom" title="The block height in which the transaction is included">
          <InfoCircleOutlined />
        </Tooltip>
      </div>
    ),
    dataIndex: 'Height',
    key: 'Height',
    render(text, record) {
      return <Link to={`/blocks/${record.BlockID}`}>{text}</Link>
    },
  },
  {
    title: <Title text="timestamp" />,
    dataIndex: 'Timestamp',
    key: 'Timestamp',
    width: 200,
    render(text) {
      return <DateFormat date={text} />
    },
  },
  {
    title: <Title text="type" />,
    dataIndex: 'TransactionTypeName',
    key: 'TransactionTypeName',
    width: 250,
    render: renderTransactionType,
  },
  {
    title: <Title text="sender" />,
    dataIndex: 'Sender',
    key: 'Sender',
    width: 180,
    render(text) {
      return <Link to={`/accounts/${text}`}>{shortenHash(text, 20)}</Link>
    },
  },
  {
    title: <Title text="recipient" />,
    dataIndex: 'Recipient',
    key: 'Recipient',
    width: 180,
    render(text) {
      return <Link to={`/accounts/${text}`}>{shortenHash(text, 20)}</Link>
    },
  },
  {
    title: <Title text="amount" />,
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
    title: <Title text="fees" />,
    dataIndex: 'FeeConversion',
    key: 'FeeConversion',
    render: renderCurrenncy,
  },
]

export const nodeColumns = [
  {
    title: (
      <div>
        <Title text="public key" />{' '}
        <Tooltip
          placement="bottom"
          title="A string of letters and numbers that are used to receive amount of ZooBC. Works similar to a traditional bank account number and can be shared publicly with others"
        >
          <InfoCircleOutlined />
        </Tooltip>
      </div>
    ),
    dataIndex: 'NodePublicKey',
    key: 'NodePublicKey',
    render(text) {
      return <Link to={`/nodes/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: <Title text="owner address" />,
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
    title: (
      <div>
        <Title text="locked funds" />{' '}
        <Tooltip placement="bottom" title="Amount of ZooBC to be locked as security money for node">
          <InfoCircleOutlined />
        </Tooltip>
      </div>
    ),
    dataIndex: 'LockedFunds',
    key: 'LockedFunds',
    render: renderCurrenncy,
  },
  {
    title: <Title text="status" />,
    dataIndex: 'RegistrationStatus',
    key: 'RegistrationStatus',
    render(text) {
      return text === 0 ? 'Registered' : text === 1 ? 'In Queue' : text === 2 ? 'Stray' : null
    },
  },
  {
    title: <Title text="score" />,
    dataIndex: 'ParticipationScore',
    key: 'ParticipationScore',
  },
]

export const publishedReceiptColumns = [
  {
    title: <Title text="sender" />,
    dataIndex: 'BatchReceipt.SenderPublicKey',
    key: 'BatchReceipt.SenderPublicKey',
    render(text) {
      return !!text && <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: <Title text="receiver" />,
    dataIndex: 'BatchReceipt.ReceiverPublicKey',
    key: 'BatchReceipt.ReceiverPublicKey',
    render(text) {
      return !!text && <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: <Title text="block" />,
    dataIndex: 'BatchReceipt.Height',
    key: 'BatchReceipt.Height',
  },
  {
    title: <Title text="data type" />,
    dataIndex: 'BatchReceipt.DataType',
    key: 'BatchReceipt.DataType',
  },
  {
    title: <Title text="data hash" />,
    dataIndex: 'BatchReceipt.DataHash',
    key: 'BatchReceipt.DataHash',
  },
  {
    title: <Title text="merkle root" />,
    dataIndex: 'BatchReceipt.ReceiptMerkleRoot',
    key: 'BatchReceipt.ReceiptMerkleRoot',
  },
  {
    title: <Title text="receiver signature" />,
    dataIndex: 'BatchReceipt.ReceiverSignature',
    key: 'BatchReceipt.ReceiverSignature',
  },
]

export const skippedBlocksmithColumns = [
  {
    title: <Title text="public key" />,
    dataIndex: 'BlocksmithPublicKey',
    key: 'BlocksmithPublicKey',
  },
  {
    title: <Title text="pop change" />,
    dataIndex: 'POPChange',
    key: 'POPChange',
  },
  {
    title: <Title text="height" />,
    dataIndex: 'BlockHeight',
    key: 'BlockHeight',
  },
  {
    title: <Title text="index" />,
    dataIndex: 'BlocksmithIndex',
    key: 'BlocksmithIndex',
  },
]

export const latestBlockColumns = [
  {
    title: (
      <div>
        <Title text="height" />{' '}
        <Tooltip
          placement="bottom"
          title="The position of the block in the ZooBC blockchain. For example, Height 0, would be the very first block, which is also called the Genesis Block"
          style={{ display: 'inline-block' }}
        >
          <InfoCircleOutlined />
        </Tooltip>
      </div>
    ),
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
    title: <Title text="fees" />,
    dataIndex: 'TotalFeeConversion',
    key: 'TotalFeeConversion',
    render(text) {
      return <small>{renderCurrenncy(text)}</small>
    },
  },
  {
    title: <Title text="trans" />,
    dataIndex: 'TotalTransaction',
    key: 'TotalTransaction',
    render(text) {
      return <small>{text}</small>
    },
  },
  {
    title: <Title text="timestamp" />,
    dataIndex: 'Timestamp',
    key: 'Timestamp',
    render(text) {
      return (
        <small>
          <Timestamp value={text} />
        </small>
      )
    },
  },
  {
    title: <Title text="blocksmith" />,
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
            <Link to={`/accounts/${text}`}>{shortenHash(text, 15)}</Link>
          </small>
        </div>
      )
    },
  },
]

export const latestTransactionColumns = [
  {
    title: <Title text="fees" />,
    dataIndex: 'FeeConversion',
    key: 'FeeConversion',
    render(text) {
      return <small>{renderCurrenncy(text)}</small>
    },
  },
  {
    title: <Title text="timestamp" />,
    dataIndex: 'Timestamp',
    key: 'Timestamp',
    render(text) {
      return (
        <small>
          <Timestamp value={text} />
        </small>
      )
    },
  },
  {
    title: (
      <div>
        <Title text="transaction id" />{' '}
        <Tooltip
          placement="bottom"
          title="An identifier which facilitates easy identification of transactions on the ZooBC blockchain"
        >
          <InfoCircleOutlined />
        </Tooltip>
      </div>
    ),
    dataIndex: 'TransactionID',
    key: 'TransactionID',
    render(text) {
      return (
        <Link to={`/transactions/${text}`}>
          <small>{text}</small>
        </Link>
      )
    },
  },
  {
    title: <Title text="height" />,
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
]
