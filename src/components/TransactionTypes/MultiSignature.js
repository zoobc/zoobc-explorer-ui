import React from 'react'
import { Card } from 'antd'
import { useTranslation } from 'react-i18next'

import DescItem from '../DescItem'
import { Link } from 'react-router-dom'

const MultiSignature = ({ data, disableTrxHashLink }) => {
  const { t } = useTranslation()
  const { MultiSignatureInfo, SignatureInfo, UnsignedTransactionBytes } = data
  return (
    <Card className="transaction-card">
      <h4 className="transaction-card-title">{t('Multi Signature Info')}</h4>
      {MultiSignatureInfo && (
        <>
          <DescItem label="Minimum Signature" value={MultiSignatureInfo.MinimumSignatures} />
          <DescItem label="Nonce" value={MultiSignatureInfo.Nonce} />
          <DescItem label="Block Height" value={MultiSignatureInfo.BlockHeight} />
          <DescItem label="Multisig Address" value={MultiSignatureInfo.MultisigAddress} />
        </>
      )}
      {UnsignedTransactionBytes && (
        <>
          <DescItem label="Unsigned Transaction Bytes" value={UnsignedTransactionBytes} />
        </>
      )}
      {SignatureInfo && (
        <>
          <DescItem
            label={t('Transaction Hash')}
            value={
              !!disableTrxHashLink ? (
                SignatureInfo.TransactionHash
              ) : (
                <Link to={`/transactions/${SignatureInfo.TransactionHash}`}>
                  {SignatureInfo.TransactionHash}
                </Link>
              )
            }
          />
          <br />
          <h5>{t('Participants')}</h5>
          {SignatureInfo.Signatures &&
            SignatureInfo.Signatures.map((data, key) => (
              <DescItem
                key={key}
                label={`Participant ${key + 1}`}
                value={<Link to={`/accounts/${data.Address}`}>{data.Address}</Link>}
              />
            ))}
        </>
      )}
    </Card>
  )
}

export default MultiSignature
