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
import { Input, Icon, Spin } from 'antd'

import imageOmg from '../../assets/images/omg.svg'
import searchResult from '../../assets/images/search-result.svg'
import Container from '../../components/Container'
import NotFoundComp from '../../components/Errors/NotFound'
import useSearch from '../../hooks/useSearch'
import { useTranslation } from 'react-i18next'
import AnimationContext from '../../context/AnimationContext'

const { Search } = Input
const Spinner = <Icon type="loading" style={{ fontSize: 24, color: 'white' }} spin />
const keywords = ['proof of participation', 'roberto', 'barton']

const NotFound = ({ history, location }) => {
  const { t } = useTranslation()
  const { onChangeAnimation } = useContext(AnimationContext)
  const [keyword, setKeyword] = useState('')
  const { doSearch, loading } = useSearch(keyword, history)
  const { state } = location

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

  return !!state && !!state.search ? (
    <Container>
      <div className="error-content error-content-page">
        {keywords.indexOf(state.search) > -1 ? (
          <>
            <img src={imageOmg} alt="omg" />
            <span className="error-title page-title">{t('OMG, You found me here...')}</span>
            <span className="h6 text-center page-title">
              {t('Ow… come on, I can’t be so serious if You not click ')}
              <a href="https://zoobc.io/" target="_blank" rel="noopener noreferrer">
                {t('here')}
              </a>
            </span>
          </>
        ) : (
          <>
            <img src={searchResult} alt="not found" />
            <span className="error-title page-title">{t('no result found')}</span>
            <span className="h6 text-center page-title">
              {t("sorry, we couldn't find any results for")} {state.search}
            </span>
            <Search
              prefix={<Icon type="search" style={{ fontSize: '16px', color: 'rgba(0,0,0,.45)' }} />}
              placeholder={t(
                'search by account address / transaction id / block id / node public key'
              )}
              // enterButton={loading ? <Spin indicator={Spinner} /> : t('search')}
              onSearch={onSearch}
              className="error-search"
            />
          </>
        )}

        {loading ? <Spin indicator={Spinner} /> : null}
      </div>
    </Container>
  ) : (
    <NotFoundComp />
  )
}

export default NotFound
