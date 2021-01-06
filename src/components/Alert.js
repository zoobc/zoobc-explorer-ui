import React from 'react'
import moment from 'moment'
import { Alert } from 'antd'
import { useQuery, useSubscription, gql } from '@apollo/client'

const GET_DATA_BLOCKS = gql`
  query {
    blocks(page: 1, limit: 1, order: "-Height") {
      Blocks {
        Height
        Timestamp
      }
    }
  }
`

const GET_SUBSCRIPTION_BLOCKS = gql`
  subscription blocks {
    blocks {
      Height
      Timestamp
    }
  }
`

export default function AlertPage() {
  const { data } = useQuery(GET_DATA_BLOCKS)
  const subscriptBlocks = useSubscription(GET_SUBSCRIPTION_BLOCKS)

  let firstCheck = true
  let visible = false
  let lastTime = 'some time ago'

  const checkDayBefore = date => {
    if (moment().diff(date, 'days') > 0) {
      lastTime = moment(date).format('MMM DD, YYYY hh:mm:ss')
      visible = true
    } else {
      visible = false
    }
  }

  if (
    firstCheck &&
    !!data &&
    !!data.blocks &&
    !!data.blocks.Blocks &&
    !!data.blocks.Blocks.length > 0
  ) {
    const lastBlock = data.blocks.Blocks[0]
    firstCheck = false
    checkDayBefore(lastBlock.Timestamp)
  }

  if (subscriptBlocks && !subscriptBlocks.loading && !subscriptBlocks.error) {
    const { data } = subscriptBlocks
    if (data && data.blocks && data.blocks.length > 0) {
      const lastBlock = data.blocks[0]
      checkDayBefore(lastBlock.Timestamp)
    }
  }

  return visible ? (
    <Alert
      showIcon
      type="warning"
      message="WARNING:"
      style={{ marginBottom: 24, textAlign: 'left' }}
      description={`Explorer server has not updated since ${lastTime}, this may be a network error. You can still query for older blocks and transactions`}
    />
  ) : null
}
