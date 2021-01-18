import React from 'react'
import BlinkText from '../BlinkText'

export default () => {
  return (
    <div className="announcement">
      <BlinkText
        color="white"
        text="THIS IS THE ZOOBC TESTNET. ZooBC MainNet will launch on March 22, 2021"
      />
    </div>
  )
}
