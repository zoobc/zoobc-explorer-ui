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
import ZBCShortAddress from '../components/ZBCShortAddress'

const getBlocksmithIndicator = skipped => {
  if (skipped > 10) {
    return {
      text: `${skipped} skipped blocksmith`,
      sorttext: `${skipped} skipped`,
      color: '#f5222d',
    }
  } else if (skipped >= 4 && skipped <= 10) {
    return {
      text: `${skipped} skipped blocksmith`,
      sorttext: `${skipped} skipped`,
      color: '#fa8c16',
    }
  } else if (skipped >= 1 && skipped <= 3) {
    return {
      text: `${skipped} skipped blocksmith`,
      sorttext: `${skipped} skipped`,
      color: '#722ed1',
    }
  } else {
    return {
      text: 'No skipped blocksmith',
      sorttext: 'No skipped',
      color: '#52c41a',
    }
  }
}

const getScoreColorIndicator = participation => {
  if (participation > 70) {
    return 'green'
  } else if (participation > 30 && participation <= 70) {
    return 'yellow'
  } else {
    return 'red'
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
          prefix={isSender ? '-' : '+'}
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

  return !!date ? moment(date).format('DD/MM/YY @ H:mm:ss') : t('unknown')
}

export const accountColumns = [
  {
    title: <Title text="address" />,
    dataIndex: 'AccountAddress',
    key: 'AccountAddress',

    render(text) {
      return <ZBCShortAddress address={text} href={`/accounts/${text}`} title="Account Address" />
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
        <Title text="block hash" />{' '}
        <Tooltip
          placement="bottom"
          title={
            <Title text="an identifier which facilitates easy identification of blocks on the zoobc blockchain" />
          }
        >
          <InfoCircleOutlined />
        </Tooltip>
      </div>
    ),
    dataIndex: 'BlockHash',
    key: 'BlockHash',
    render(text, record) {
      return (
        <ZBCShortAddress address={text} href={`/blocks/${record.BlockID}`} title="Block Hash" />
      )
    },
  },
  {
    title: (
      <div>
        <Title text="height" />{' '}
        <Tooltip
          placement="bottom"
          title={
            <Title text="the position of the block in the zoobc blockchain. for example, height 0, would be the very first block, which is also called the genesis block" />
          }
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
        <Title text="skipped blocksmith" />{' '}
        <Tooltip placement="bottom" title={<Title text="account that generated the block" />}>
          <InfoCircleOutlined />
        </Tooltip>
      </div>
    ),
    render(text, record) {
      const skipped = []

      if (Array.isArray(record.SkippedBlocksmiths))
        record.SkippedBlocksmiths.map(
          data => !objectUtils.isContainsNullValue(data) && skipped.push(data)
        )

      return (
        <Tag color={getBlocksmithIndicator(skipped.length).color}>
          {getBlocksmithIndicator(skipped.length).text}
        </Tag>
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
        <Title text="transaction hash" />{' '}
        <Tooltip
          placement="bottom"
          title={
            <Title text="an identifier which facilitates easy identification of transactions on the zoobc blockchain" />
          }
        >
          <InfoCircleOutlined />
        </Tooltip>
      </div>
    ),
    dataIndex: 'TransactionHashFormatted',
    key: 'TransactionHashFormatted',
    render(text, record) {
      return (
        <ZBCShortAddress
          address={text}
          href={`/transactions/${record.TransactionID}`}
          title="Transaction Hash"
        />
      )
    },
    width: 200,
  },
  {
    title: (
      <div>
        <Title text="height" />{' '}
        <Tooltip
          placement="bottom"
          title={<Title text="the block height in which the transaction is included" />}
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
    render(text, record) {
      const path = window.location.pathname

      if (path.search('accounts') === 1) {
        const accountAddress = path.split('/')[2]

        const isSender = record.Sender === accountAddress

        return (
          !!text && (
            <ZBCShortAddress
              address={text}
              href={`/accounts/${text}`}
              title="Sender Address"
              style={{ color: isSender ? 'orangeRed' : null }}
            />
          )
        )
      }
      return <ZBCShortAddress address={text} href={`/accounts/${text}`} title="Sender Address" />
    },
  },
  {
    title: <Title text="recipient" />,
    dataIndex: 'Recipient',
    key: 'Recipient',
    width: 180,
    render(text, record) {
      const path = window.location.pathname
      if (path.search('accounts') === 1) {
        const accountAddress = path.split('/')[2]

        const isRecipient = record.Recipient === accountAddress

        return (
          !!text && (
            <ZBCShortAddress
              address={text}
              href={`/accounts/${text}`}
              title="Recipient Address"
              style={{ color: isRecipient ? 'orangeRed' : null }}
            />
          )
        )
      }
      return <ZBCShortAddress address={text} href={`/accounts/${text}`} title="Recipient Address" />
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
          title={
            <Title text="a string of letters and numbers that are used to receive amount of zoobc. works similar to a traditional bank account number and can be shared publicly with others" />
          }
        >
          <InfoCircleOutlined />
        </Tooltip>
      </div>
    ),
    dataIndex: 'NodePublicKey',
    key: 'NodePublicKey',
    render(text) {
      return <Link to={`/nodes/${text}`}>{shortenHash(text)}</Link>
    },
    width: 200,
  },
  {
    title: <Title text="owner address" />,
    dataIndex: 'OwnerAddress',
    key: 'OwnerAddress',
    render(text) {
      return <Link to={`/accounts/${text}`}>{shortenHash(text)}</Link>
    },
    width: 200,
  },
  {
    title: (
      <div>
        <Title text="locked funds" />{' '}
        <Tooltip
          placement="bottom"
          title={<Title text="amount of zoobc to be locked as security money for node" />}
        >
          <InfoCircleOutlined />
        </Tooltip>
      </div>
    ),
    dataIndex: 'LockedFunds',
    key: 'LockedFunds',
    render: renderCurrenncy,
    width: 170,
  },
  {
    title: <Title text="status" />,
    dataIndex: 'RegistrationStatus',
    key: 'RegistrationStatus',
    render(text) {
      return text === 0 ? 'Registered' : text === 1 ? 'In Queue' : text === 2 ? 'Stray' : null
    },
    width: 130,
  },
  {
    title: <Title text="height" />,
    dataIndex: 'RegisteredBlockHeight',
    key: 'RegisteredBlockHeight',
    render(text) {
      return <Link to={`/blocks/${text}`}>{text}</Link>
    },
    width: 100,
  },
  {
    title: <Title text="timestamp" />,
    dataIndex: 'RegistrationTime',
    key: 'RegistrationTime',
    render(text) {
      return <DateFormat date={text} />
    },
  },
  {
    title: <Title text="score" />,
    dataIndex: 'PercentageScore',
    key: 'PercentageScore',
    render(text) {
      if (text) {
        const score = parseFloat(text).toFixed(7)
        return (
          <div className="blocksmith">
            <Badge color={getScoreColorIndicator(score)} text={text} />
          </div>
        )
      }
    },
  },
]

export const publishedReceiptColumns = [
  {
    title: () => (
      <div>
        <Title text="sender" />{' '}
        <Tooltip placement="bottom" title={<Title text="sender node public key" />}>
          <InfoCircleOutlined />
        </Tooltip>
      </div>
    ),
    dataIndex: 'BatchReceipt.SenderPublicKey',
    key: 'BatchReceipt.SenderPublicKey',
    render(text) {
      return (
        !!text && (
          <ZBCShortAddress address={text} href={`/accounts/${text}`} title="Sender Public Key" />
        )
      )
    },
  },
  {
    title: () => (
      <div>
        <Title text="receiver" />{' '}
        <Tooltip placement="bottom" title={<Title text="receiver node public key" />}>
          <InfoCircleOutlined />
        </Tooltip>
      </div>
    ),
    dataIndex: 'BatchReceipt.RecipientPublicKey',
    key: 'BatchReceipt.RecipientPublicKey',
    render(text) {
      return (
        !!text && (
          <ZBCShortAddress address={text} href={`/accounts/${text}`} title="Recipient Public Key" />
        )
      )
    },
  },
  {
    title: <Title text="height" />,
    dataIndex: 'BlockHeight',
    key: 'BlockHeight',
    render(text) {
      return !!text && <Link to={`/blocks/${text}`}>{text}</Link>
    },
  },
  {
    title: <Title text="data type" />,
    dataIndex: 'BatchReceipt.DatumType',
    key: 'BatchReceipt.DatumType',
  },
  {
    title: <Title text="data hash" />,
    dataIndex: 'BatchReceipt.DatumHash',
    key: 'BatchReceipt.DatumHash',
    // render(text) {
    //   return !!text && shortenHash(text)
    // },
  },
  // {
  //   title: <Title text="receiver signature" />,
  //   dataIndex: 'BatchReceipt.RecipientSignature',
  //   key: 'BatchReceipt.RecipientSignature',
  //   render(text) {
  //     return !!text && shortenHash(text)
  //   },
  // },
]

export const skippedBlocksmithColumns = [
  {
    title: <Title text="public key" />,
    dataIndex: 'BlocksmithPublicKey',
    key: 'BlocksmithPublicKey',
    render(text) {
      return (
        !!text && <ZBCShortAddress address={text} href={`/nodes/${text}`} title="Node Public Key" />
      )
    },
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
  {
    title: <Title text="fees" />,
    dataIndex: 'TotalFeeConversion',
    key: 'TotalFeeConversion',
    render(text) {
      return <small>{renderCurrenncy(text)}</small>
    },
  },
  {
    title: <Title text="trx" />,
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
    render(text, record) {
      const skipped = []

      if (Array.isArray(record.SkippedBlocksmiths))
        record.SkippedBlocksmiths.map(
          data => !objectUtils.isContainsNullValue(data) && skipped.push(data)
        )

      return (
        <Tag color={getBlocksmithIndicator(skipped.length).color}>
          {getBlocksmithIndicator(skipped.length).sorttext}
        </Tag>
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
    title: <Title text="transaction hash" />,
    dataIndex: 'TransactionHashFormatted',
    key: 'TransactionHashFormatted',
    render(text, record) {
      return (
        <ZBCShortAddress
          address={text}
          href={`/transactions/${record.TransactionID}`}
          title="Transaction Hash"
          small
        />
        // <Link to={`/transactions/${record.TransactionID}`}>
        //   <small>{shortenHash(text)}</small>
        // </Link>
      )
    },
  },
  {
    title: <Title text="height" />,
    dataIndex: 'Height',
    key: 'Height',
    render(text, record) {
      return (
        <Link to={`/blocks/${record.Height}`}>
          <small>{text}</small>
        </Link>
      )
    },
  },
]

export const accountRewardColumns = [
  {
    title: <Title text="address" />,
    dataIndex: 'AccountAddress',
    key: 'AccountAddress',
    render(text) {
      return <ZBCShortAddress address={text} href={`/accounts/${text}`} title="Account Address" />
    },
  },
  {
    title: <Title text="height" />,
    dataIndex: 'BlockHeight',
    key: 'BlockHeight',
    render(text) {
      return <Link to={`/blocks/${text}`}>{text}</Link>
    },
  },
  {
    title: <Title text="timestamp" />,
    dataIndex: 'Timestamp',
    key: 'Timestamp',
    render(text) {
      return <DateFormat date={text} />
    },
  },
  {
    title: <Title text="balance" />,
    dataIndex: 'BalanceChangeConversion',
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
]

export const popColumns = [
  // {
  //   title: <Title text="node id" />,
  //   dataIndex: 'NodeID',
  //   key: 'NodeID',
  // },
  {
    title: <Title text="node public key" />,
    dataIndex: 'NodePublicKey',
    key: 'NodePublicKey',
    render(text) {
      // return !!text && <Link to={`/nodes/${text}`}>{shortenHash(text, 30)}</Link>
      return (
        !!text && <ZBCShortAddress address={text} href={`/nodes/${text}`} title="Node Public Key" />
      )
    },
  },
  {
    title: <Title text="height" />,
    dataIndex: 'Height',
    key: 'BlockHeigHeightht',
    render(text) {
      return <Link to={`/blocks/${text}`}>{text}</Link>
    },
  },
  {
    title: <Title text="score" />,
    dataIndex: 'Score',
    key: 'Score',
  },
  {
    title: <Title text="difference score" />,
    dataIndex: 'DifferenceScores',
    key: 'DifferenceScores',
  },
  {
    title: <Title text="difference score (%)" />,
    dataIndex: 'DifferenceScorePercentage',
    key: 'DifferenceScorePercentage',
    render(text, record) {
      if (text) {
        const percentage = parseFloat(text).toFixed(7)
        return (
          <span
            style={{
              color:
                record.Flag === 'Flat'
                  ? 'orange'
                  : record.Flag === 'Down'
                  ? 'red'
                  : record.Flag === 'Up'
                  ? 'green'
                  : null,
            }}
          >
            {record.Flag === 'Flat' && <Icon type="shrink" />}
            {record.Flag === 'Down' && <Icon type="arrow-down" />}
            {record.Flag === 'Up' && <Icon type="arrow-up" />} {percentage}
          </span>
        )
      }
    },
  },
]
