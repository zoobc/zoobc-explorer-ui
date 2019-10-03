import React from 'react'
import { Layout, Menu, Input, Icon } from 'antd'
import { Link } from 'react-router-dom'

import Container from './Container'
import zoobcLogo from '../assets/images/logo-zoobc.svg'

const { Search } = Input

const Header = () => {
  return (
    <Layout.Header className="header">
      <Container className="header-content">
        <Link className="logo" to="/">
          <img src={zoobcLogo} alt="zoobc-logo" />
        </Link>
        <div className="header-logo-name">ZooBC</div>
        <div className="navbar-left">
          <Menu theme="dark" mode="horizontal" style={{ paddingRight: '0px' }}>
            <Menu.Item key="1" className="menu-with-icon">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2" className="menu-with-icon">
              <Link to="/blocks">Blocks</Link>
            </Menu.Item>
            <Menu.Item key="3" className="menu-with-icon">
              <Link to="/transactions">Transactions</Link>
            </Menu.Item>
            <Menu.Item key="4" className="menu-with-icon">
              <Link to="/accounts">Accounts</Link>
            </Menu.Item>
            <Menu.Item key="5" className="menu-with-icon">
              <Link to="/nodes">Nodes</Link>
            </Menu.Item>
          </Menu>
        </div>
        <div className="navbar-right">
          <Search
            className="header-search-input"
            prefix={<Icon type="search" style={{ fontSize: '22px', color: 'rgba(0,0,0,.45)' }} />}
            placeholder="Transaction ID / Block Height"
            enterButton="SEARCH"
            // size="large"
          />
        </div>
      </Container>
    </Layout.Header>
  )
}

export default Header
