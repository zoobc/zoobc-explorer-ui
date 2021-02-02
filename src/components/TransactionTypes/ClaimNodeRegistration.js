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
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import DescItem from '../DescItem'
import { useTranslation } from 'react-i18next'

const ClaimNodeRegistration = ({ data }) => {
  const { t } = useTranslation()
  return (
    <Card className="transaction-card">
      <h4 className="transaction-card-title page-title">{t('claim node registration')}</h4>
      <DescItem
        label={t('account address')}
        style={{ display: 'none' }}
        value={<Link to={`/accounts/${data.AccountAddress}`}>{data.AccountAddress}</Link>}
        textClassName="monospace-text"
      />
      <DescItem
        label={t('node public key')}
        text={t(
          'a string of letters and numbers that are used to receive amount of zoobc. works similar to a traditional bank account number and can be shared publicly with others'
        )}
        value={
          <Link to={`/nodes/${data.NodePublicKeyFormatted}`}>{data.NodePublicKeyFormatted}</Link>
        }
        textClassName="monospace-text"
      />
      <DescItem
        label={t('poow message bytes')}
        style={{ display: 'none' }}
        value={data.ProofOfOwnership && data.ProofOfOwnership.MessageBytes}
      />
      <DescItem
        label={t('poow signature')}
        style={{ display: 'none' }}
        value={data.ProofOfOwnership && data.ProofOfOwnership.Signature}
        textClassName="monospace-text"
      />
    </Card>
  )
}

export default ClaimNodeRegistration
