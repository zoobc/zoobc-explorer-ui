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

import CryptoJS from 'crypto-js'

const keySize = 256
const iterations = 100
const secretKey = process.env.REACT_APP_GRAPHQL_CLIENT_SECRET || 'client-secret-key'

function hmacEncrypt(message, key) {
  const encrypted = CryptoJS.HmacSHA256(message, key)
  return encrypted.toString(CryptoJS.enc.Base64)
}

function encrypt(payload) {
  if (!payload) {
    return null
  }

  if (isObject(payload)) {
    payload = JSON.stringify(payload)
  }

  let salt = CryptoJS.lib.WordArray.random(128 / 8)
  let iv = CryptoJS.lib.WordArray.random(128 / 8)
  let key = CryptoJS.PBKDF2(secretKey, salt, {
    keySize: keySize / 32,
    iterations: iterations,
  })
  let encrypted = CryptoJS.AES.encrypt(payload, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  })

  return salt.toString() + iv.toString() + encrypted.toString()
}

function decrypt(payload) {
  if (!payload) {
    return null
  }

  let salt = CryptoJS.enc.Hex.parse(payload.substr(0, 32))
  let iv = CryptoJS.enc.Hex.parse(payload.substr(32, 32))
  let encrypted = payload.substring(64)
  let key = CryptoJS.PBKDF2(secretKey, salt, {
    keySize: keySize / 32,
    iterations: iterations,
  })
  let result = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  }).toString(CryptoJS.enc.Utf8)

  return result ? (isObject(result) ? JSON.parse(result) : result) : null
}

function isObject(val) {
  return val && {}.toString.call(val) === '[object Object]'
}

const encryption = {
  hmacEncrypt,
  encrypt,
  decrypt,
}

export default encryption
