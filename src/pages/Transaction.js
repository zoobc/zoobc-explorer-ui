import React from 'react'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import { Row, Col, Card } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery, gql } from '@apollo/client'

import Container from '../components/Container'
import DescItem from '../components/DescItem'
import CopyToClipboard from '../components/CopyToClipboard'
import NotFound from '../components/Errors/NotFound'
import LoaderPage from '../components/LoaderPage'
import {
  SendMoney,
  NodeRegistration,
  RemoveNodeRegistration,
  ClaimNodeRegistration,
  SetupAccount,
  RemoveAccount,
  UpdateNodeRegistration,
  MultiSignature,
  EscrowApproval,
  EscrowTransaction,
  MultisigTransaction,
} from '../components/TransactionTypes'

const GET_TRX_DATA = gql`
  query getTransaction($TrxID: String!) {
    transaction(TransactionID: $TrxID) {
      TransactionID
      TransactionHashFormatted
      Timestamp
      TransactionType
      TransactionTypeName
      BlockID
      Height
      Sender
      Recipient
      FeeConversion
      Status
      SendMoney {
        Amount
        AmountConversion
      }
      NodeRegistration {
        NodePublicKey
        AccountAddress
        NodeAddress {
          Address
          Port
        }
        LockedBalance
        LockedBalanceConversion
        ProofOfOwnership {
          MessageBytes
          Signature
        }
      }
      UpdateNodeRegistration {
        NodePublicKey
        NodeAddress {
          Address
          Port
        }
        LockedBalance
        LockedBalanceConversion
        ProofOfOwnership {
          MessageBytes
          Signature
        }
      }
      RemoveNodeRegistration {
        NodePublicKey
      }
      ClaimNodeRegistration {
        NodePublicKey
        ProofOfOwnership {
          MessageBytes
          Signature
        }
      }
      SetupAccount {
        SetterAccountAddress
        RecipientAccountAddress
        Property
        Value
      }
      RemoveAccount {
        SetterAccountAddress
        RecipientAccountAddress
        Property
        Value
      }
      MultiSignature {
        MultiSignatureInfo {
          MinimumSignatures
          Nonce
          Addresses
          MultisigAddress
          BlockHeight
          Latest
        }
        UnsignedTransactionBytes
        SignatureInfo {
          TransactionHash
          Signatures {
            Address
            Signature
          }
        }
      }
      TransactionHash
      MultisigChild
      ApprovalEscrow {
        TransactionID
        Approval
      }
      Escrow {
        SenderAddress
        RecipientAddress
        ApproverAddress
        AmountConversion
        CommissionConversion
        Timeout
        Status
        BlockHeight
        Latest
        Instruction
      }
      MultiSignatureTransactions {
        TransactionID
        BlockID
        Height
        Timestamp
        TransactionTypeName
        Sender
        Recipient
        FeeConversion
      }
      EscrowTransaction {
        TransactionID
        BlockID
      }
    }
  }
`

const TransactionType = ({ trx }) => {
  switch (trx.TransactionType) {
    case 1:
      return (
        <>
          <SendMoney data={trx.SendMoney} />
          {trx.Escrow && (
            <EscrowTransaction
              data={trx.Escrow}
              blockID={!!trx.EscrowTransaction && trx.EscrowTransaction.BlockID}
              TransactionID={!!trx.EscrowTransaction && trx.EscrowTransaction.TransactionID}
            />
          )}
          {trx.MultisigChild && (
            <>
              <MultiSignature data={trx.MultiSignature} disableTrxHashLink={true} />
              <MultisigTransaction data={trx.MultiSignatureTransactions} />
            </>
          )}
        </>
      )
    case 4:
      return (
        <>
          <EscrowApproval data={trx.ApprovalEscrow} />
          <EscrowTransaction data={trx.Escrow} blockID={trx.BlockID} />
        </>
      )
    case 2:
      return <NodeRegistration data={trx.NodeRegistration} />
    case 258:
      return <UpdateNodeRegistration data={trx.UpdateNodeRegistration} />
    case 514:
      return <RemoveNodeRegistration data={trx.RemoveNodeRegistration} />
    case 770:
      return <ClaimNodeRegistration data={trx.ClaimNodeRegistration} />
    case 3:
      return <SetupAccount data={trx.SetupAccount} />
    case 259:
      return <RemoveAccount data={trx.RemoveAccount} />
    case 5:
      return <MultiSignature data={trx.MultiSignature} />
    default:
      return null
  }
}

