import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Input, Row, Col, Card, Icon, Spin } from 'antd'
import { useTranslation } from 'react-i18next'

import useSearch from '../hooks/useSearch'

const { Search } = Input

const Spinner = <Icon type="loading" style={{ fontSize: 24, color: 'white' }} spin />;

const Hero = ({ history }) => {
  const { t } = useTranslation()
  const [keyword, setKeyword] = useState('')

  const { doSearch, loading } = useSearch(keyword, history);

  const onSearch = value => {
    if (!!value) {
      setKeyword(value);
      doSearch();
    }
  }

  return (
    <Card className="hero">
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
              enterButton={loading ? <Spin indicator={Spinner} /> : t('Search')}
              onSearch={onSearch}
            />
          </Col>
        </Row>
        <h6 className="hero-subtitle">
          {t(
            'A webview for searching and displaying data published, so that a user can easily find any info about blockchain'
          )}
        </h6>
      </div>
    </Card>
  )
}

export default withRouter(Hero)
