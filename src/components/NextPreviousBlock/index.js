import './index.scss'
import React from 'react'
import { Button, Avatar } from 'antd'

export default ({ blocks }) => {
  const onChangeHeight = height => {
    window.location.href = height
  }

  return (
    <ul>
      {blocks && blocks.length > 0 ? (
        blocks.map((item, idx) => {
          return (
            <li key={idx}>
              <Button
                type="link"
                style={{ padding: 0 }}
                disabled={!item.Enabled}
                onClick={() => onChangeHeight(item.Height)}
              >
                <Avatar
                  size="small"
                  shape="square"
                  src={require('../../assets/images/block-grey.svg')}
                />
              </Button>
              <p>
                <small>{item.Height}</small>
              </p>
            </li>
          )
        })
      ) : (
        <li>
          <Avatar size="small" shape="square" src={require('../../assets/images/mining.svg')} />
        </li>
      )}
    </ul>
  )
}
