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
        <h4 className="transaction-card-title">{t('Summary Approval Escrow')}</h4>
        <DescItem label="Approve" value={data.Approval} />
        <DescItem
          label={t('TransactionID')}
          value={<Link to={`/transactions/${data.TransactionID}`}>{data.TransactionID}</Link>}
        />
      </Card>
    </>
  )
}

export default EscrowApproval