const Transaction = ({ match }) => {
  const { t } = useTranslation()
  const { params } = match
  const { loading, data, error } = useQuery(GET_TRX_DATA, {
    variables: {
      TrxID: params.id,
    },
  })

  return (
    <>
      {!!error && <NotFound />}
      {!!loading && <LoaderPage />}
      {!!data &&
        (data.transaction.TransactionID ? (
          <Container>
            <Row className="transaction-row">
              <Col span={24}>
                <Row>
                  <Col span={24}>
                    <h4 className="truncate page-title">
                      {t('transaction')} {data.transaction.TransactionID}
                    </h4>
                  </Col>
                </Row>
                <Card className="transaction-card" bordered={false}>
                  <h4 className="transaction-card-title page-title">{t('summary')}</h4>
                  <DescItem
                    label={t('transaction hash')}
                    style={{ display: 'none' }}
                    value={
                      <CopyToClipboard
                        text={data.transaction.TransactionHashFormatted}
                        keyID="TransactionHashFormatted"
                      />
                    }
                  />
                  <DescItem
                    label={t('transaction id')}
                    text={t(
                      'an identifier which facilitates easy identification of transactions on the zoobc blockchain'
                    )}
                    value={
                      <CopyToClipboard
                        text={data.transaction.TransactionID}
                        keyID="TransactionID"
                      />
                    }
                  />
                  <DescItem
                    label={t('timestamp')}
                    style={{ display: 'none' }}
                    value={moment(data.transaction.Timestamp).format('lll')}
                  />
                  <DescItem
                    label="transaction type"
                    style={{ display: 'none' }}
                    value={data.transaction.TransactionTypeName}
                  />
                  <DescItem
                    label={t('block id')}
                    text={t(
                      'an identifier which facilitates easy identification of blocks on the zoobc blockchain'
                    )}
                    value={
                      <Link to={`/blocks/${data.transaction.BlockID}`}>
                        {data.transaction.BlockID}
                      </Link>
                    }
                  />
                  <DescItem
                    label={t('height')}
                    text={t(
                      'the position of the block in the zoobc blockchain. for example, height 0, would be the very first block, which is also called the genesis block'
                    )}
                    value={
                      <Link to={`/blocks/${data.transaction.BlockID}`}>
                        {data.transaction.Height}
                      </Link>
                    }
                  />
                  <DescItem
                    label={t('sender')}
                    style={{ display: 'none' }}
                    value={
                      <Link to={`/accounts/${data.transaction.Sender}`}>
                        {data.transaction.Sender}
                      </Link>
                    }
                  />
                  <DescItem
                    label={t('recipient')}
                    style={{ display: 'none' }}
                    value={
                      <Link to={`/accounts/${data.transaction.Recipient}`}>
                        {data.transaction.Recipient}
                      </Link>
                    }
                  />
                  {/* <DescItem label={t('confirmations')} value={data.transaction.Confirmations} /> */}
                  <DescItem
                    label={t('fees')}
                    style={{ display: 'none' }}
                    value={
                      <NumberFormat
                        value={data.transaction.FeeConversion || 0}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' ZBC'}
                      />
                    }
                  />
                  <DescItem
                    label={t('status')}
                    style={{ display: 'none' }}
                    value={data.transaction.Status}
                  />
                  {data.transaction.MultisigChild && (
                    <DescItem
                      label={t('transaction hash')}
                      style={{ display: 'none' }}
                      value={data.transaction.TransactionHash}
                    />
                  )}
                </Card>
                <TransactionType trx={data.transaction} />
              </Col>
            </Row>
          </Container>
        ) : (
          <NotFound />
        ))}
    </>
  )
}

export default Transaction
