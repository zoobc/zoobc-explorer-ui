/**
 * ZooBC Copyright (C) 2020 Quasisoft Limited - Hong Kong
 * This file is part of ZooBC <https://github.com/zoobc/zoobc-explorer-ui>

 * ZooBC is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * ZooBC is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with ZooBC.  If not, see <http://www.gnu.org/licenses/>.

 * Additional Permission Under GNU GPL Version 3 section 7.
 * As the special exception permitted under Section 7b, c and e,
 * in respect with the Author’s copyright, please refer to this section:

 * 1. You are free to convey this Program according to GNU GPL Version 3,
 *     as long as you respect and comply with the Author’s copyright by
 *     showing in its user interface an Appropriate Notice that the derivate
 *     program and its source code are “powered by ZooBC”.
 *     This is an acknowledgement for the copyright holder, ZooBC,
 *     as the implementation of appreciation of the exclusive right of the
 *     creator and to avoid any circumvention on the rights under trademark
 *     law for use of some trade names, trademarks, or service marks.

 * 2. Complying to the GNU GPL Version 3, you may distribute
 *     the program without any permission from the Author.
 *     However a prior notification to the authors will be appreciated.

 * ZooBC is architected by Roberto Capodieci & Barton Johnston
 * contact us at roberto.capodieci[at]blockchainzoo.com
 * and barton.johnston[at]blockchainzoo.com

 * IMPORTANT: The above copyright notice and this permission notice
 * shall be included in all copies or substantial portions of the Software.
**/

import React, { useState } from 'react'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import { Row, Col, Card, Collapse } from 'antd'
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
      SenderFormatted
      Recipient
      RecipientFormatted
      FeeConversion
      Status
      SendMoney {
        Amount
        AmountConversion
      }
      NodeRegistration {
        NodePublicKey
        NodePublicKeyFormatted
        AccountAddress
        AccountAddressFormatted
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
        NodePublicKeyFormatted
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
        NodePublicKeyFormatted
      }
      ClaimNodeRegistration {
        NodePublicKey
        NodePublicKeyFormatted
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
          AddressesFormatted
          MultisigAddress
          MultisigAddressFormatted
          BlockHeight
          Latest
        }
        UnsignedTransactionBytes
        SignatureInfo {
          TransactionHash
          TransactionHashFormatted
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
        SenderAddressFormatted
        RecipientAddress
        RecipientAddressFormatted
        ApproverAddress
        ApproverAddressFormatted
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
        TransactionHashFormatted
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
          {trx.MultisigChild && trx.MultiSignature && (
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

const { Panel } = Collapse

const Transaction = ({ match }) => {
  const { t } = useTranslation()
  const { params } = match
  const [label, setLabel] = useState('show more')

  const { loading, data, error } = useQuery(GET_TRX_DATA, {
    variables: {
      TrxID: params.id,
    },
  })

  const onChange = val => {
    if (val && val.length > 0) setLabel('hide detail')
    else setLabel('show detail')
  }

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
                    label={t('sender')}
                    style={{ display: 'none' }}
                    value={
                      <Link to={`/accounts/${data.transaction.SenderFormatted}`}>
                        {data.transaction.SenderFormatted}
                      </Link>
                    }
                    textClassName="monospace-text"
                  />
                  <DescItem
                    label={t('recipient')}
                    style={{ display: 'none' }}
                    value={
                      <Link to={`/accounts/${data.transaction.RecipientFormatted}`}>
                        {data.transaction.RecipientFormatted}
                      </Link>
                    }
                    textClassName="monospace-text"
                  />
                  <Collapse
                    bordered={false}
                    className="site-collapse-custom-collapse"
                    onChange={onChange}
                  >
                    <Panel showArrow={false} header={label} key="1" className="text-collapse">
                      <DescItem
                        label={t('transaction hash')}
                        style={{ display: 'none' }}
                        value={
                          <CopyToClipboard
                            text={data.transaction.TransactionHashFormatted}
                            keyID="TransactionHashFormatted"
                          />
                        }
                        textClassName="monospace-text"
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
                          <Link to={`/blocks/${data.transaction.Height}`}>
                            {data.transaction.Height}
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
                            className="monospace-text"
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
                    </Panel>
                  </Collapse>
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
