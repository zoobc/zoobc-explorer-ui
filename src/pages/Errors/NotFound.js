import React, { useState, useContext } from 'react'
import { Input, Icon, Spin } from 'antd'

import searchResult from '../../assets/images/search-result.svg'
import Container from '../../components/Container'
import NotFoundComp from '../../components/Errors/NotFound'
import useSearch from '../../hooks/useSearch'
import { useTranslation } from 'react-i18next'
import AnimationContext from '../../context/AnimationContext'

const { Search } = Input
const Spinner = <Icon type="loading" style={{ fontSize: 24, color: 'white' }} spin />

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
        <img src={searchResult} alt="not found" />
        <span className="error-title">No result found</span>
        <span className="h6 text-center">
          {t("sorry, we couldn't find any results for")} {state.search}
        </span>
        <Search
          prefix={<Icon type="search" style={{ fontSize: '16px', color: 'rgba(0,0,0,.45)' }} />}
          placeholder={t('search by account address / transaction id / block id / node public key')}
          enterButton={loading ? <Spin indicator={Spinner} /> : t('search')}
          onSearch={onSearch}
          className="error-search"
        />
      </div>
    </Container>
  ) : (
    <NotFoundComp />
  )
}

export default NotFound
