import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Input, Icon, Tooltip, Spin, Button } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useSearch from '../hooks/useSearch'
import Container from './Container'
import zoobcLogo from '../assets/images/logo-zoobc.svg'
import ComingSoon from './ComingSoon'

const { Search } = Input

const Spinner = <Icon type="loading" style={{ fontSize: 20, color: 'white' }} spin />

const Header = ({ history, location, fluid }) => {
  const { t } = useTranslation()
  const [keyword, setKeyword] = useState('')
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('Login')
  const { doSearch, loading } = useSearch(keyword, history)

  const onSearch = value => {
    const searchKeyword = value.trim()

    if (!!searchKeyword) {
      setKeyword(searchKeyword)
      doSearch()
    }
  }

  const onLogin = () => {
    setDialogTitle('Login')
    setIsOpenDialog(true)
  }

  const onRegister = () => {
    setDialogTitle('Register')
    setIsOpenDialog(true)
  }

  return (
    <>
      <Layout.Header className="header">
        <Container className="header-content" fluid={fluid}>
          <Link className="logo" to="/">
            <img src={zoobcLogo} alt="zoobc-logo" />
            <div className="header-logo-name">ZooBC.net</div>
          </Link>
          <div className="navbar-left d-none d-md-block">
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
                className="header-search-input d-none d-md-block"
                prefix={<Icon className="header-search-icon" type="search" />}
                placeholder={t('Please input keyword')}
                enterButton={loading ? <Spin indicator={Spinner} /> : t('Search')}
                onSearch={onSearch}
              />
            </Tooltip>
            <Button type="primary" className="mr-1 d-none d-md-block" onClick={onLogin}>
              Login
            </Button>
            <Button type="primary d-none d-md-block" onClick={onRegister}>
              Register
            </Button>
          </div>
        </Container>
      </Layout.Header>
      <ComingSoon
        visible={isOpenDialog}
        title={dialogTitle}
        onClose={() => setIsOpenDialog(false)}
      />
    </>
  )
}

export default withRouter(Header)
