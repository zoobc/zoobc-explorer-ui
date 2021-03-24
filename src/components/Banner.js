/**
 * ZooBC Copyright (C) 2020 Quasisoft Limited - Hong Kong
 * This file is part of ZooBC <https://github.com/zoobc/zoobc-explorer-ui>

 * ZooBC is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * ZooBC is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with ZooBC.  If not, see <http://www.gnu.org/licenses/>.

 * Additional Permission Under GNU GPL Version 3 section 7.
 * As the special exception permitted under Section 7b, c and e,
 * in respect with the Author’s copyright, please refer to this section:

 * 1. You are free to convey this Program according to GNU GPL Version 3,
 *     as long as you respect and comply with the Author’s copyright by
 *     showing in its user interface an Appropriate Notice that the derivate
 *     program and its source code are “powered by ZooBC”.
 *     This is an acknowledgement for the copyright holder, ZooBC,
 *     as the implementation of appreciation of the exclusive right of the
 *     creator and to avoid any circumvention on the rights under trademark
 *     law for use of some trade names, trademarks, or service marks.

 * 2. Complying to the GNU GPL Version 3, you may distribute
 *     the program without any permission from the Author.
 *     However a prior notification to the authors will be appreciated.

 * ZooBC is architected by Roberto Capodieci & Barton Johnston
 * contact us at roberto.capodieci[at]blockchainzoo.com
 * and barton.johnston[at]blockchainzoo.com

 * IMPORTANT: The above copyright notice and this permission notice
 * shall be included in all copies or substantial portions of the Software.
**/

/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react'
import Radium, { StyleRoot } from 'radium'
import { slideInDown, fadeIn, flipInY } from 'react-animations'
import { isWebpSupported } from 'react-image-webp/dist/utils'
import ComingSoon from './ComingSoon'

const Banner = () => {
  const [isOpenComingSoon, setIsOpenCommingSoon] = useState(false)
  const [dialogTitle, setDialogTitle] = useState()
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

  const onComingSoon = () => {
    setDialogTitle()
    setIsOpenCommingSoon(true)
  }

  return (
    <>
      <StyleRoot>
        <div className="banner">
          <div className="wallet-mobile">
            {isWebpSupported() ? (
              <img
                src={require('../assets/images/wallet-mobile.webp')}
                alt="wallet"
                style={styles.flipInY}
              />
            ) : (
              <img
                src={require('../assets/images/wallet-mobile.png')}
                alt="wallet"
                style={styles.flipInY}
              />
            )}
          </div>
          <div style={styles.slideInDown}>
            <div className="banner-title">
              New to ZooBC?
              <br />
              Download the wallet to get started.
            </div>
            <div className="banner-text">
              ZooBC wallet is a mobile app, which can connect with the ZooBC blockchain network, and
              allows you to do the following:
            </div>
            <div className="banner-sub-text">
              <ul>
                <li>Send ZooBC to your friends</li>
                <li>See your balance and transaction history</li>
                <li>Support Multi Signature Transaction</li>
                <li>Support Escrow Transaction</li>
              </ul>
            </div>
          </div>
          <div className="banner-button" style={styles.fadeIn}>
            <a
              href="https://play.google.com/store/apps/details?id=com.zoobc.walletmobile"
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
              href="https://apps.apple.com/us/app/zoobc-wallet/id1548067497"
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
            <a
              onClick={onComingSoon}
              target="_blank"
              rel="noopener norefferer"
              title="ChromeWebStore"
            >
              {isWebpSupported() ? (
                <img src={require('../assets/images/chromewebstore.webp')} alt="chromewebstore" />
              ) : (
                <img src={require('../assets/images/chromewebstore.png')} alt="chromewebstore" />
              )}
            </a>
          </div>
        </div>
      </StyleRoot>
      <ComingSoon
        visible={isOpenComingSoon}
        title={dialogTitle}
        onClose={() => setIsOpenCommingSoon(false)}
      />
    </>
  )
}

export default Banner
