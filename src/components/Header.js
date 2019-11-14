import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Input, Icon, Tooltip, Spin, Button, Drawer } from 'antd'
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
  const [isOpenDrawer, setIsOpenDraw] = useState(false)
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

  const onFeedback = () => {
    setDialogTitle('Feedback')
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
              Login / Register
            </Button>
            <Button type="danger" onClick={onFeedback}>
              Feedback
            </Button>
            <Button
              icon="menu"
              type="link"
              className="drawer-mobile-collapse ml-1 d-block d-md-none"
              onClick={() => setIsOpenDraw(true)}
            />
          </div>
        </Container>
      </Layout.Header>
      <ComingSoon
        visible={isOpenDialog}
        title={dialogTitle}
        onClose={() => setIsOpenDialog(false)}
      />
      <Drawer
        placement="top"
        onClose={() => setIsOpenDraw(false)}
        visible={isOpenDrawer}
        destroyOnClose={true}
        className="drawer-mobile"
        height="auto"
      // closable={false}
      >
        <div className="drawer-mobile-content">
          <Link className="logo" to="/">
            <img src={zoobcLogo} alt="zoobc-logo" />
            <div className="header-logo-name">ZooBC.net</div>
          </Link>
          <Menu className="header-menu" selectedKeys={[location.pathname]}>
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
          <Search
            className="header-search-input"
            prefix={<Icon className="header-search-icon" type="search" />}
            placeholder={t('Please input keyword')}
            enterButton={loading ? <Spin indicator={Spinner} /> : t('Search')}
            onSearch={onSearch}
          />
        </div>
      </Drawer>
    </>
  )
}

export default withRouter(Header)
