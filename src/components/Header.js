import React from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'

import Container from './Container'

const Header = () => {
  return (
    <Layout.Header className="header">
      <Container className="header-content" fluid>
        <div className="logo">
          <img src="https://zoobc.org/Themes/default/images/logo.png" alt="zoobc-logo" />
        </div>
        <div className="navbar-right">
          <Menu
            theme="dark"
            mode="horizontal"
            // defaultSelectedKeys={['2']}
          >
            <Menu.Item key="1">
              <div className="menu-with-icon">
                <Link to="/v1/blocks">
                  <i className="bcz-block"></i>
                  Blocks
                </Link>
              </div>
            </Menu.Item>
            <Menu.Item key="2">
              <div className="menu-with-icon">
                <Link to="/v1/transactions">
                  <i className="bcz-transaction"></i>
                  Transactions
                </Link>
              </div>
            </Menu.Item>
            <Menu.Item key="3">
              <div className="menu-with-icon">
                <Link to="/v1/accounts">
                  <i className="bcz-user"></i>
                  Accounts
                </Link>
              </div>
            </Menu.Item>
            <Menu.Item key="4">
              <div className="menu-with-icon">
                <Link to="/v1/nodes">
                  <i className="bcz-node"></i>
                  Nodes
                </Link>
              </div>
            </Menu.Item>
          </Menu>
        </div>
        <div className="navbar-left">
          <Menu theme="dark" mode="horizontal">
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
