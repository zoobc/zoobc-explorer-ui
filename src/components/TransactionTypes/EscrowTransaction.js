import React from 'react'
import { Card } from 'antd'
import { useTranslation } from 'react-i18next'
import NumberFormat from 'react-number-format'

import DescItem from '../DescItem'
import { Link } from 'react-router-dom'

const EscrowTransaction = ({ data, blockID, TransactionID }) => {
  const { t } = useTranslation()
  return (
    <Card className="transaction-card">
      <h4 className="transaction-card-title page-title">{t('escrow transaction')}</h4>

      {!!TransactionID && (
        <DescItem
          label={t('transaction id')}
          text="An identifier which failitates easy identification of transactions on the ZooBC blockchain"
          value={<Link to={`/transactions/${TransactionID}`}>{TransactionID}</Link>}
        />
      )}

      <DescItem
        label={t('sender')}
        style={{ display: 'none' }}
        value={<Link to={`/accounts/${data.SenderAddress}`}>{data.SenderAddress}</Link>}
      />
      <DescItem
        label={t('recipient')}
        style={{ display: 'none' }}
        value={<Link to={`/accounts/${data.RecipientAddress}`}>{data.RecipientAddress}</Link>}
      />
      <DescItem
        label={t('approver')}
        style={{ display: 'none' }}
        value={<Link to={`/accounts/${data.ApproverAddress}`}>{data.ApproverAddress}</Link>}
      />
      <DescItem
        label={t('commission Fee')}
        style={{ display: 'none' }}
        value={
          <NumberFormat
            value={data.CommissionConversion || 0}
            displayType={'text'}
            thousandSeparator={true}
            suffix={' ZBC'}
          />
        }
      />
      <DescItem label={t('timeout')} style={{ display: 'none' }} value={data.Timeout} />
      <DescItem
        label={t('block height')}
        text="The position of the block in the ZooBC blockchain. For example, Height 0, would be the very first block, which is also called the Genesis Block"
        value={<Link to={`/blocks/${blockID}`}>{data.BlockHeight}</Link>}
      />
      <DescItem label={t('instruction')} style={{ display: 'none' }} value={data.Instruction} />
    </Card>
  )
}

export default EscrowTransaction
