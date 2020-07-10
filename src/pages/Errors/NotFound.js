import React, { useState, useContext } from 'react'
import { Input, Row, Col, Icon, Spin } from 'antd'

import notFound from '../../assets/images/not-found.svg'
import Container from '../../components/Container'
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
  return (
    <>
      <Container className="flex">
        <div className="error-content error-content-page">
          <div className="d-flex flex-column flex-md-row text-center">
            <img src={notFound} alt="not found" className="mr-2" />
            <Row gutter={24} className="mt-3">
              <Col span={24}>
                {!!state && !!state.search ? (
                  <>
                    <p className="h3 mt-5">
                      {t('Search results for')} {state.search}
                    </p>
                    <p className="h6">{t("Sorry, we couldn't find any results for this search")}</p>
                  </>
                ) : (
                  <>
                    <p className="display-3 mb-0">404</p>
                    <p className="h6">{t('Page Not Found')}</p>
                  </>
                )}
                <label>
                  <Search
                    prefix={
                      <Icon
                        type="search"
                        className="mr-1"
                        style={{ fontSize: '16px', color: 'rgba(0,0,0,.45)' }}
                      />
                    }
                    placeholder={t(
                      'Search by Account Address / Transaction ID / Block ID / Node Public Key'
                    )}
                    enterButton={loading ? <Spin indicator={Spinner} /> : t('Search')}
                    onSearch={onSearch}
                  />
                </label>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </>
  )
}

export default NotFound
