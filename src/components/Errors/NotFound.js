import React from 'react'
import notFound from '../../assets/images/not-found.svg'
import Container from '../Container'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const NotFound = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <div className="error-content">
        <img src={notFound} alt="not found" />
        <span className="error-title page-title">
        {t('sorry the page you are looking for is not found')}
        </span>
        <Link to="/">
          <Button type="primary">{t('back to homepage')}</Button>
        </Link>
      </div>
    </Container>
  )
}

export default NotFound
