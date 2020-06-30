import React from 'react'
import { Card, Table } from 'antd'
import { useTranslation } from 'react-i18next'
import { transactionColumns } from '../../config/table-columns'

const MultisigTransaction = ({ data }) => {
  const { t } = useTranslation()
  return (
    <Card className="transaction-card">
      <h4 className="transaction-card-title">{t('Multi Signature Transaction')}</h4>
      <Table
        className="transactions-table"
        columns={transactionColumns}
        dataSource={data}
        pagination={false}
        size="small"
        scroll={{ x: 1300 }}
        rowKey="TransactionID"
      />
    </Card>
  )
}

export default MultisigTransaction
