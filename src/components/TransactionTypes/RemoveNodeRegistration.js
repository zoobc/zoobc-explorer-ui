import React from 'react'
import { Card } from 'antd'
import DescItem from '../DescItem'
import { useTranslation } from 'react-i18next'

const RemoveNodeRegistration = ({ data }) => {
  const { t } = useTranslation()
  return (
    <Card className="transaction-card">
      <h4 className="transaction-card-title">{t('Remove Node Registration')}</h4>
      <DescItem label={t('Node Public Key')} value={data.NodePublicKey} />
    </Card>
  )
}

export default RemoveNodeRegistration
