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

import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { useQuery, gql } from '@apollo/client'
import { Row, Col, PageHeader, Button, Table, Card } from 'antd'

import Container from '../../../components/Container'

const QUERY_DASHBOARD = gql`
  query dashboard {
    dashboard {
      Success
      Message
      Data {
        TotalBlock
        TotalTransaction
        TotalAccount
        TotalNode
        KeywordSeen {
          Keyword
          Seen
        }
        AdminLogs {
          Admin {
            Identifier
          }
          Host
          UserAgent
          LoginAt
        }
      }
    }
  }
`

export default () => {
  const { t } = useTranslation()

  const [keywords, setKeywords] = useState([])
  const [adminLogs, setAdminLogs] = useState([])

  const { loading, data, error, refetch, networkStatus } = useQuery(QUERY_DASHBOARD, {
    notifyOnNetworkStatusChange: true,
  })

  const Title = ({ text }) => {
    return t(text)
  }

  const DateFormat = ({ date }) => {
    return date ? moment(date).format('DD/MM/YY @ H:mm:ss') : null
  }

  const keywordColumns = [
    {
      title: <Title text="keyword" />,
      dataIndex: 'Keyword',
      key: 'Keyword',
    },
    {
      title: <Title text="seen" />,
      dataIndex: 'Seen',
      key: 'Seen',
    },
  ]

  const logColumns = [
    // {
    //   title: <Title text="identifier" />,
    //   dataIndex: 'Identifier',
    //   key: 'Identifier',
    // },
    {
      title: <Title text="host" />,
      dataIndex: 'Host',
      key: 'Host',
    },
    {
      title: <Title text="user agent" />,
      dataIndex: 'UserAgent',
      key: 'UserAgent',
    },
    {
      title: <Title text="login at" />,
      dataIndex: 'LoginAt',
      key: 'LoginAt',
      render: val => <DateFormat date={val} />,
    },
  ]

  useEffect(() => {
    function init() {
      if (!loading && !error && data) {
        const { Success, Data } = data.dashboard
        if (Success) {
          const dataKeywords = Data.KeywordSeen.map((item, key) => {
            return {
              key,
              ...item,
            }
          })

          const dataAdminLogs = Data.AdminLogs.map((item, key) => {
            return {
              key,
              ...item,
            }
          }).slice(0, 5)

          console.log('==dataAdminLogs', dataAdminLogs.length)

          setKeywords(dataKeywords)
          setAdminLogs(dataAdminLogs)
        }
      }
    }

    init()
  }, [loading, error, data]) // eslint-disable-line

  return (
    <Container>
      <PageHeader
        ghost={false}
        className="block-card"
        title={<h4 className="block-card-title page-title">{t('dashboard')}</h4>}
        extra={[
          <Button key="refresh" onClick={() => refetch()}>
            {t('refresh')}
          </Button>,
        ]}
      >
        <Row gutter={24}>
          <Col span={6}>
            <Card size="small" title={t('latest keywords')}>
              <Table
                size="small"
                pagination={false}
                dataSource={keywords}
                columns={keywordColumns}
                loading={loading || networkStatus === 4}
              />
            </Card>
          </Col>

          <Col span={18}>
            <Card size="small" title={t('latest admin logins')}>
              <Table
                size="small"
                pagination={false}
                dataSource={adminLogs}
                columns={logColumns}
                loading={loading || networkStatus === 4}
              />
            </Card>
          </Col>
        </Row>
      </PageHeader>
    </Container>
  )
}
