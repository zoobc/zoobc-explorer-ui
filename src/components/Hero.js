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

import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { Input, Row, Col, Card, Icon, Spin } from 'antd'
import { useTranslation } from 'react-i18next'

import Alert from './Alert'
import useSearch from '../hooks/useSearch'
import AnimationContext from '../context/AnimationContext'

const { Search } = Input

const Spinner = <Icon type="loading" style={{ fontSize: 24, color: 'white' }} spin />

const Hero = ({ history }) => {
  const { t } = useTranslation()
  const { onChangeAnimation } = useContext(AnimationContext)
  const [keyword, setKeyword] = useState('')

  const { doSearch, loading } = useSearch(keyword, history)

  const onSearch = value => {
    const searchKeyword = value.trim()

    if (!!searchKeyword) {
      if (searchKeyword === 'craig wright is satoshi nakamoto') {
        history.push({
          pathname: '/search',
          search: `?search=${searchKeyword}`,
          state: { search: searchKeyword },
        })
        onChangeAnimation()
        return
      }
      setKeyword(searchKeyword)
      doSearch()
    }
  }

  return (
    <Card className="hero-content" bordered={false}>
      <Alert />
      <div className="hero-title">
        <strong>ZooBC Explorer</strong>
      </div>
      <Row>
        <Col span={24}>
          <label className="label-search">
            <Search
              size="large"
              prefix={<Icon type="search" style={{ fontSize: '18px', color: 'rgba(0,0,0,.45)' }} />}
              placeholder={t(
                'search by account address / transaction id / block id / node public key'
              )}
              enterButton={loading ? <Spin indicator={Spinner} /> : t('search')}
              onSearch={onSearch}
            />
          </label>
        </Col>
      </Row>
      <div className="hero-subtitle">
        {t(
          'a webview for searching and displaying data published, so that a user can easily find any info about blockchain'
        )}
      </div>
    </Card>
  )
}

export default withRouter(Hero)
