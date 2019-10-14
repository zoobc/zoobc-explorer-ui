import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Input, Icon, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useSearch from '../hooks/useSearch'
import LoaderPage from '../components/LoaderPage'
import Container from './Container'
import zoobcLogo from '../assets/images/logo-zoobc.svg'

const { Search } = Input

const Header = ({ history }) => {
  const { t } = useTranslation()
  const [keyword, setKeyword] = useState('')

  const { loading, error, data } = useSearch(keyword)

  useEffect(() => {
    if (!!data && !error && !loading) {
      const { ID, FoundIn } = data.search
      if (FoundIn === 'Block') history.push(`/blocks/${ID}`)
      if (FoundIn === 'Transaction') history.push(`/transactions/${ID}`)
      if (FoundIn === 'Account') history.push(`/accounts/${ID}`)
    }
  }, [keyword, data, loading, error, history])

  return (
    <Layout.Header className="header">
      {!!loading && <LoaderPage />}
      {!error && !loading && (
        <Container className="header-content">
          <Link className="logo" to="/">
            <img src={zoobcLogo} alt="zoobc-logo" />
          </Link>
          <div className="header-logo-name">ZooBC</div>
          <div className="navbar-left">
            <Menu theme="dark" mode="horizontal" style={{ paddingRight: '0px' }}>
              <Menu.Item key="1" className="menu-with-icon">
                <Link to="/">{t('Home')}</Link>
              </Menu.Item>
              <Menu.Item key="2" className="menu-with-icon">
                <Link to="/blocks">{t('Blocks')}</Link>
              </Menu.Item>
              <Menu.Item key="3" className="menu-with-icon">
                <Link to="/transactions">{t('Transactions')}</Link>
              </Menu.Item>
              <Menu.Item key="4" className="menu-with-icon">
                <Link to="/accounts">{t('Accounts')}</Link>
              </Menu.Item>
              <Menu.Item key="5" className="menu-with-icon">
                <Link to="/nodes">{t('Nodes')}</Link>
              </Menu.Item>
            </Menu>
          </div>
          <div className="navbar-right">
            <Tooltip
              trigger={['focus']}
              title="Search by Account Address / Transaction ID / Block ID"
              placement="topLeft"
            >
              <Search
                className="header-search-input"
                prefix={
                  <Icon type="search" style={{ fontSize: '22px', color: 'rgba(0,0,0,.45)' }} />
                }
                placeholder={t('Please Input Keyword')}
                enterButton={t('Search')}
                onSearch={value => setKeyword(value)}
              />
            </Tooltip>
          </div>
        </Container>
      )}
    </Layout.Header>
  )
}

export default withRouter(Header)
