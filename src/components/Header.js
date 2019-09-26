import React from 'react'
import { Layout, Menu, Input } from 'antd'
import { Link } from 'react-router-dom'

import Container from './Container'

import zoobcLogo from '../assets/images/zoobc.svg'

const Header = () => {
  return (
    <Layout.Header className="header">
      <Container className="header-content" fluid>
        <Link className="logo" to="/">
          <img src={zoobcLogo} alt="zoobc-logo" />
        </Link>
        <div className="navbar-right">
          <Menu
            theme="dark"
            mode="horizontal"
            // defaultSelectedKeys={['2']}
          >
            <Menu.Item key="1">
              <div className="menu-with-icon">
                <Link to="/blocks">
                  <i className="bcz-block" />
                  Blocks
                </Link>
              </div>
            </Menu.Item>
            <Menu.Item key="2">
              <div className="menu-with-icon">
                <Link to="/transactions">
                  <i className="bcz-transaction" />
                  Transactions
                </Link>
              </div>
            </Menu.Item>
            <Menu.Item key="3">
              <div className="menu-with-icon">
                <Link to="/accounts">
                  <i className="bcz-user" />
                  Accounts
                </Link>
              </div>
            </Menu.Item>
            <Menu.Item key="4">
              <div className="menu-with-icon">
                <Link to="/nodes">
                  <i className="bcz-node" />
                  Nodes
                </Link>
              </div>
            </Menu.Item>
          </Menu>
        </div>
        <div className="navbar-left">
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="en">
              <Input placeholder="Search for a transaction or block hash" style={{ width: 300 }} />
            </Menu.Item>
            <Menu.SubMenu title={<span className="submenu-title-wrapper">English</span>}>
              <Menu.Item key="en">English</Menu.Item>
              <Menu.Item key="id">Indonesia</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>
      </Container>
    </Layout.Header>
  )
}

export default Header
