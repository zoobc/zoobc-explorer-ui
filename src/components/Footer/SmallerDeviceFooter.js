import React, { useState } from 'react'
import { Row, Col, Container, FormGroup, Input, Collapse } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/images/bcz-logo.png'
import languages from '../../languages'

function SmallerDeviceFooter({ className }) {
  const { t, i18n } = useTranslation()
  const [collapseProduct, setCollapseProduct] = useState(true)
  const [collapseCommunity, setCollapseCommunity] = useState(true)
  const [collapseCompany, setCollapseCompany] = useState(true)
  const [lang, setLang] = useState('en')

  const changeLanguage = e => {
    setLang(e.target.value)
    i18n.changeLanguage(e.target.value)
  }
  return (
    <Container className={`${className} footer-collapse`}>
      <Row className="flex-column">
        <Col className={`d-md-none`} xs="12">
          <div className="d-flex" onClick={() => setCollapseProduct(!collapseProduct)}>
            <h4>{t('Product')}</h4>
            <i
              style={{ fontSize: '1.5rem' }}
              className={`fa fa-angle-down align-self-center ml-auto ${!collapseProduct &&
                'transform-icon'}`}
            />
          </div>
          <Collapse isOpen={!collapseProduct}>
            <div className="d-flex flex-column">
              <a href="https://blockchainzoo.com/">{t('ZooBC Blockchain')}</a>
              <a href="https://blockchainzoo.com/">{t('Explorer')}</a>
              <a href="https://blockchainzoo.com/">{t('Wallet')}</a>
              <a href="https://blockchainzoo.com/">{t('Others')}</a>
            </div>
          </Collapse>
          <hr className="border-secondary" />
        </Col>
        <Col className={`d-md-none`} xs="12">
          <div className="d-flex" onClick={() => setCollapseCommunity(!collapseCommunity)}>
            <h4>{t('Community')}</h4>
            <i
              style={{ fontSize: '1.5rem' }}
              className={`fa fa-angle-down align-self-center ml-auto ${!collapseCommunity &&
                'transform-icon'}`}
            />
          </div>
          <Collapse isOpen={!collapseCommunity}>
            <div className="d-flex flex-column">
              <a href="https://blockchainzoo.com/">{t('Getting Started')}</a>
              <a href="https://blockchainzoo.com/">{t('Developer APIs')}</a>
              <a href="https://blockchainzoo.com/">{t('Research')}</a>
              <a href="https://blockchainzoo.com/">{t('Blog')}</a>
            </div>
          </Collapse>
          <hr className="border-secondary" />
        </Col>
        <Col className={`d-md-none`} xs="12">
          <div className="d-flex" onClick={() => setCollapseCompany(!collapseCompany)}>
            <h4>{t('Company')}</h4>
            <i
              style={{ fontSize: '1.5rem' }}
              className={`fa fa-angle-down align-self-center ml-auto ${!collapseCompany &&
                'transform-icon'}`}
            />
          </div>
          <Collapse isOpen={!collapseCompany}>
            <div className="d-flex flex-column">
              <a href="https://blockchainzoo.com/">{t('About Us')}</a>
              <a href="https://blockchainzoo.com/">{t('Contact Us')}</a>
              <a href="https://blockchainzoo.com/">{t('Terms of Service')}</a>
              <a href="https://blockchainzoo.com/">{t('Privacy Policy')}</a>
            </div>
          </Collapse>
          <hr className="border-secondary" />
        </Col>
        <Col xs="12">
          <div className="d-flex flex-column align-items-center">
            <div className="company-logo mb-2">
              <a className="footer-brand" href="https://blockchainzoo.com/">
                <img className="img-fluid" alt="logo" src={logo} />
              </a>
            </div>
            <p className="text-center">
              {t(
                'Spinechain Explorer is application for visualizing and presenting the information and activity ZooBC.'
              )}
            </p>
          </div>
          <div className="footer-social-icons d-flex justify-content-center">
            <a
              className="footer-social-icon"
              href="https://github.com/BlockchainZoo/spinechain-explorer-prototype"
              rel="noopener noreferrer"
              target="_blank"
              title="GitHub"
            >
              <i className="fab fa-github mx-3" />
            </a>
            <a
              className="footer-social-icon"
              href="https://www.linkedin.com/company/blockchainzoo/"
              rel="noopener noreferrer"
              target="_blank"
              title="LinkedIn"
            >
              <i className="fab fa-linkedin mx-3" />
            </a>
            <a
              className="footer-social-icon"
              href="https://www.youtube.com/channel/UCiFJtJ4gQX5P8Uh7_Onp4qQ"
              rel="noopener noreferrer"
              target="_blank"
              title="Youtube"
            >
              <i className="fab fa-youtube mx-3" />
            </a>
            <a
              className="footer-social-icon"
              href="https://t.me/ZooBlockchain"
              rel="noopener noreferrer"
              target="_blank"
              title="Telegram"
            >
              <i className="fab fa-telegram mx-3" />
            </a>
          </div>
        </Col>
        <Col xs="12">
          <FormGroup className="d-flex align-items-center justify-content-right footer-nav py-1">
            <Input type="select" value={lang} onChange={changeLanguage}>
              {languages.map((language, key) => (
                <option key={key} value={language.value}>
                  {language.label}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default SmallerDeviceFooter
