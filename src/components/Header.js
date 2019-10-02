import React from 'react'
import { Layout, Menu, Input } from 'antd'
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
            <Menu.Item key="1">
              <Link to="/">
                <div className="menu-with-icon">Home</div>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/blocks">
                <div className="menu-with-icon">Blocks</div>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/transactions">
                <div className="menu-with-icon">Transactions</div>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/accounts">
                <div className="menu-with-icon">Accounts</div>
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/nodes">
                <div className="menu-with-icon">Nodes</div>
              </Link>
            </Menu.Item>
          </Menu>
        </div>
        <div className="navbar-right">
          <Search
            className="header-search-input"
            // prefix={<Icon type="search" style={{ fontSize: '22px', color: 'rgba(0,0,0,.45)' }} />}
            placeholder="Transaction ID / Block Height"
            // enterButton="SEARCH"
            // size="large"
          />
        </div>
      </Container>
    </Layout.Header>
  )
}

export default Header
