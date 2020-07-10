import React from 'react'
import loader from '../../assets/images/blocks-loader.svg'

function LoaderImg() {
  return <img style={{ width: '50px', height: '50px', zIndex: 696969 }} src={loader} alt="loader" />
}

function Loader() {
  return (
    <div className="d-flex justify-content-center m-4 ">
      <LoaderImg />
    </div>
  )
}

export default Loader
