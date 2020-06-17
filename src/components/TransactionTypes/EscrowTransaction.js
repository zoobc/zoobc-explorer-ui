import React from 'react'
import { Card } from 'antd'
import { useTranslation } from 'react-i18next'

import DescItem from '../DescItem'
import { Link } from 'react-router-dom'

const EscrowTransaction = ({ data }) => {
  const { t } = useTranslation()
  return (
    <Card className="transaction-card">
      <h4 className="transaction-card-title">{t('Escrow Transaction')}</h4>

      <DescItem
        label={t('Sender')}
        value={<Link to={`/accounts/${data.SenderAddress}`}>{data.SenderAddress}</Link>}
      />
      <DescItem
        label={t('Recipient')}
        value={<Link to={`/accounts/${data.RecipientAddress}`}>{data.RecipientAddress}</Link>}
      />
      <DescItem
        label={t('Approver')}
        value={<Link to={`/accounts/${data.ApproverAddress}`}>{data.ApproverAddress}</Link>}
      />

      <DescItem label={t('Timeout')} value={data.Timeout} />
      <DescItem
        label={t('Block Height')}
        value={<Link to={`/blocks/${data.BlockHeight}`}>{data.BlockHeight}</Link>}
      />
      <DescItem label={t('Instruction')} value={data.Instruction} />
    </Card>
  )
}

export default EscrowTransaction
