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
      <h4 className="transaction-card-title page-title">{t('multisignature info')}</h4>
      {MultiSignatureInfo && (
        <>
          <DescItem
            label="Minimum Signature"
            style={{ display: 'none' }}
            value={MultiSignatureInfo.MinimumSignatures}
          />
          <DescItem label="Nonce" style={{ display: 'none' }} value={MultiSignatureInfo.Nonce} />
          <DescItem
            label="Block Height"
            text="The position of the block in the ZooBC blockchain. For example, Height 0, would be the very first block, which is also called the Genesis Block"
            value={MultiSignatureInfo.BlockHeight}
          />
          <DescItem
            label="Multisig Address"
            style={{ display: 'none' }}
            value={MultiSignatureInfo.MultisigAddress}
          />
        </>
      )}
      {UnsignedTransactionBytes && (
        <>
          <DescItem
            label="Unsigned Transaction Bytes"
            style={{ display: 'none' }}
            value={UnsignedTransactionBytes}
          />
        </>
      )}
      {SignatureInfo && (
        <>
          <DescItem
            label={t('transaction hash')}
            style={{ display: 'none' }}
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
          <h5>{t('participants')}</h5>
          {SignatureInfo.Signatures &&
            SignatureInfo.Signatures.map((data, key) => (
              <DescItem
                key={key}
                label={`Participant ${key + 1}`}
                style={{ display: 'none' }}
                value={<Link to={`/accounts/${data.Address}`}>{data.Address}</Link>}
              />
            ))}
        </>
      )}
    </Card>
  )
}

export default MultiSignature
