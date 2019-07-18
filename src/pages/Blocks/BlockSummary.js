import React, { useState } from 'react'
import { Table, Container, Tooltip, Card, CardBody, CardTitle } from 'reactstrap'
import { Query } from 'react-apollo'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useTranslation } from 'react-i18next'

import { BlocksQuery } from './../../schemas'
import Loader from '../../components/Loader'
import NotFound from '../Errors/NotFound'
import ServerError from '../Errors/ServerError'

export default function BlockSummary(props) {
  const [copyTooltip, setCopyTooltip] = useState(false)
  const [tooltipMessage, setTooltipMessage] = useState('Click to copy')
  const { t } = useTranslation()

  return (
    <Query query={BlocksQuery}>
      {result => {
        if (result.loading) return <Loader />
        if (result.error) return <ServerError />
        const { Blocks = null } = result.data.block
        const blockID = props.match.params.id
        const detailBlocks = Blocks.filter(i => i.ID === blockID)
        const detailBlock = Array.isArray(detailBlocks) ? detailBlocks[0] : detailBlocks

        if (!detailBlock) return <NotFound />
        return (
          <Container id="blocks" className="px-2 mb-4 mt-5">
            <Card className="card">
              <CardBody>
                <CardTitle className="list-title pl-2 pb-4">
                  {t('Block Summary')} #{detailBlock.Height}
                </CardTitle>
                <Table striped borderless responsive>
                  <tbody>
                    <tr>
                      <td>Block ID</td>
                      <td>{detailBlock.ID}</td>
                    </tr>
                    <tr>
                      <td>{t('Hash')}</td>
                      <td>
                        {detailBlock.Hash}
                        <CopyToClipboard text={detailBlock.Hash}>
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
                      </td>
                    </tr>
                    <tr>
                      <td>{t('Height')}</td>
                      <td>{detailBlock.Height}</td>
                    </tr>
                    <tr>
                      <td>{t('Timestamp')}</td>
                      <td>{detailBlock.Timestamp}</td>
                    </tr>
                    <tr>
                      <td>{t('Generator')}</td>
                      <td>{detailBlock.Generator}</td>
                    </tr>
                    <tr>
                      <td>{t('Amount')}</td>
                      <td>{detailBlock.TotalAmountNQT}</td>
                    </tr>
                    <tr>
                      <td>{t('Fee')}</td>
                      <td>{detailBlock.TotalFeeNQT}</td>
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
