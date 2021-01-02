/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Input, Icon, Tooltip, Spin, Button, Drawer, Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useSearch from '../hooks/useSearch'
import Container from './Container'
import zoobcLogo from '../assets/images/logo-zoobc.svg'
import ComingSoon from './ComingSoon'
import AnimationContext from '../context/AnimationContext'
import FormFeedback from './FormFeedback'
import testnet from '../config/testnet'
import TestnetContext from '../context/TestnetContext'

const { Search } = Input

const Spinner = <Icon type="loading" style={{ fontSize: 20, color: 'white' }} spin />

const Header = ({ history, location, fluid }) => {
  const { t } = useTranslation()
  const [keyword, setKeyword] = useState('')
  const { onChangeAnimation } = useContext(AnimationContext)
  const { selectedTestnet, onChangeSelectedTestnet } = useContext(TestnetContext)
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [isOpenDrawer, setIsOpenDraw] = useState(false)
  const [isOpenFeedBack, setIsOpenFeedBack] = useState(false)
  const [dialogTitle] = useState('Login')
  // const [dialogTitle, setDialogTitle] = useState('Login')
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

  // const onLogin = () => {
  //   setDialogTitle(t('Login'))
  //   setIsOpenDialog(true)
  // }

  const onFeedback = e => {
    e.preventDefault()
    setIsOpenFeedBack(true)
  }

  const onSelectNetwork = data => {
    onChangeSelectedTestnet(data)
    window.location.reload()
  }

  const TesnetMenuDropdown = (
    <Menu>
      {testnet.map((network, key) => (
        <Menu.Item key={key} onClick={() => onSelectNetwork(network)}>
          {network.name}
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <>
      <Layout.Header className="header">
        <Container className="header-content" fluid={fluid}>
          <div className="logo">
            <Link to="/">
              <img src={zoobcLogo} alt="zoobc-logo" />
            </Link>
            <div className="header-logo-name">
              <Link className="logo-text-name" to="/">
                ZooBC Explorer
              </Link>
              <span className="logo-text-version">Beta - Version 0.3.0</span>
              <Dropdown overlay={TesnetMenuDropdown}>
                <span className="logo-text-network">
                  {selectedTestnet.name} <Icon type="down" />
                </span>
              </Dropdown>
            </div>
          </div>
          <div className="navbar-left d-none d-lg-block">
            <Menu
              className="header-menu"
              theme="dark"
              mode="horizontal"
              selectedKeys={[location.pathname]}
            >
              <Menu.Item key="/blocks" className="menu-with-icon">
                <Link to="/blocks">{t('blocks')}</Link>
              </Menu.Item>
              <Menu.Item key="/transactions" className="menu-with-icon">
                <Link to="/transactions">{t('transactions')}</Link>
              </Menu.Item>
              <Menu.Item key="/accounts" className="menu-with-icon">
                <Link to="/accounts">{t('accounts')}</Link>
              </Menu.Item>
              <Menu.Item key="/nodes" className="menu-with-icon">
                <Link to="/nodes">{t('nodes')}</Link>
              </Menu.Item>
              <Menu.Item key="/feedback" className="menu-with-icon">
                <Button type="danger" onClick={onFeedback}>
                  {t('feedback')}
                </Button>
              </Menu.Item>
            </Menu>
          </div>
          <div className="navbar-right">
            <Tooltip
              getPopupContainer={triggerNode => triggerNode.parentNode}
              trigger={['focus']}
              title={t('search by account address / transaction id / block id / node public key')}
              placement="topLeft"
            >
              <label>
                <Search
                  className="header-search-input d-none d-lg-block"
                  prefix={<Icon className="header-search-icon" type="search" />}
                  placeholder={t('please input keyword')}
                  enterButton={loading ? <Spin indicator={Spinner} /> : t('search')}
                  onSearch={onSearch}
                />
              </label>
            </Tooltip>
            {/* <Button type="primary" className="mr-1 d-none d-lg-block" onClick={onLogin}>
              {t('login')}
            </Button> */}
            <Button type="danger" className="d-block d-lg-none" onClick={onFeedback}>
              {t('feedback')}
            </Button>
            <Button
              icon="menu"
              type="link"
              className="drawer-mobile-collapse ml-1 d-block d-lg-none"
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
      <FormFeedback visible={isOpenFeedBack} onClose={() => setIsOpenFeedBack(false)} />
      <Drawer
        placement="top"
        onClose={() => setIsOpenDraw(false)}
        visible={isOpenDrawer}
        destroyOnClose={true}
        className="drawer-mobile"
        height="auto"
      >
        <div className="drawer-mobile-content">
          <Link className="logo" to="/">
            <img src={zoobcLogo} alt="zoobc-logo" />
            <div className="header-logo-name">
              <div className="logo-text-name">ZooBC Explorer</div>
              <div className="logo-text-version">Alpha - Version 0.1</div>
            </div>
          </Link>
          <Menu className="header-menu" selectedKeys={[location.pathname]}>
            <Menu.Item key="/blocks" className="menu-with-icon">
              <Link to="/blocks">{t('blocks')}</Link>
            </Menu.Item>
            <Menu.Item key="/transactions" className="menu-with-icon">
              <Link to="/transactions">{t('transactions')}</Link>
            </Menu.Item>
            <Menu.Item key="/accounts" className="menu-with-icon">
              <Link to="/accounts">{t('accounts')}</Link>
            </Menu.Item>
            <Menu.Item key="/nodes" className="menu-with-icon">
              <Link to="/nodes">{t('nodes')}</Link>
            </Menu.Item>
            {/* <Menu.Item key="/login" className="menu-with-icon">
              <a href="#" onClick={onLogin}>
                {t('login')}
              </a>
            </Menu.Item> */}
          </Menu>
          <Search
            className="header-search-input"
            prefix={<Icon className="header-search-icon" type="search" />}
            placeholder={t('please input keyword')}
            enterButton={loading ? <Spin indicator={Spinner} /> : t('search')}
            onSearch={onSearch}
          />
        </div>
      </Drawer>
    </>
  )
}

export default withRouter(Header)
