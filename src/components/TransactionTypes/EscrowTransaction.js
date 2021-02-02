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
import NumberFormat from 'react-number-format'

import DescItem from '../DescItem'
import { Link } from 'react-router-dom'

const EscrowTransaction = ({ data, blockID, TransactionID }) => {
  const { t } = useTranslation()
  return (
    <Card className="transaction-card">
      <h4 className="transaction-card-title page-title">{t('escrow transaction')}</h4>

      {!!TransactionID && (
        <DescItem
          label={t('transaction id')}
          text={t(
            'an identifier which facilitates easy identification of transactions on the zoobc blockchain'
          )}
          value={<Link to={`/transactions/${TransactionID}`}>{TransactionID}</Link>}
        />
      )}

      <DescItem
        label={t('sender')}
        style={{ display: 'none' }}
        value={
          <Link to={`/accounts/${data.SenderAddressFormatted}`}>{data.SenderAddressFormatted}</Link>
        }
        textClassName="monospace-text"
      />
      <DescItem
        label={t('recipient')}
        style={{ display: 'none' }}
        value={
          <Link to={`/accounts/${data.RecipientAddressFormatted}`}>
            {data.RecipientAddressFormatted}
          </Link>
        }
        textClassName="monospace-text"
      />
      <DescItem
        label={t('approver')}
        style={{ display: 'none' }}
        value={
          <Link to={`/accounts/${data.ApproverAddressFormatted}`}>
            {data.ApproverAddressFormatted}
          </Link>
        }
        textClassName="monospace-text"
      />
      <DescItem
        label={t('commission fee')}
        style={{ display: 'none' }}
        value={
          <NumberFormat
            value={data.CommissionConversion || 0}
            displayType={'text'}
            thousandSeparator={true}
            suffix={' ZBC'}
            className="monospace-text"
          />
        }
      />
      <DescItem label={t('timeout')} style={{ display: 'none' }} value={data.Timeout} />
      <DescItem
        label={t('block height')}
        text={t(
          'the position of the block in the zoobc blockchain. for example, height 0, would be the very first block, which is also called the genesis block'
        )}
        value={<Link to={`/blocks/${blockID}`}>{data.BlockHeight}</Link>}
      />
      <DescItem label={t('instruction')} style={{ display: 'none' }} value={data.Instruction} />
    </Card>
  )
}

export default EscrowTransaction
