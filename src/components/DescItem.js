import React from 'react'
import PropTypes from 'prop-types'

import { Col } from 'antd'

const DescItem = ({ label, value }) => {
  return (
    <>
      <Col span={4}>
        <label>
          <strong>{label}</strong>
        </label>
      </Col>
      <Col span={20}>
        <label>{!!value ? value : '-'}</label>
      </Col>
    </>
  )
}

DescItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

export default DescItem