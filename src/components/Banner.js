/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { Col } from 'antd'

import PlayStore from '../assets/images/googleplay.png'
import AppStore from '../assets/images/appstore.png'
import BannerImage from '../assets/images/banner.png'

const Banner = () => {
  return (
    <>
      <Col className="home-col-left" md={{ span: 12 }} sm={{ span: 24 }}>
        <h1>
          <strong>New to ZooBC ?</strong>
          <strong>
            <p> Download the wallet to get started.</p>
          </strong>
          <p className="banner-text">
            ZooBC wallet is a mobile application that is able to connect with the
          </p>
          <p className="banner-sub-text">
            ZooBC blockchain network, which allows you to do the following :
            <ul>
              <li>Send ZooBC coins to your friends</li>
              <li>See your balance and transaction history</li>
              <li>Support Multi Signature Transaction</li>
              <li>Support Escrow Transaction</li>
            </ul>
          </p>
          <p className="banner-sub-text"></p>
        </h1>

        <div className="banner-button">
          <a
            className="play-store"
            href="https://zoobc.app/"
            target="_blank"
            rel="noopener norefferer"
            title="PlayStore"
          >
            <img src={PlayStore} alt="playstore" />
          </a>
          <a href="https://zoobc.app/" target="_blank" rel="noopener norefferer" title="AppStore">
            <img src={AppStore} alt="appstore" />
          </a>
        </div>
      </Col>
      <Col className="home-col-right banner-wallet" md={{ span: 12 }} sm={{ span: 24 }}>
        <img src={BannerImage} alt="wallet" />
      </Col>
    </>
  )
}

export default Banner
