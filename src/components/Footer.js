import React from 'react'
import { useTranslation } from 'react-i18next'
import { Switch, Menu, Dropdown, Avatar, Layout, Row, Col } from 'antd'
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

const Footer = () => {
  const { t, i18n } = useTranslation()

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

  return (
    <Layout.Footer className="footer">
      <Container>
        <Row className="footer-logo">
          <Col>
            <Link className="footer-link-logo" to="/">
              <img src={zoobcLogo} alt="zoobc-logo" />
              <div className="footer-link-text">ZooBC.net</div>
            </Link>
          </Col>
        </Row>
        <Row className="footer-row">
          <Col className="footer-company">
            <ul className="footer-company-info">
              <p className="footer-company-text">
                &#169; 2019 ZooBC.net
                <br />
                All rights reserved.
                <br />
                v0.0.1-alpha.1
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
            </ul>
          </Col>
        </Row>
        <hr className="footer-horizontal-rule-dark" />
        <Row className="footer-ext">
          <Switch checkedChildren="☀" unCheckedChildren="☾" defaultChecked />
          <Dropdown overlay={languageOptions}>
            <p className="footer-language ">
              <Avatar className="mr-1" shape="square" size={18} src={selectedLang().flag} />
              {selectedLang().label}
            </p>
          </Dropdown>
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
  )
}

export default Footer
