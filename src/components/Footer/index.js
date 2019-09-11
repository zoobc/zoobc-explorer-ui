import React from 'react'
import { Row, Col } from 'reactstrap'
import { useTranslation } from 'react-i18next'

import logo from '../../assets/images/zoobc.svg'
// import languages from '../../languages'
import SmallerDeviceFooter from './SmallerDeviceFooter'
import Container from '../Container'

export default function Footer() {
  const { t } = useTranslation()
  // const [lang, setLang] = useState('en')

  // const changeLanguage = e => {
  //   setLang(e.target.value)
  //   i18n.changeLanguage(e.target.value)
  // }

  return (
    <div className="footer">
      <SmallerDeviceFooter className="d-md-none" />
      <Container className="footer-body d-none d-md-block" fluid>
        <Row className="footer-logo-row">
          <Col className="col-md-12">
            <div className="company-logo">
              <a className="footer-brand" href="https://blockchainzoo.com/">
                <img className="img-fluid" alt="logo" src={logo} />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="footer-text-row">
          <Col className="col-md-3">
            <p className="footer-info-text">
              {t(
                'A webview for searching and displaying data published, so that a user can easily find any info about blockchain'
              )}
            </p>
            <div className="footer-social-icons">
              <a
                className="footer-social-icon"
                href="https://github.com/BlockchainZoo/spinechain-explorer-prototype"
                rel="noopener noreferrer"
                target="_blank"
                title="GitHub"
              >
                <i className="fab fa-github mx-2" />
              </a>
              <a
                className="footer-social-icon"
                href="https://www.linkedin.com/company/blockchainzoo/"
                rel="noopener noreferrer"
                target="_blank"
                title="LinkedIn"
              >
                <i className="fab fa-linkedin mx-2" />
              </a>
              <a
                className="footer-social-icon"
                href="https://www.youtube.com/channel/UCiFJtJ4gQX5P8Uh7_Onp4qQ"
                rel="noopener noreferrer"
                target="_blank"
                title="Youtube"
              >
                <i className="fab fa-youtube mx-2" />
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
          </Col>
          <Col className="col-md-3 footer-list">
            <h3 className="footer-subtitle text-white heading-border">{t('Product')}</h3>
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
                {t('White Papper')}
              </a>
            </ul>
          </Col>
          <Col className="col-md-3 footer-list">
            <h3 className="footer-subtitle text-white heading-border">{t('Community')}</h3>
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
          <Col className="col-md-3 footer-list">
            <h3 className="footer-subtitle text-white heading-border">{t('Company')}</h3>
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
          {/* <Col className="pr-0" md="4" lg="3">
            <FormGroup className="d-flex align-items-center justify-content-right footer-nav py-1">
              <Input type="select" value={lang} onChange={changeLanguage}>
                {languages.map((language, key) => (
                  <option key={key} value={language.value}>
                    {language.label}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col> */}
        </Row>
      </Container>
    </div>
  )
}
