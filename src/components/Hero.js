import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Typography, Input, Row, Col, Card, Icon } from 'antd'
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
  const [result, setResult] = useState({})

  const { data } = useQuery(GET_SEARCH_DATA, {
    variables: {
      Id: result,
    },
  })

  const searchHandler = value => {
    setResult(value)

    if (!!data) {
      const { ID, FoundIn } = data.search
      if (FoundIn === 'Block') {
        return history.push(`/blocks/${ID}`)
      } else if (data.search.FoundIn === 'Transaction') {
        return history.push(`/transactions/${ID}`)
      }
    }
  }

  return (
    <Card className="hero">
      <div className="hero-content">
        <Title>ZooBC Explorer</Title>
        <Row gutter={24} style={{ width: '100%' }}>
          <Col span={24}>
            <Search
              size="large"
              prefix={<Icon type="search" style={{ fontSize: '22px', color: 'rgba(0,0,0,.45)' }} />}
              placeholder="Search by Address / Transaction ID / Block Height"
              enterButton="SEARCH"
              onSearch={value => searchHandler(value)}
            />
          </Col>
        </Row>
        <h6 className="hero-subtitle">
          A webview for searching and displaying data published, so that a user can easily find any
          info about blockchain
        </h6>
      </div>
    </Card>
  )
}

export default withRouter(Hero)
