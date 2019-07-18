import React from 'react'
import {
  Table,
  Col,
  Card,
  CardBody,
  CardTitle,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

const accountTxs = [
  {
    id: '7036180541117545913',
    timestamp: '09-Feb-2018 13:05:26',
    target: 'BCZ-97H4-KRWL-A53G-7GVRG',
    type: 'Payment',
    ammount: 200,
    fee: 1,
  },
  {
    id: '15723364488286549477',
    timestamp: '09-Feb-2018 13:05:26',
    target: 'BCZ-BQMX-G4PF-NV6Z-EGQC4',
    type: 'Message',
    ammount: 0,
    fee: 1,
  },
  {
    id: '8436615458940067488',
    timestamp: '09-Feb-2018 13:05:26',
    target: 'BCZ-97H4-KRWL-A53G-7GVRG',
    type: 'Payment',
    ammount: 200,
    fee: 1,
  },
  {
    id: '17750548496334472372',
    timestamp: '09-Feb-2018 13:05:26',
    target: 'BCZ-FCTW-8JH3-JDEB-58TU6',
    type: 'Payment',
    ammount: 200,
    fee: 1,
  },
  {
    id: '7036180541117545913',
    timestamp: '09-Feb-2018 13:05:26',
    target: 'BCZ-2CUM-PG8U-FLGD-A43V8',
    type: 'Message',
    ammount: 0,
    fee: 1,
  },
  {
    id: '17750548496334472372',
    timestamp: '09-Feb-2018 13:05:26',
    target: 'BCZ-VNAR-RJ74-GJH7-6S9CW',
    type: 'Payment',
    ammount: 200,
    fee: 1,
  },
  {
    id: '2725692492314864071',
    timestamp: '09-Feb-2018 13:05:26',
    target: 'BCZ-P5V4-PQJ3-SF4Z-HYGHK',
    type: 'Payment',
    ammount: 200,
    fee: 1,
  },
]
function LatestTransactions(props) {
  const { t } = props
  return (
    <Col className="pl-0" lg={{ size: 8 }}>
      <Card className="card">
        <CardBody>
          <CardTitle className="list-title pl-2">{t('Latest transactions')}</CardTitle>
          <Table striped borderless responsive>
            <thead>
              <tr>
                <th>{t('ID Transaction')}</th>
                <th>{t('Timestamp')}</th>
                <th>{t('Sender/Recipient')}</th>
                <th>{t('Type')}</th>
                <th>{t('Amt + Fee')}</th>
              </tr>
            </thead>
            <tbody>
              {accountTxs.map((d, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <Link to="#">{d.id}</Link>
                    </td>
                    <td>{d.timestamp}</td>
                    <td>
                      <Link to="#">{d.target}</Link>
                    </td>
                    <td>{d.type}</td>
                    <td>{`${d.ammount} + ${d.fee}`}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <Pagination className="ml-auto">
            <PaginationItem>
              <PaginationLink previous tag={Link} to="#" />
            </PaginationItem>
            {[1, 2, 3].map((d, i) => {
              return (
                <PaginationItem key={i}>
                  <PaginationLink tag={Link} to="#">
                    {d}
                  </PaginationLink>
                </PaginationItem>
              )
            })}
            <PaginationItem>
              <PaginationLink next tag={Link} to="#" />
            </PaginationItem>
          </Pagination>
        </CardBody>
      </Card>
    </Col>
  )
}

export default withTranslation()(LatestTransactions)
