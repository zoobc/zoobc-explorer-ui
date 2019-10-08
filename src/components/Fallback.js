import React, { useEffect } from 'react'
import topbar from 'topbar'
import LoaderPage from './LoaderPage'
import DefaultLayout from './DefaultLayout'

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
    <DefaultLayout>
      <LoaderPage />
    </DefaultLayout>
  )
}

export default Fallback
