/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Switch,
  Menu,
  Dropdown,
  Avatar,
  Layout,
  Row,
  Col,
  List,
  Button,
  Drawer,
  Collapse,
} from 'antd'
import { Link } from 'react-router-dom'
import Container from './Container'
import languages from '../languages'

import iconGitHub from '../assets/images/github.svg'
import iconMedium from '../assets/images/medium.svg'
import iconYoutube from '../assets/images/youtube.svg'
import iconTelegram from '../assets/images/telegram.svg'
import iconForum from '../assets/images/forum.svg'
import iconBlog from '../assets/images/blog.svg'
import zoobcLogo from '../assets/images/logo-zoobc.svg'
import TestnetContext from '../context/TestnetContext'
import testnet from '../config/testnet'
import FormFeedback from './FormFeedback'

const Footer = () => {
  const { t, i18n } = useTranslation()
  const { selectedTestnet, onChangeSelectedTestnet } = useContext(TestnetContext)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  const onSelectNetwork = data => {
    onChangeSelectedTestnet(data)
    setIsOpen(false)
  }

  const selectedLang = () => {
    const getLang = languages.filter(lang => lang.value === i18n.language)[0]
    return getLang
  }

  const languageOptions = () => {
    return (
      <Menu>
        {languages.map((lang, key) => (
          <Menu.Item key={key} onClick={() => i18n.changeLanguage(lang.value)}>
            <p className="my-0">
              <Avatar shape="square" size={18} src={lang.flag} className="mr-1" />
              {lang.label}
            </p>
          </Menu.Item>
        ))}
      </Menu>
    )
  }

  const FooterMobile = () => (
    <div className="footer-mobile d-block d-md-none">
      <Collapse expandIconPosition="right">
        <Collapse.Panel header="Product" key="1">
          <ul className="footer-list-group mb-0">
            <a className="footer-list-group-item" href="https://blockchainzoo.com">
              {t('ZooBC Core')}
            </a>
            <a className="footer-list-group-item" href="https://blockchainzoo.com">
              {t('ZooBC Wallet')}
            </a>
            <a className="footer-list-group-item" href="https://blockchainzoo.com">
              {t('ZooBC Explorer')}
            </a>
            <a className="footer-list-group-item" href="https://blockchainzoo.com">
              {t('Whitepaper')}
            </a>
          </ul>
        </Collapse.Panel>
        <Collapse.Panel header="Community" key="2">
          <ul className="footer-list-group mb-0">
            <a className="footer-list-group-item" href="https://blockchainzoo.com">
              {t('Getting Started')}
            </a>
            <a className="footer-list-group-item" href="https://blockchainzoo.com">
              {t('Developer APIs')}
            </a>
            <a className="footer-list-group-item" href="https://blockchainzoo.com">
              {t('Research')}
            </a>
            <a className="footer-list-group-item" href="https://blockchainzoo.com">
              {t('Roadmap')}
            </a>
          </ul>
        </Collapse.Panel>
        <Collapse.Panel header="Company" key="3">
          <ul className="footer-list-group mb-0">
            <a className="footer-list-group-item" href="https://blockchainzoo.com">
              {t('About Us')}
            </a>
            <a className="footer-list-group-item" href="https://blockchainzoo.com">
              {t('Contact Us')}
            </a>
            <a className="footer-list-group-item" href="https://blockchainzoo.com">
              {t('Terms of Service')}
            </a>
            <a className="footer-list-group-item" href="https://blockchainzoo.com">
              {t('Privacy Policy')}
            </a>
            <a className="footer-list-group-item" href="#" onClick={() => setIsOpenDialog(true)}>
              {t('Feedback')}
            </a>
          </ul>
        </Collapse.Panel>
      </Collapse>
      <div className="footer-mobile-copyright">
        <div className="footer-logo">
          <Link className="footer-link-logo" to="/">
            <img src={zoobcLogo} alt="zoobc-logo" />
            <div className="footer-logo-name">
              <div className="logo-text-name">ZooBC Explorer</div>
              <div className="logo-text-version">Alpha - Version 0.1</div>
            </div>
          </Link>
        </div>
        <ul className="footer-company-info">
          <p className="footer-company-text">
            &#169; 2019 ZooBC Explorer All rights reserved.
                </p>
        </ul>
      </div>
      <hr className="footer-horizontal-rule-dark" />
      <div className="footer-social-icons">
        <a
          className="footer-social-icon"
          href="https://github.com/zoobc"
          rel="noopener norefferer"
          title="GitHub"
        >
          <img src={iconGitHub} alt="social-icon" />
        </a>
        <a
          className="footer-social-icon"
          href="https://medium.com/@BlockchainZoo"
          rel="noopener norefferer"
          title="Medium"
        >
          <img src={iconMedium} alt="social-icon" />
        </a>
        <a
          className="footer-social-icon"
          href="https://youtube.com/c/BlockchainZoo"
          rel="noopener norefferer"
          title="Youtube"
        >
          <img src={iconYoutube} alt="social-icon" />
        </a>
        <a
          className="footer-social-icon"
          href="https://t.me/ZooBlockchain"
          rel="noopener norefferer"
          title="Telegram"
        >
          <img src={iconTelegram} alt="social-icon" />
        </a>
        <a
          className="footer-social-icon"
          href="https://zoobc.org"
          rel="noopener norefferer"
          title="Forum"
        >
          <img src={iconForum} alt="social-icon" />
        </a>
        <a
          className="footer-social-icon"
          href="https://blogchainzoo.com"
          rel="noopener norefferer"
          title="Blog"
        >
          <img src={iconBlog} alt="social-icon" />
        </a>
      </div>
      <div className="py-2 text-center">
        <Switch checkedChildren="☀" unCheckedChildren="☾" defaultChecked className="d-none" />
        <Dropdown overlay={languageOptions}>
          <p className="footer-language ">
            <Avatar className="mr-1" shape="square" size={18} src={selectedLang().flag} />
            {selectedLang().label}
          </p>
        </Dropdown>
        <Button className="ml-3" type="primary" size="small" onClick={() => setIsOpen(true)}>
          Network: {selectedTestnet.name}
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <Layout.Footer className="footer">
        <Container>
          <FooterMobile />
          <Row className="footer-row d-none d-md-block">
            <Col className="footer-company">
              <div className="footer-logo">
                <Link className="footer-link-logo" to="/">
                  <img src={zoobcLogo} alt="zoobc-logo" />
                  <div className="footer-logo-name">
                    <div className="logo-text-name">ZooBC Explorer</div>
                    <div className="logo-text-version">Alpha - Version 0.1</div>
                  </div>
                </Link>
              </div>
              <ul className="footer-company-info">
                <p className="footer-company-text">
                  &#169; 2019 ZooBC Explorer All rights reserved.
                </p>
              </ul>
            </Col>
            <Col className="footer-col-info">
              <h3 className="footer-subtitle heading-border">{t('Product')}</h3>
              <hr className="footer-horizontal-rule-light" />
              <ul className="footer-list-group mb-0">
                <a className="footer-list-group-item" href="https://blockchainzoo.com">
                  {t('ZooBC Core')}
                </a>
                <a className="footer-list-group-item" href="https://blockchainzoo.com">
                  {t('ZooBC Wallet')}
                </a>
                <a className="footer-list-group-item" href="https://blockchainzoo.com">
                  {t('ZooBC Explorer')}
                </a>
                <a className="footer-list-group-item" href="https://blockchainzoo.com">
                  {t('Whitepaper')}
                </a>
              </ul>
            </Col>
            <Col className="footer-col-info">
              <h3 className="footer-subtitle heading-border">{t('Community')}</h3>
              <hr className="footer-horizontal-rule-light" />
              <ul className="footer-list-group mb-0">
                <a className="footer-list-group-item" href="https://blockchainzoo.com">
                  {t('Getting Started')}
                </a>
                <a className="footer-list-group-item" href="https://blockchainzoo.com">
                  {t('Developer APIs')}
                </a>
                <a className="footer-list-group-item" href="https://blockchainzoo.com">
                  {t('Research')}
                </a>
                <a className="footer-list-group-item" href="https://blockchainzoo.com">
                  {t('Roadmap')}
                </a>
              </ul>
            </Col>
            <Col className="footer-col-info">
              <h3 className="footer-subtitle heading-border">{t('Company')}</h3>
              <hr className="footer-horizontal-rule-light" />
              <ul className="footer-list-group mb-0">
                <a className="footer-list-group-item" href="https://blockchainzoo.com">
                  {t('About Us')}
                </a>
                <a className="footer-list-group-item" href="https://blockchainzoo.com">
                  {t('Contact Us')}
                </a>
                <a className="footer-list-group-item" href="https://blockchainzoo.com">
                  {t('Terms of Service')}
                </a>
                <a className="footer-list-group-item" href="https://blockchainzoo.com">
                  {t('Privacy Policy')}
                </a>
                <a
                  className="footer-list-group-item"
                  href="#"
                  onClick={() => setIsOpenDialog(true)}
                >
                  {t('Feedback')}
                </a>
              </ul>
            </Col>
          </Row>
          <hr className="footer-horizontal-rule-dark d-none d-md-block" />
          <Row className="footer-ext d-none d-md-block">
            <Switch checkedChildren="☀" unCheckedChildren="☾" defaultChecked className="d-none" />
            <Dropdown overlay={languageOptions}>
              <p className="footer-language ">
                <Avatar className="mr-1" shape="square" size={18} src={selectedLang().flag} />
                {selectedLang().label}
              </p>
            </Dropdown>
            <Button className="ml-3" type="primary" size="small" onClick={() => setIsOpen(true)}>
              Network: {selectedTestnet.name}
            </Button>
            <div className="footer-social-icons">
              <a
                className="footer-social-icon"
                href="https://github.com/zoobc"
                rel="noopener norefferer"
                title="GitHub"
              >
                <img src={iconGitHub} alt="social-icon" />
              </a>
              <a
                className="footer-social-icon"
                href="https://medium.com/@BlockchainZoo"
                rel="noopener norefferer"
                title="Medium"
              >
                <img src={iconMedium} alt="social-icon" />
              </a>
              <a
                className="footer-social-icon"
                href="https://youtube.com/c/BlockchainZoo"
                rel="noopener norefferer"
                title="Youtube"
              >
                <img src={iconYoutube} alt="social-icon" />
              </a>
              <a
                className="footer-social-icon"
                href="https://t.me/ZooBlockchain"
                rel="noopener norefferer"
                title="Telegram"
              >
                <img src={iconTelegram} alt="social-icon" />
              </a>
              <a
                className="footer-social-icon"
                href="https://zoobc.org"
                rel="noopener norefferer"
                title="Forum"
              >
                <img src={iconForum} alt="social-icon" />
              </a>
              <a
                className="footer-social-icon"
                href="https://blogchainzoo.com"
                rel="noopener norefferer"
                title="Blog"
              >
                <img src={iconBlog} alt="social-icon" />
              </a>
            </div>
          </Row>
        </Container>
      </Layout.Footer>
      <Drawer
        title="Select Network"
        placement="right"
        onClose={() => setIsOpen(false)}
        visible={isOpen}
        destroyOnClose={true}
      >
        <List
          itemLayout="horizontal"
          dataSource={testnet}
          renderItem={item => (
            <List.Item>
              <Button
                type="link"
                size="large"
                className="d-flex align-items-center p-0"
                block
                onClick={() => onSelectNetwork(item)}
              >
                <Avatar size="large" className="mr-2" style={{ backgroundColor: item.color }}>
                  {item.name}
                </Avatar>
                <p className="mb-0">{item.name}</p>
              </Button>
            </List.Item>
          )}
        />
      </Drawer>
      <FormFeedback
        visible={isOpenDialog}
        title="Feedback"
        onClose={() => setIsOpenDialog(false)}
      />
    </>
  )
}

export default Footer
