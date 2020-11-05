/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import Radium, { StyleRoot } from 'radium'
import { slideInDown, fadeIn, flipInY } from 'react-animations'
import { isWebpSupported } from 'react-image-webp/dist/utils'

const Banner = () => {
  const styles = {
    slideInDown: {
      animation: 'x 3s',
      animationName: Radium.keyframes(slideInDown, 'slideInDown'),
    },
    fadeIn: {
      animation: 'x 6s',
      animationName: Radium.keyframes(fadeIn, 'fadeIn'),
    },
    flipInY: {
      animation: 'x 3s',
      animationName: Radium.keyframes(flipInY, 'flipInY'),
    },
  }

  return (
    <StyleRoot>
      <div className="banner">
        <div className="banner-left">
          <div style={styles.slideInDown}>
            <div className="banner-title">
              <strong>New to ZooBC ? Download the wallet to get started.</strong>
            </div>
            <div className="banner-text">
              ZooBC wallet is a mobile apps, which can connect with the ZooBC blockchain network,
              and allows you to do the following :
            </div>
            <div className="banner-sub-text">
              <ul>
                <li>Send ZooBC coins to your friends</li>
                <li>See your balance and transaction history</li>
                <li>Support Multi Signature Transaction</li>
                <li>Support Escrow Transaction</li>
              </ul>
            </div>
          </div>
          <div className="banner-button" style={styles.fadeIn}>
            <a
              href="https://zoobc.app/zoobc-alpha.apk"
              target="_blank"
              rel="noopener norefferer"
              title="PlayStore"
            >
              {isWebpSupported() ? (
                <img src={require('../assets/images/googleplay.webp')} alt="googleplaystore" />
              ) : (
                <img src={require('../assets/images/googleplay.png')} alt="googleplaystore" />
              )}
            </a>
            <a
              href="https://testflight.apple.com/join/O1QFINJP"
              target="_blank"
              rel="noopener norefferer"
              title="AppStore"
            >
              {isWebpSupported() ? (
                <img src={require('../assets/images/appstore.webp')} alt="appstore" />
              ) : (
                <img src={require('../assets/images/appstore.png')} alt="appstore" />
              )}
            </a>
          </div>
        </div>
        <div className="banner-right">
          {isWebpSupported() ? (
            <img
              src={require('../assets/images/banner.webp')}
              alt="wallet"
              style={styles.flipInY}
            />
          ) : (
            <img src={require('../assets/images/banner.png')} alt="wallet" style={styles.flipInY} />
          )}
        </div>
      </div>
    </StyleRoot>
  )
}

export default Banner
