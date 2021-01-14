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
