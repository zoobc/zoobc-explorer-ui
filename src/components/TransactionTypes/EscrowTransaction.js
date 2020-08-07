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
      <h4 className="transaction-card-title">{t('escrow transaction')}</h4>

      {!!TransactionID && (
        <DescItem
          label={t('transaction id')}
          value={<Link to={`/transactions/${TransactionID}`}>{TransactionID}</Link>}
        />
      )}

      <DescItem
        label={t('sender')}
        value={<Link to={`/accounts/${data.SenderAddress}`}>{data.SenderAddress}</Link>}
      />
      <DescItem
        label={t('recipient')}
        value={<Link to={`/accounts/${data.RecipientAddress}`}>{data.RecipientAddress}</Link>}
      />
      <DescItem
        label={t('approver')}
        value={<Link to={`/accounts/${data.ApproverAddress}`}>{data.ApproverAddress}</Link>}
      />
      <DescItem
        label={t('commission Fee')}
        value={
          <NumberFormat
            value={data.CommissionConversion || 0}
            displayType={'text'}
            thousandSeparator={true}
            suffix={' ZBC'}
          />
        }
      />
      <DescItem label={t('timeout')} value={data.Timeout} />
      <DescItem
        label={t('block height')}
        value={<Link to={`/blocks/${blockID}`}>{data.BlockHeight}</Link>}
      />
      <DescItem label={t('instruction')} value={data.Instruction} />
    </Card>
  )
}

export default EscrowTransaction
