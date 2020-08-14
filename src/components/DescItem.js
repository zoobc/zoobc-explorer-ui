import React from 'react'
import PropTypes from 'prop-types'

import { Col, Row, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { InfoCircleOutlined } from '@ant-design/icons'

const DescItem = ({ label, text, style, value }) => {
  const { t } = useTranslation()
  return (
    <Row>
      <Col md={{ span: 5 }} sm={{ span: 24 }}>
        <label>
          <strong>{t(label)}</strong>{' '}
          <Tooltip placement="bottom" title={text}>
            <InfoCircleOutlined style={style} />
          </Tooltip>
        </label>
      </Col>
      <Col md={{ span: 19 }} sm={{ span: 24 }}>
        <div className="truncate">{(!!value || value === 0) && value}</div>
      </Col>
    </Row>
  )
}

DescItem.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

export default DescItem
