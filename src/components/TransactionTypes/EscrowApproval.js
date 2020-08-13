import React from 'react'
import { Card } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import DescItem from '../DescItem'
const EscrowApproval = ({ data }) => {
  const { t } = useTranslation()
  return (
    <>
      <Card className="transaction-card">
        <h4 className="transaction-card-title page-title">{t('summary approval escrow')}</h4>
        <DescItem label="Status" style={{ display: 'none' }} value={data.Approval} />
        <DescItem
          label={t('transaction id')}
          text="An identifier which failitates easy identification of transactions on the ZooBC blockchain"
          value={<Link to={`/transactions/${data.TransactionID}`}>{data.TransactionID}</Link>}
        />
      </Card>
    </>
  )
}

export default EscrowApproval
