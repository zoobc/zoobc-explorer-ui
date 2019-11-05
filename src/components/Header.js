import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Input, Icon, Tooltip, Spin, Button, Drawer, List, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useSearch from '../hooks/useSearch'
import Container from './Container'
import zoobcLogo from '../assets/images/logo-zoobc.svg'
import tesnet from '../config/tesnet'
import TesnetContext from '../context/TesnetContext'

const { Search } = Input

const Spinner = <Icon type="loading" style={{ fontSize: 20, color: 'white' }} spin />

const Header = ({ history, location, fluid }) => {
  const { t } = useTranslation()
  const [keyword, setKeyword] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { selectedTestnet, onChangeSelectedTestnet } = useContext(TesnetContext)
  const { doSearch, loading } = useSearch(keyword, history)

  const onSearch = value => {
    const searchKeyword = value.trim()

    if (!!searchKeyword) {
      setKeyword(searchKeyword)
      doSearch()
    }
  }

  const onSelectNetwork = data => {
    onChangeSelectedTestnet(data)
    setIsOpen(false)
  }

  return (
    <>
      <Layout.Header className="header">
        <Container className="header-content" fluid={fluid}>
          <Link className="logo" to="/">
            <img src={zoobcLogo} alt="zoobc-logo" />
            <div className="header-logo-name">ZooBC.net</div>
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
            <Button type="primary" onClick={() => setIsOpen(true)}>{selectedTestnet.name}</Button>
          </div>
        </Container>
      </Layout.Header>
      <Drawer
        title="Select Network"
        placement="right"
        onClose={() => setIsOpen(false)}
        visible={isOpen}
        destroyOnClose={true}
      >
        <List
          itemLayout="horizontal"
          dataSource={tesnet}
          renderItem={item => (
            <List.Item>
              <Button
                type="link"
                size="large"
                className="d-flex align-items-center p-0"
                block
                onClick={() => onSelectNetwork(item)}
              >
                <Avatar size="large" className="mr-2" style={{ backgroundColor: item.color }}>{item.name}</Avatar>
                <p className="mb-0">{item.name}</p>
              </Button>
            </List.Item>
          )}
        />
      </Drawer>
    </>
  )
}

export default withRouter(Header)
