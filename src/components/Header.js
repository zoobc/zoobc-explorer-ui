import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Input, Icon, Tooltip, Spin } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useSearch from '../hooks/useSearch'
import Container from './Container'
import zoobcLogo from '../assets/images/logo-zoobc.svg'

const { Search } = Input

const Spinner = <Icon type="loading" style={{ fontSize: 20, color: 'white' }} spin />

const Header = ({ history, location }) => {
  const { t } = useTranslation()
  const [keyword, setKeyword] = useState('')

  const { doSearch, loading } = useSearch(keyword, history)

  const onSearch = value => {
    const searchKeyword = value.trim();

    if (!!searchKeyword) {
      setKeyword(searchKeyword)
      doSearch();
    }
  }

  return (
    <Layout.Header className="header">
      <Container className="header-content">
        <Link className="logo" to="/">
          <img src={zoobcLogo} alt="zoobc-logo" />
          <div className="header-logo-name">ZooBC</div>
        </Link>
        <div className="navbar-left">
          <Menu
            className="header-menu"
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
          >
            <Menu.Item key="/blocks" className="menu-with-icon">
              <Link to="/blocks">{t('Blocks')}</Link>
            </Menu.Item>
            <Menu.Item key="/transactions" className="menu-with-icon">
              <Link to="/transactions">{t('Transactions')}</Link>
            </Menu.Item>
            <Menu.Item key="/accounts" className="menu-with-icon">
              <Link to="/accounts">{t('Accounts')}</Link>
            </Menu.Item>
            <Menu.Item key="/nodes" className="menu-with-icon">
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
              prefix={<Icon className="header-search-icon" type="search" />}
              placeholder={t('Please input keyword')}
              enterButton={loading ? <Spin indicator={Spinner} /> : t('Search')}
              onSearch={onSearch}
            />
          </Tooltip>
        </div>
      </Container>
    </Layout.Header>
  )
}

export default withRouter(Header)
