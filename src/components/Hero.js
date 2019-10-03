import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Typography, Input, Row, Col, Card, Icon } from 'antd'
import LoaderPage from '../components/Loader/LoaderPage'

const { Title } = Typography
const { Search } = Input

const GET_SEARCH_DATA = gql`
  query getSearchData($Id: String!) {
    search(Id: $Id) {
      ID
      Height
      Timestamp
      FoundIn
    }
  }
`

const Hero = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const { loading, data, error } = useQuery(GET_SEARCH_DATA, {
    variables: {
      Id: keyword,
    },
  })

  useEffect(() => {
    if (!!data && !error && !loading) {
      const { ID, FoundIn } = data.search
      if (FoundIn === 'Block') history.push(`/blocks/${ID}`)
      if (FoundIn === 'Transaction') history.push(`/transactions/${ID}`)
    }
  }, [keyword, data, loading, error, history])

  return (
    <Card className="hero">
      {!!loading && <LoaderPage />}
      {!error && !loading && (
        <div className="hero-content">
          <Title>ZooBC Explorer</Title>
          <Row gutter={24} style={{ width: '100%' }}>
            <Col span={24}>
              <Search
                size="large"
                prefix={
                  <Icon type="search" style={{ fontSize: '22px', color: 'rgba(0,0,0,.45)' }} />
                }
                placeholder="Search by Address / Transaction ID / Block Height"
                enterButton="SEARCH"
                onSearch={value => setKeyword(value)}
              />
            </Col>
          </Row>
          <h6 className="hero-subtitle">
            A webview for searching and displaying data published, so that a user can easily find
            any info about blockchain
          </h6>
        </div>
      )}
    </Card>
  )
}

export default withRouter(Hero)
