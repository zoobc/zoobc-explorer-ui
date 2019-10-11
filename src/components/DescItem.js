import React from 'react'
import PropTypes from 'prop-types'

import { Col, Row } from 'antd'
import { useTranslation } from 'react-i18next'

const DescItem = ({ label, value }) => {
  const { t } = useTranslation()
  return (
    <Row>
      <Col span={5}>
        <label>
          <strong>{t(label)}</strong>
        </label>
      </Col>
      <Col span={19}>
        <label>{(!!value || value === 0) && value}</label>
      </Col>
    </Row>
  )
}

DescItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

export default DescItem
