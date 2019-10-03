import React, { useEffect } from 'react'
import topbar from 'topbar'
import Header from './Header'
import LoaderPage from './LoaderPage'
import DefaultLayout from './DefaultLayout'
import Footer from './Footer'

const Fallback = () => {
  const defaultConfig = {
    barThickness: 2,
    barColors: {
      '0': '#0B3D65',
      '0.7': '#e44fe4',
      '1.0': '#92ADBF',
    },
    shadowBlur: 5,
    shadowColor: 'rgba(0, 0, 0, .5)',
  }
  const config = topbar.config

  useEffect(() => {
    topbar.show()
    return () => {
      topbar.hide()
    }
  }, [])

  if (!config) topbar.config(defaultConfig)

  return (
    <>
      <Header />
      <DefaultLayout>
        <LoaderPage />
      </DefaultLayout>
      <Footer />
    </>
  )
}

export default Fallback
