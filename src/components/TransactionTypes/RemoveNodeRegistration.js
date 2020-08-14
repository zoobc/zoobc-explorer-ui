import React from 'react'
import { Card } from 'antd'
import DescItem from '../DescItem'
import { useTranslation } from 'react-i18next'

const RemoveNodeRegistration = ({ data }) => {
  const { t } = useTranslation()
  return (
    <Card className="transaction-card">
      <h4 className="transaction-card-title page-title">{t('remove node registration')}</h4>
      <DescItem
        label={t('node public key')}
        text="A string of letters and numbers that are used to receive amount of ZooBC. Works similar to a traditional bank account number and can be shared publicly with others"
        value={data.NodePublicKey}
      />
    </Card>
  )
}

export default RemoveNodeRegistration
