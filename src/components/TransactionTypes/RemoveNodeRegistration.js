import React from 'react'
import { Card } from 'antd'
import DescItem from '../DescItem'
import { useTranslation } from 'react-i18next'

const RemoveNodeRegistration = ({ data }) => {
  const { t } = useTranslation()
  return (
    <Card className="transaction-card">
      <h4 className="transaction-card-title">{t('remove node registration')}</h4>
      <DescItem label={t('node public key')} value={data.NodePublicKey} />
    </Card>
  )
}

export default RemoveNodeRegistration
