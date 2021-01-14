/** 
 * ZooBC Copyright (C) 2020 Quasisoft Limited - Hong Kong
 * This file is part of ZooBC <https://github.com/zoobc/zoobc-explorer-ui>

 * ZooBC is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * ZooBC is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
 * See the GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with ZooBC.  If not, see <http://www.gnu.org/licenses/>.

 * Additional Permission Under GNU GPL Version 3 section 7.
 * As the special exception permitted under Section 7b, c and e, 
 * in respect with the Author’s copyright, please refer to this section:

 * 1. You are free to convey this Program according to GNU GPL Version 3,
 *     as long as you respect and comply with the Author’s copyright by 
 *     showing in its user interface an Appropriate Notice that the derivate 
 *     program and its source code are “powered by ZooBC”. 
 *     This is an acknowledgement for the copyright holder, ZooBC, 
 *     as the implementation of appreciation of the exclusive right of the
 *     creator and to avoid any circumvention on the rights under trademark
 *     law for use of some trade names, trademarks, or service marks.

 * 2. Complying to the GNU GPL Version 3, you may distribute 
 *     the program without any permission from the Author. 
 *     However a prior notification to the authors will be appreciated.

 * ZooBC is architected by Roberto Capodieci & Barton Johnston
 * contact us at roberto.capodieci[at]blockchainzoo.com
 * and barton.johnston[at]blockchainzoo.com

 * IMPORTANT: The above copyright notice and this permission notice
 * shall be included in all copies or substantial portions of the Software.
**/

import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import NumberFormat from 'react-number-format'
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
      color: '#D50000',
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
      color: '#008A00',
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
      className="page-title monospace-text"
    />
  )
}

const getStatusTrx = (text, status) => {
  switch (status) {
    case 'Rejected':
      return (
        <span style={{ color: '#D50000' }}>
          <Icon type="close-circle" /> {text}
        </span>
      )
    case 'Expired':
      return (
        <span style={{ color: '#D50000' }}>
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
        <span style={{ color: '#006800' }}>
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
          className="monospace-text"
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
        className="page-title monospace-text"
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
    dataIndex: 'AccountAddressFormatted',
    key: 'AccountAddressFormatted',
    render(text) {
      return <ZBCShortAddress address={text} href={`/accounts/${text}`} title="account address" />
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
          className="page-title monospace-text"
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
    dataIndex: 'BlockHashFormatted',
    key: 'BlockHashFormatted',
    render(text) {
      return <ZBCShortAddress address={text} href={`/blocks/${text}`} title="block hash" />
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
    render(text) {
      return <Link to={`/blocks/${text}`}>{text}</Link>
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
          title="transaction hash"
        />
      )
    },
    width: 240,
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
      return <Link to={`/blocks/${text}`}>{text}</Link>
    },
    width: 120,
  },
  {
    title: <Title text="timestamp" />,
    dataIndex: 'Timestamp',
    key: 'Timestamp',
    width: 170,
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
    dataIndex: 'SenderFormatted',
    key: 'SenderFormatted',
    // width: 180,
    render(text, record) {
      const path = window.location.pathname

      if (path.search('accounts') === 1) {
        const accountAddress = path.split('/')[2]

        const isSender = record.SenderFormatted === accountAddress

        return (
          !!text && (
            <ZBCShortAddress
              address={text}
              href={`/accounts/${text}`}
              title="sender address"
              style={{ fontWeight: isSender ? 'bold' : null, color: isSender ? 'green' : null }}
            />
          )
        )
      }
      return <ZBCShortAddress address={text} href={`/accounts/${text}`} title="sender address" />
    },
  },
  {
    title: <Title text="recipient" />,
    dataIndex: 'RecipientFormatted',
    key: 'RecipientFormatted',
    // width: 180,
    render(text, record) {
      const path = window.location.pathname
      if (path.search('accounts') === 1) {
        const accountAddress = path.split('/')[2]

        const isRecipient = record.RecipientFormatted === accountAddress

        return (
          !!text && (
            <ZBCShortAddress
              address={text}
              href={`/accounts/${text}`}
              title="recipient address"
              style={{
                fontWeight: isRecipient ? 'bold' : null,
                color: isRecipient ? 'green' : null,
              }}
            />
          )
        )
      }
      return <ZBCShortAddress address={text} href={`/accounts/${text}`} title="recipient address" />
    },
  },
  {
    title: <Title text="amount" />,
    dataIndex: 'Amount',
    key: 'Amount',
    width: 150,
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
    width: 150,
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
    dataIndex: 'NodePublicKeyFormatted',
    key: 'NodePublicKeyFormatted',
    render(text) {
      return (
        !!text && <ZBCShortAddress address={text} href={`/nodes/${text}`} title="node public key" />
      )
    },
    width: 200,
  },
  {
    title: <Title text="owner address" />,
    dataIndex: 'OwnerAddressFormatted',
    key: 'OwnerAddressFormatted',
    render(text) {
      return (
        !!text && (
          <ZBCShortAddress address={text} href={`/accounts/${text}`} title="owner address" />
        )
      )
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
          <ZBCShortAddress address={text} href={`/accounts/${text}`} title="sender public key" />
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
          <ZBCShortAddress address={text} href={`/accounts/${text}`} title="recipient public key" />
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
    dataIndex: 'BlocksmithPublicKeyFormatted',
    key: 'BlocksmithPublicKeyFormatted',
    render(text) {
      return (
        !!text && <ZBCShortAddress address={text} href={`/nodes/${text}`} title="node public key" />
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
          title="transaction hash"
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
      return <ZBCShortAddress address={text} href={`/accounts/${text}`} title="account address" />
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
          className="page-title monospace-text"
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
    dataIndex: 'NodePublicKeyFormatted',
    key: 'NodePublicKeyFormatted',
    render(text) {
      // return !!text && <Link to={`/nodes/${text}`}>{shortenHash(text, 30)}</Link>
      return (
        !!text && <ZBCShortAddress address={text} href={`/nodes/${text}`} title="node public key" />
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
