import React from 'react'
import { Card } from 'antd'
import { useTranslation } from 'react-i18next'

import DescItem from '../DescItem'

const MultiSignature = ({ data }) => {
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
          <DescItem label="Transaction Hash" value={SignatureInfo.TransactionHash} />
          <br />
          <h5>{t('Signatures')}</h5>
          {SignatureInfo.Signatures &&
            SignatureInfo.Signatures.map((data, key) => (
              <DescItem key={key} label={`Signature ${key + 1}`} value={data.Signature} />
            ))}
        </>
      )}
    </Card>
  )
}

export default MultiSignature
