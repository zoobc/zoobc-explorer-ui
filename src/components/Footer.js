/* eslint-disable react/jsx-no-target-blank */
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
import ComingSoon from './ComingSoon'
import { store } from '../utils'

const Footer = () => {
  const { t, i18n } = useTranslation()
  const { selectedTestnet, onChangeSelectedTestnet } = useContext(TestnetContext)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenFeedback, setIsOpenFeedback] = useState(false)
  const [isOpenComingSoon, setIsOpenCommingSoon] = useState(false)
  const [dialogTitle, setDialogTitle] = useState()

  const onSelectNetwork = data => {
    onChangeSelectedTestnet(data)
    setIsOpen(false)
    window.location.reload()
  }

  const selectedLang = () => {
    const getLang = languages.filter(lang => lang.value === i18n.language)[0]
    return getLang
  }

  const onSelectLanguage = lang => {
    const selectedLang = store.set('language', lang.value)
    i18n.changeLanguage(selectedLang)
  }

  const languageOptions = () => {
    return (
      <Menu>
        {languages.map((lang, key) => (
          <Menu.Item key={key} onClick={() => onSelectLanguage(lang)}>
            <p className="my-0">
              <Avatar shape="square" size={18} src={lang.flag} alt={lang.alt} className="mr-1" />
              {lang.label}
            </p>
          </Menu.Item>
        ))}
      </Menu>
    )
  }

  const onComingSoon = e => {
    e.preventDefault()
    setDialogTitle()
    setIsOpenCommingSoon(true)
  }

  const onFeedback = e => {
    e.preventDefault()
    setIsOpenFeedback(true)
  }

  const FooterMobile = () => (
    <div className="footer-mobile d-block d-md-none">
      <Collapse expandIconPosition="right">
        <Collapse.Panel header="Product" key="1">
          <ul className="footer-list-group mb-0 list-unstyled">
            <li className="d-none">
              <a className="footer-list-group-item d-none" onClick={onComingSoon}>
                {t('ZooBC Core')}
              </a>
            </li>
            <li>
              <a
                className="footer-list-group-item"
                target="_blank"
                rel="noopener noreferrer"
                href="http://zoobc.one"
              >
                {t('ZooBC Wallet')}
              </a>
            </li>
            <li>
              <a
                className="footer-list-group-item"
                rel="noopener noreferrer"
                href="http://zoobc.net"
              >
                {t('ZooBC Explorer')}
              </a>
            </li>
            <li>
              <a
                className="footer-list-group-item"
                target="_blank"
                rel="noopener noreferrer"
                href="https://zoobc.com/ZooBC%20Whitepaper%20Draft%20-%20V0.2.pdf"
              >
                {t('Whitepaper')}
              </a>
            </li>
          </ul>
        </Collapse.Panel>
        <Collapse.Panel header="Community" key="2">
          <ul className="footer-list-group mb-0 list-unstyled">
            <li>
              <a className="footer-list-group-item" onClick={onComingSoon}>
                {t('Getting Started')}
              </a>
            </li>
            <li>
              <a className="footer-list-group-item" onClick={onComingSoon}>
                {t('Developer APIs')}
              </a>
            </li>
            <li>
              <a className="footer-list-group-item" onClick={onComingSoon}>
                {t('Research')}
              </a>
            </li>
            <li>
              <a
                className="footer-list-group-item"
                target="_blank"
                rel="noopener noreferrer"
                href="https://zoobc.com/#current_roadmap__item"
              >
                {t('Roadmap')}
              </a>
            </li>
          </ul>
        </Collapse.Panel>
        <Collapse.Panel header="Company" key="3">
          <ul className="footer-list-group mb-0 list-unstyled">
            <li>
              <a className="footer-list-group-item" onClick={onComingSoon}>
                {t('About Us')}
              </a>
            </li>
            <li>
              <a className="footer-list-group-item" onClick={onComingSoon}>
                {t('Contact Us')}
              </a>
            </li>
            <li>
              <a className="footer-list-group-item" onClick={onComingSoon}>
                {t('Terms of Service')}
              </a>
            </li>
            <li>
              <a className="footer-list-group-item" onClick={onComingSoon}>
                {t('Privacy Policy')}
              </a>
            </li>
            <li>
              <a className="footer-list-group-item" onClick={() => setIsOpenFeedback(true)}>
                {t('Feedback')}
              </a>
            </li>
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
        <ul className="footer-company-info list-unstyled">
          <li>
            <p className="footer-company-text">&#169; 2019 ZooBC Explorer All rights reserved.</p>
          </li>
        </ul>
      </div>
      <hr className="footer-horizontal-rule-dark" />
      <div className="footer-social-icons">
        <a
          className="footer-social-icon"
          href="https://github.com/zoobc"
          target="_blank"
          rel="noopener norefferer"
          title="GitHub"
        >
          <img src={iconGitHub} alt="github-icon" />
        </a>
        <a
          className="footer-social-icon"
          href="https://medium.com/@BlockchainZoo"
          target="_blank"
          rel="noopener norefferer"
          title="Medium"
        >
          <img src={iconMedium} alt="medium-icon" />
        </a>
        <a
          className="footer-social-icon"
          href="https://youtube.com/c/BlockchainZoo"
          target="_blank"
          rel="noopener norefferer"
          title="Youtube"
        >
          <img src={iconYoutube} alt="youtube-icon" />
        </a>
        <a
          className="footer-social-icon"
          href="https://t.me/ZooBlockchain"
          target="_blank"
          rel="noopener norefferer"
          title="Telegram"
        >
          <img src={iconTelegram} alt="telegram-icon" />
        </a>
        <a
          className="footer-social-icon"
          href="https://zoobc.org"
          target="_blank"
          rel="noopener norefferer"
          title="Forum"
        >
          <img src={iconForum} alt="forum-icon" />
        </a>
        <a
          className="footer-social-icon"
          href="https://blogchainzoo.com"
          target="_blank"
          rel="noopener norefferer"
          title="Blog"
        >
          <img src={iconBlog} alt="blog-icon" />
        </a>
      </div>
      <div className="py-2 text-center">
        <Switch checkedChildren="☀" unCheckedChildren="☾" defaultChecked className="d-none" />
        <Dropdown overlay={languageOptions}>
          <p className="footer-language ">
            <Avatar
              className="mr-1"
              shape="square"
              size={18}
              src={selectedLang().flag}
              alt="selected-lang"
            />
            {selectedLang().label}
          </p>
        </Dropdown>
        <Button className="ml-3" type="primary" size="small" onClick={() => setIsOpen(true)}>
          {t('Network')}: {selectedTestnet.name}
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
              <ul className="footer-company-info list-unstyled">
                <li>
                  <p className="footer-company-text">
                    &#169; 2019 ZooBC Explorer. All rights reserved.
                  </p>
                </li>
              </ul>
            </Col>
            <Col className="footer-col-info">
              <h3 className="footer-subtitle heading-border">{t('Product')}</h3>
              <hr className="footer-horizontal-rule-light" />
              <ul className="footer-list-group mb-0 list-unstyled">
                <li className="d-none">
                  <a className="footer-list-group-item d-none" href="#" onClick={onComingSoon}>
                    {t('ZooBC Core')}
                  </a>
                </li>
                <li>
                  <a
                    className="footer-list-group-item"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://zoobc.one"
                  >
                    {t('ZooBC Wallet')}
                  </a>
                </li>
                <li>
                  <a
                    className="footer-list-group-item"
                    rel="noopener noreferrer"
                    href="http://zoobc.net"
                  >
                    {t('ZooBC Explorer')}
                  </a>
                </li>
                <li>
                  <a
                    className="footer-list-group-item"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://zoobc.com/ZooBC%20Whitepaper%20Draft%20-%20V0.2.pdf"
                  >
                    {t('Whitepaper')}
                  </a>
                </li>
              </ul>
            </Col>
            <Col className="footer-col-info">
              <h3 className="footer-subtitle heading-border">{t('Community')}</h3>
              <hr className="footer-horizontal-rule-light" />
              <ul className="footer-list-group mb-0 list-unstyled">
                <li>
                  <a className="footer-list-group-item" href="#" onClick={onComingSoon}>
                    {t('Getting Started')}
                  </a>
                </li>
                <li>
                  <a className="footer-list-group-item" href="#" onClick={onComingSoon}>
                    {t('Developer APIs')}
                  </a>
                </li>
                <li>
                  <a className="footer-list-group-item" href="#" onClick={onComingSoon}>
                    {t('Research')}
                  </a>
                </li>
                <li>
                  <a
                    className="footer-list-group-item"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://zoobc.com/#current_roadmap__item"
                  >
                    {t('Roadmap')}
                  </a>
                </li>
              </ul>
            </Col>
            <Col className="footer-col-info">
              <h3 className="footer-subtitle heading-border">{t('Company')}</h3>
              <hr className="footer-horizontal-rule-light" />
              <ul className="footer-list-group mb-0 list-unstyled">
                <li>
                  <a className="footer-list-group-item" href="#" onClick={onComingSoon}>
                    {t('About Us')}
                  </a>
                </li>
                <li>
                  <a className="footer-list-group-item" href="#" onClick={onComingSoon}>
                    {t('Contact Us')}
                  </a>
                </li>
                <li>
                  <a className="footer-list-group-item" href="#" onClick={onComingSoon}>
                    {t('Terms of Service')}
                  </a>
                </li>
                <li>
                  <a className="footer-list-group-item" href="#" onClick={onComingSoon}>
                    {t('Privacy Policy')}
                  </a>
                </li>
                <li>
                  <a className="footer-list-group-item" href="#" onClick={onFeedback}>
                    {t('Feedback')}
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
          <hr className="footer-horizontal-rule-dark d-none d-md-block" />
          <Row className="footer-ext d-none d-md-block">
            <Switch checkedChildren="☀" unCheckedChildren="☾" defaultChecked className="d-none" />
            <Dropdown overlay={languageOptions}>
              <p className="footer-language ">
                <Avatar
                  className="mr-1"
                  shape="square"
                  size={18}
                  src={selectedLang().flag}
                  alt="selected-lang"
                />
                {selectedLang().label}
              </p>
            </Dropdown>
            <Button className="ml-3" type="primary" size="small" onClick={() => setIsOpen(true)}>
              {t('Network')}: {selectedTestnet.name}
            </Button>
            <div className="footer-social-icons">
              <a
                className="footer-social-icon"
                href="https://github.com/zoobc"
                target="_blank"
                rel="noopener norefferer"
                title="GitHub"
              >
                <img src={iconGitHub} alt="github-icon" />
              </a>
              <a
                className="footer-social-icon"
                href="https://medium.com/@BlockchainZoo"
                target="_blank"
                rel="noopener norefferer"
                title="Medium"
              >
                <img src={iconMedium} alt="medium-icon" />
              </a>
              <a
                className="footer-social-icon"
                href="https://youtube.com/c/BlockchainZoo"
                target="_blank"
                rel="noopener norefferer"
                title="Youtube"
              >
                <img src={iconYoutube} alt="youtube-icon" />
              </a>
              <a
                className="footer-social-icon"
                href="https://t.me/ZooBlockchain"
                target="_blank"
                rel="noopener norefferer"
                title="Telegram"
              >
                <img src={iconTelegram} alt="telegram-icon" />
              </a>
              <a
                className="footer-social-icon"
                href="https://zoobc.org"
                target="_blank"
                rel="noopener norefferer"
                title="Forum"
              >
                <img src={iconForum} alt="forum-icon" />
              </a>
              <a
                className="footer-social-icon"
                href="https://blogchainzoo.com"
                target="_blank"
                rel="noopener norefferer"
                title="Blog"
              >
                <img src={iconBlog} alt="blog-icon" />
              </a>
            </div>
          </Row>
        </Container>
      </Layout.Footer>
      <ComingSoon
        visible={isOpenComingSoon}
        title={dialogTitle}
        onClose={() => setIsOpenCommingSoon(false)}
      />
      <Drawer
        title={t('Select Network')}
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
                <Avatar
                  size="large"
                  className="mr-2"
                  style={{ backgroundColor: item.color }}
                  alt="item-name"
                >
                  {item.name}
                </Avatar>
                <p className="mb-0">{item.name}</p>
              </Button>
            </List.Item>
          )}
        />
      </Drawer>
      <FormFeedback
        visible={isOpenFeedback}
        title="Feedback"
        onClose={() => setIsOpenFeedback(false)}
      />
    </>
  )
}

export default Footer
