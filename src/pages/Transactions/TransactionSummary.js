import React, { useState } from 'react'
import { Table, Container, Tooltip, Card, CardBody, CardTitle } from 'reactstrap'
import { Query } from 'react-apollo'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useTranslation } from 'react-i18next'

import { TransactionsQuery } from './../../schemas'
import Loader from '../../components/Loader'
import NotFound from '../Errors/NotFound'
import ServerError from '../Errors/ServerError'

export default function TransactionSummary(props) {
  const [copyTooltip, setCopyTooltip] = useState(false)
  const [tooltipMessage, setTooltipMessage] = useState('Click to copy')
  const { t } = useTranslation()
  return (
    <Query query={TransactionsQuery}>
      {result => {
        if (result.loading) return <Loader />
        if (result.error) return <ServerError />
        const { transactions = [] } = result.data
        const transactionID = props.match.params.id
        const detailTransactions = transactions.filter(i => i.ID === transactionID)
        const detailTransaction = Array.isArray(detailTransactions)
          ? detailTransactions[0]
          : detailTransactions

        if (!detailTransaction) return <NotFound />

        return (
          <Container className="px-2 mb-4 mt-5">
            <Card className="card">
              <CardBody>
                <CardTitle className="list-title pl-2 pb-4">{t('Transaction Summary')}</CardTitle>
                <Table striped borderless responsive>
                  <tbody>
                    <tr>
                      <td>{t('Transaction ID')}</td>
                      <td>{detailTransaction.ID}</td>
                    </tr>
                    <tr>
                      <td>{t('Block ID')}</td>
                      <td>{detailTransaction.BlockID}</td>
                    </tr>
                    <tr>
                      <td>{t('Deadline')}</td>
                      <td>{detailTransaction.Deadline}</td>
                    </tr>
                    <tr>
                      <td>{t('Sender PublicKey')}</td>
                      <td>{detailTransaction.SenderPublicKey}</td>
                    </tr>
                    <tr>
                      <td>{t('Recipient PublicKey')}</td>
                      <td>{detailTransaction.RecipientPublicKey}</td>
                    </tr>
                    <tr>
                      <td>{t('Amount')}</td>
                      <td>{detailTransaction.AmountNQT}</td>
                    </tr>
                    <tr>
                      <td>{t('Fee')}</td>
                      <td>{detailTransaction.FeeNQT}</td>
                    </tr>
                    <tr>
                      <td>{t('EC BlockHeight')}</td>
                      <td>{detailTransaction.EcBlockHeight}</td>
                    </tr>
                    <tr>
                      <td>{t('EC BlockID')}</td>
                      <td>{detailTransaction.EcBlockID}</td>
                    </tr>
                    <tr>
                      <td>{t('Version')}</td>
                      <td>{detailTransaction.Version}</td>
                    </tr>
                    <tr>
                      <td>{t('Timestamp')}</td>
                      <td>{detailTransaction.Timestamp}</td>
                    </tr>
                    <tr>
                      <td>{t('Signature')}</td>
                      <td>{detailTransaction.Signature}</td>
                    </tr>
                    <tr>
                      <td>{t('Type')}</td>
                      <td>{detailTransaction.Type}</td>
                    </tr>
                    <tr>
                      <td>{t('Height')}</td>
                      <td>{detailTransaction.Height}</td>
                    </tr>
                    <tr>
                      <td>{t('Hash')}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          {detailTransaction.Hash}
                          <CopyToClipboard text={detailTransaction.Hash}>
                            <i
                              className="fa fa-copy ml-2 clipboard-copy"
                              id="TooltipExample"
                              onClick={() => {
                                setTooltipMessage(t('Copied to clipboard'))
                                setTimeout(() => {
                                  setTooltipMessage(t('Click to copy'))
                                }, 500)
                              }}
                            />
                          </CopyToClipboard>
                          <Tooltip
                            delay={{ hide: 300 }}
                            placement="top-start"
                            isOpen={copyTooltip}
                            target={'TooltipExample'}
                            toggle={() => setCopyTooltip(!copyTooltip)}
                          >
                            {tooltipMessage}
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Container>
        )
      }}
    </Query>
  )
}
