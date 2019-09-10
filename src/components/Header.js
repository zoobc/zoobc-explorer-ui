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
              <Link to="/v1/blocks">Blocks</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/v1/transactions">Transactions</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/v1/accounts">Accounts</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/v1/nodes">Nodes</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/v1/statistics">Statistics</Link>
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
