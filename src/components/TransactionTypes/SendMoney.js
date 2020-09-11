import React from 'react'
import { Card } from 'antd'
import NumberFormat from 'react-number-format'
import { useTranslation } from 'react-i18next'

import DescItem from '../DescItem'

const SendMoney = ({ data }) => {
  const { t } = useTranslation()
  return (
    <Card className="transaction-card">
      <h4 className="transaction-card-title page-title">{t('send money')}</h4>
      <DescItem
        label="amount"
        style={{ display: 'none' }}
        value={
          <NumberFormat
            value={data.AmountConversion || 0}
            displayType={'text'}
            thousandSeparator={true}
            suffix={' ZBC'}
            className="monospace-text"
          />
        }
      />
    </Card>
  )
}

export default SendMoney
