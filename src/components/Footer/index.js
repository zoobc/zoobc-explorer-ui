import React from 'react'
import { Row, Col } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import { Switch } from 'antd'
import Container from '../Container'

export default function Footer() {
  const { t } = useTranslation()

  function handleChange(value) {
    console.log(`selected ${value}`)
  }
  // const [lang, setLang] = useState('en')

  // const changeLanguage = e => {
  //   setLang(e.target.value)
  //   i18n.changeLanguage(e.target.value)
  // }

  return (
    <div className="footer">
      <Container className="footer-body">
        <Row>
          <Col className="col-md-3">
            <h3 className="footer-subtitle text-white heading-border">{t('ZooBC')}</h3>
            <hr style={{ backgroundColor: '#E7EAF3', height: 0 }} />
            <ul className="footer-list-group-item">
              <p>&#169; 2019 ZooBC.com</p>
              <p>All rights reserved.</p>
              <p>v0.0.1-alpha.1</p>
            </ul>
          </Col>
          <Col className="col-md-3">
            <h3 className="footer-subtitle text-white heading-border">{t('Product')}</h3>
            <hr style={{ backgroundColor: '#E7EAF3', height: 0 }} />
            <ul className="footer-list-group mb-0">
              <a className="footer-list-group-item" href="https://blockchainzoo.com/">
                {t('ZooBC Core')}
              </a>
              <a className="footer-list-group-item" href="https://blockchainzoo.com/">
                {t('ZooBC Explorer')}
              </a>
              <a className="footer-list-group-item" href="https://blockchainzoo.com/">
                {t('ZooBC Wallet')}
              </a>
              <a className="footer-list-group-item" href="https://blockchainzoo.com/">
                {t('Whitepaper')}
              </a>
            </ul>
          </Col>
          <Col className="col-md-3">
            <h3 className="footer-subtitle text-white heading-border">{t('Community')}</h3>
            <hr style={{ backgroundColor: '#E7EAF3', height: 0 }} />
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
                {t('Roadmap')}
              </a>
            </ul>
          </Col>
          <Col className="col-md-3">
            <h3 className="footer-subtitle text-white heading-border">{t('Company')}</h3>
            <hr style={{ backgroundColor: '#E7EAF3', height: 0 }} />
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
        <hr style={{ backgroundColor: '#013558', height: 0, paddingLeft: '4px' }} />
        <Row className="footer-ext">
          <Switch className="btn-switch" />
          <p style={{ marginTop: '6px', paddingLeft: '7px', color: '#fff' }}>Enable night mode</p>
          <select style={{ marginLeft: '22px' }} defaultValue="english" onChange={handleChange}>
            <option value="english">English</option>
          </select>
          <div className="footer-social-icons">
            <a
              className="footer-social-icon"
              href="https://t.me/ZooBlockchain"
              rel="noopener noreferrer"
              target="_blank"
              title="Telegram"
            >
              <i className="fab fa-telegram mx-2" />
            </a>
            <a
              className="footer-social-icon"
              href="https://t.me/ZooBlockchain"
              rel="noopener noreferrer"
              target="_blank"
              title="Telegram"
            >
              <i className="fab fa-telegram mx-2" />
            </a>
            <a
              className="footer-social-icon"
              href="https://t.me/ZooBlockchain"
              rel="noopener noreferrer"
              target="_blank"
              title="Telegram"
            >
              <i className="fab fa-telegram mx-2" />
            </a>
            <a
              className="footer-social-icon"
              href="https://t.me/ZooBlockchain"
              rel="noopener noreferrer"
              target="_blank"
              title="Telegram"
            >
              <i className="fab fa-telegram mx-2" />
            </a>
            <a
              className="footer-social-icon"
              href="https://t.me/ZooBlockchain"
              rel="noopener noreferrer"
              target="_blank"
              title="Telegram"
            >
              <i className="fab fa-telegram mx-2" />
            </a>
            <a
              className="footer-social-icon"
              href="https://t.me/ZooBlockchain"
              rel="noopener noreferrer"
              target="_blank"
              title="Telegram"
            >
              <i className="fab fa-telegram mx-2" />
            </a>
          </div>
        </Row>
      </Container>
    </div>
  )
}
