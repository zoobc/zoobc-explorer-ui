import React from 'react'

export default function Error({ isComponent = false }) {
  return (
    <div
      className={`${!isComponent &&
        'error-section container'} d-flex flex-column justify-content-center align-items-center`}
    >
      <p className={isComponent ? 'h5' : 'display-4'}>Oops something went wrong !!</p>
      {!isComponent && <h5>Please try again later</h5>}
    </div>
  )
}
