import { useEffect } from 'react'
import topbar from 'topbar'

const TopBarProgress = () => {
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
    };
  }, [])

  if (!config) return topbar.config(defaultConfig)

  return null
}

export default TopBarProgress
