import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Container = ({ children, className, fluid }) => {
  return (
    <div className={classNames({ [className]: !!className, 'container-fluid': !!fluid, container: !fluid })}>
      {children}
    </div>
  )
}

Container.propTypes = {
  className: PropTypes.string,
  fluid: PropTypes.bool,
}

Container.defaultProps = {
  fluid: false
}

export default Container
