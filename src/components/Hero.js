import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { Input, Row, Col, Card, Icon, Spin } from 'antd'
import { useTranslation } from 'react-i18next'

import useSearch from '../hooks/useSearch'
import AnimationContext from '../context/AnimationContext'

const { Search } = Input

const Spinner = <Icon type="loading" style={{ fontSize: 24, color: 'white' }} spin />

const Hero = ({ history }) => {
  const { t } = useTranslation()
  const { onChangeAnimation } = useContext(AnimationContext)
  const [keyword, setKeyword] = useState('')

  const { doSearch, loading } = useSearch(keyword, history)

  const onSearch = value => {
    const searchKeyword = value.trim()

    if (!!searchKeyword) {
      if (searchKeyword === 'craig wright is satoshi nakamoto') {
        history.push({
          pathname: '/search',
          search: `?search=${searchKeyword}`,
          state: { search: searchKeyword },
        })
        onChangeAnimation()
        return
      }
      setKeyword(searchKeyword)
      doSearch()
    }
  }

  return (
    <Card className="hero-content" bordered={false}>
      <h3>
        <strong>ZooBC Explorer</strong>
      </h3>
      <Row>
        <Col span={24}>
          <label className="label-search">
            <Search
              size="large"
              prefix={<Icon type="search" style={{ fontSize: '18px', color: 'rgba(0,0,0,.45)' }} />}
              placeholder={t('Search by Account Address / Transaction ID / Block ID / Node Public Key')}
              enterButton={loading ? <Spin indicator={Spinner} /> : t('Search')}
              onSearch={onSearch}
            />
          </label>
        </Col>
      </Row>
      <h6 className="hero-subtitle">
        {t(
          'A webview for searching and displaying data published, so that a user can easily find any info about blockchain'
        )}
      </h6>
    </Card>
  )
}

export default withRouter(Hero)
