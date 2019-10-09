import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Input, Row, Col, Card, Icon } from 'antd'
import { useTranslation } from 'react-i18next'

import LoaderPage from '../components/LoaderPage'
import useSearch from '../hooks/useSearch'

const { Search } = Input

const Hero = ({ history }) => {
  const { t } = useTranslation()
  const [keyword, setKeyword] = useState('')

  const { loading, error, data } = useSearch(keyword)

  useEffect(() => {
    if (!!data && !error && !loading) {
      const { ID, FoundIn } = data.search
      if (FoundIn === 'Block') history.push(`/blocks/${ID}`)
      if (FoundIn === 'Transaction') history.push(`/transactions/${ID}`)
      if (FoundIn === 'Account') history.push(`/accounts/${ID}`)
    }
  }, [keyword, data, loading, error, history])

  return (
    <Card className="hero">
      {!!loading && <LoaderPage />}
      {!error && !loading && (
        <div className="hero-content">
          <h3>
            <strong>ZooBC Explorer</strong>
          </h3>
          <Row gutter={24} style={{ width: '100%' }}>
            <Col span={24}>
              <Search
                size="large"
                prefix={
                  <Icon type="search" style={{ fontSize: '22px', color: 'rgba(0,0,0,.45)' }} />
                }
                placeholder={t('Search by Account Address / Transaction ID / Block ID')}
                enterButton={t('Search')}
                onSearch={value => setKeyword(value)}
              />
            </Col>
          </Row>
          <h6 className="hero-subtitle">
            {t(
              'A webview for searching and displaying data published, so that a user can easily find any info about blockchain'
            )}
          </h6>
        </div>
      )}
    </Card>
  )
}

export default withRouter(Hero)
