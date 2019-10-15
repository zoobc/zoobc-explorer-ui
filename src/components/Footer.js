import React from 'react'
import { Row, Col } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import { Switch, Menu, Dropdown, Avatar } from 'antd'
import Container from './Container'

import iconGitHub from '../assets/images/github.svg'
import iconMedium from '../assets/images/medium.svg'
import iconYoutube from '../assets/images/youtube.svg'
import iconTelegram from '../assets/images/telegram.svg'
import iconForum from '../assets/images/forum.svg'
import iconBlog from '../assets/images/blog.svg'
import languages from '../languages'

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
    <div className="footer">
      <Container className="footer-body">
        <Row>
          <Col className="col-md-3">
            <h3 className="footer-subtitle footer-text-light heading-border">ZooBC</h3>
            <hr className="footer-horizontal-rule-light" />
            <ul className="footer-list-group-item">
              <p>&#169; 2019 ZooBC.com</p>
              <p>All rights reserved.</p>
              <p>v0.0.1-alpha.1</p>
            </ul>
          </Col>
          <Col className="col-md-3">
            <h3 className="footer-subtitle footer-text-light heading-border">{t('Product')}</h3>
            <hr className="footer-horizontal-rule-light" />
            <ul className="footer-list-group mb-0">
              <a className="footer-list-group-item" href="https://blockchainzoo.com/">
                ZooBC Core
              </a>
              <a className="footer-list-group-item" href="https://blockchainzoo.com/">
                ZooBC Explorer
              </a>
              <a className="footer-list-group-item" href="https://blockchainzoo.com/">
                ZooBC Wallet
              </a>
              <a className="footer-list-group-item" href="https://blockchainzoo.com/">
                Whitepaper
              </a>
            </ul>
          </Col>
          <Col className="col-md-3">
            <h3 className="footer-subtitle footer-text-light heading-border">{t('Community')}</h3>
            <hr className="footer-horizontal-rule-light" />
            <ul className="footer-list-group mb-0">
              <a className="footer-list-group-item" href="https://blockchainzoo.com/">
                {t('Getting Started')}
              </a>
              <a className="footer-list-group-item" href="https://blockchainzoo.com/">
                {t('Developer APIs')}
              </a>
              <a className="footer-list-group-item" href="https://blockchainzoo.com/">
                {t('Research')}
              </a>
              <a className="footer-list-group-item" href="https://blockchainzoo.com/">
                Roadmap
              </a>
            </ul>
          </Col>
          <Col className="col-md-3">
            <h3 className="footer-subtitle footer-text-light heading-border">{t('Company')}</h3>
            <hr className="footer-horizontal-rule-light" />
            <ul className="footer-list-group mb-0">
              <a className="footer-list-group-item" href="https://blockchainzoo.com/">
                {t('About Us')}
              </a>
              <a className="footer-list-group-item" href="https://blockchainzoo.com/">
                {t('Contact Us')}
              </a>
              <a className="footer-list-group-item" href="https://blockchainzoo.com/">
                {t('Terms of Service')}
              </a>
              <a className="footer-list-group-item" href="https://blockchainzoo.com/">
                {t('Privacy Policy')}
              </a>
            </ul>
          </Col>
        </Row>
        <hr className="footer-horizontal-rule-dark" />
        <Row className="footer-ext align-items-center">
          <Switch className="btn-switch mt-0" />
          <p className="my-0 ml-2 footer-text-light">{t('Enable night mode')}</p>
          <Dropdown overlay={languageOptions}>
            <p className="my-0 ml-3 footer-text-light">
              <Avatar shape="square" size={18} src={selectedLang().flag} className="mr-1" />
              {selectedLang().label}
            </p>
          </Dropdown>
          <div className="footer-social-icons">
            <a
              className="footer-social-icon"
              href="https://github.com/zoobc"
              rel="noopener noreferrer"
              target="_blank"
              title="GitHub"
            >
              <img src={iconGitHub} alt="social-icon" />
            </a>
            <a
              className="footer-social-icon"
              href="https://medium.com/@BlockchainZoo"
              rel="noopener noreferrer"
              target="_blank"
              title="Medium"
            >
              <img src={iconMedium} alt="social-icon" />
            </a>
            <a
              className="footer-social-icon"
              href="http://youtube.com/c/BlockchainZoo"
              rel="noopener noreferrer"
              target="_blank"
              title="Youtube"
            >
              <img src={iconYoutube} alt="social-icon" />
            </a>
            <a
              className="footer-social-icon"
              href="https://t.me/ZooBlockchain"
              rel="noopener noreferrer"
              target="_blank"
              title="Telegram"
            >
              <img src={iconTelegram} alt="social-icon" />
            </a>
            <a
              className="footer-social-icon"
              href="https://zoobc.org/"
              rel="noopener noreferrer"
              target="_blank"
              title="Forum"
            >
              <img src={iconForum} alt="social-icon" />
            </a>
            <a
              className="footer-social-icon"
              href="https://blogchainzoo.com/"
              rel="noopener noreferrer"
              target="_blank"
              title="Blog"
            >
              <img src={iconBlog} alt="social-icon" />
            </a>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default Footer
