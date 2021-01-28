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

import React from 'react'
import { Card } from 'antd'
import { useTranslation } from 'react-i18next'

import DescItem from '../DescItem'
import { Link } from 'react-router-dom'

const MultiSignature = ({ data, disableTrxHashLink }) => {
  const { t } = useTranslation()
  const { MultiSignatureInfo, SignatureInfo } = data

  return (
    <>
      {MultiSignatureInfo && MultiSignatureInfo.MinimumSignatures && (
        <Card className="transaction-card">
          <h4 className="transaction-card-title page-title">{t('multisignature info')}</h4>
          {MultiSignatureInfo.MinimumSignatures && (
            <DescItem
              label={t('minimum signature')}
              style={{ display: 'none' }}
              value={MultiSignatureInfo.MinimumSignatures}
            />
          )}
          {MultiSignatureInfo.Nonce && (
            <DescItem
              label={t('nonce')}
              style={{ display: 'none' }}
              value={MultiSignatureInfo.Nonce}
            />
          )}
          {/* {MultiSignatureInfo.BlockHeight && (
            <DescItem
              label="Block Height"
              style={{ display: 'none' }}
              text={t(
                'the position of the block in the zoobc blockchain. for example, height 0, would be the very first block, which is also called the genesis block'
              )}
              value={MultiSignatureInfo.BlockHeight}
            />
          )} */}
          {MultiSignatureInfo.MultisigAddressFormatted && (
            <DescItem
              label={t('multisig address')}
              style={{ display: 'none' }}
              textClassName="monospace-text"
              value={MultiSignatureInfo.MultisigAddressFormatted}
            />
          )}
          {MultiSignatureInfo.AddressesFormatted &&
            MultiSignatureInfo.AddressesFormatted.length > 0 && (
              <>
                <br />
                <h5>{t('participants')}</h5>
                {MultiSignatureInfo.AddressesFormatted.map((data, key) => {
                  const AddressFormatted = data
                  return (
                    <DescItem
                      key={key}
                      label={t('participant') + ` ${key + 1}`}
                      value={<Link to={`/accounts/${AddressFormatted}`}>{AddressFormatted}</Link>}
                    />
                  )
                })}
              </>
            )}
          {/* {MultiSignatureInfo.AddressesFormatted &&
              MultiSignatureInfo.AddressesFormatted.length > 0 && (
                <>
                  <h5>{t('participants')}</h5>
                  {MultiSignatureInfo.AddressesFormatted.map((data, key) => {
                    const AddressFormatted = data
                    return (
                      <DescItem
                        key={key}
                        label={`Participant ${key + 1}`}
                        value={<Link to={`/accounts/${AddressFormatted}`}>{AddressFormatted}</Link>}
                      />
                    )
                  })}
                </>
              )}
            )} */}
          {/* {UnsignedTransactionBytes && (
              <>
                <DescItem
                  label="Unsigned Transaction Bytes"
                  style={{ display: 'none' }}
                  value={UnsignedTransactionBytes}
                />
              </>
            )} */}
          {/* {SignatureInfo && (
              <>
                {SignatureInfo.TransactionHashFormatted && (
                  <DescItem
                    label={t('transaction hash')}
                    style={{ display: 'none' }}
                    textClassName="monospace-text"
                    value={
                      !!disableTrxHashLink ? (
                        SignatureInfo.TransactionHashFormatted
                      ) : (
                        <Link to={`/transactions/${SignatureInfo.TransactionHashFormatted}`}>
                          {SignatureInfo.TransactionHashFormatted}
                        </Link>
                      )
                    }
                  />
                )}

                {SignatureInfo.Signatures && SignatureInfo.Signatures.length > 0 && (
                  <h5>{t('participants')}</h5>
                )}
                {SignatureInfo.Signatures &&
                  SignatureInfo.Signatures.map((data, key) => {
                    const AddressFormatted = data.AddressFormatted

                    return (
                      <DescItem
                        key={key}
                        label={`Participant ${key + 1}`}
                        style={{ display: 'none' }}
                        value={<Link to={`/accounts/${AddressFormatted}`}>{AddressFormatted}</Link>}
                      />
                    )
                  })}
              </>
            )} */}
        </Card>
      )}

      {SignatureInfo && SignatureInfo.TransactionHashFormatted && (
        <Card className="transaction-card">
          <h4 className="transaction-card-title page-title">{t('signature info')}</h4>
          {SignatureInfo.TransactionHashFormatted && (
            <DescItem
              label={t('transaction')}
              style={{ display: 'none' }}
              textClassName="monospace-text"
              value={
                !!disableTrxHashLink ? (
                  SignatureInfo.TransactionHashFormatted
                ) : (
                  <Link to={`/transactions/${SignatureInfo.TransactionHashFormatted}`}>
                    {SignatureInfo.TransactionHashFormatted}
                  </Link>
                )
              }
            />
          )}

          {/* {SignatureInfo.Signatures && SignatureInfo.Signatures.length > 0 && (
            <>
              <h5>{t('signatures')}</h5>
              {SignatureInfo.Signatures.map((data, key) => {
                const AddressFormatted = data
                return (
                  <DescItem
                    key={key}
                    label={`Signature ${key + 1}`}
                    value={<Link to={`/accounts/${AddressFormatted}`}>{AddressFormatted}</Link>}
                  />
                )
              })}
            </>
          )} */}
        </Card>
      )}
    </>
  )
}

export default MultiSignature
