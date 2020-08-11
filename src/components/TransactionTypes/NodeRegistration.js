import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import DescItem from '../DescItem'
import { useTranslation } from 'react-i18next'

const NodeRegistration = ({ data }) => {
  const { t } = useTranslation()
  return (
    <Card className="transaction-card">
      <h4 className="transaction-card-title page-title">{t('node registration')}</h4>
      <DescItem label={t('node address')} value={data.NodeAddress.Address} />
      <DescItem
        label={t('account address')}
        value={<Link to={`/accounts/${data.AccountAddress}`}>{data.AccountAddress}</Link>}
      />
      <DescItem
        label={t('node public key')}
        value={<Link to={`/nodes/${data.NodePublicKey}`}>{data.NodePublicKey}</Link>}
      />
      <DescItem
        label={t('locked balance')}
        value={
          <NumberFormat
            value={data.LockedBalanceConversion || 0}
            displayType={'text'}
            thousandSeparator={true}
            suffix={' ZBC'}
          />
        }
      />
      <DescItem
        label={t('poow message bytes')}
        value={data.ProofOfOwnership && data.ProofOfOwnership.MessageBytes}
      />
      <DescItem
        label={t('poow signature')}
        value={data.ProofOfOwnership && data.ProofOfOwnership.Signature}
      />
    </Card>
  )
}

export default NodeRegistration
