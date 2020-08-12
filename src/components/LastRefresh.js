import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { date } from '../utils'
import useInterval from '../hooks/useInterval'

const LastRefresh = ({ value }) => {
  const { t } = useTranslation()
  const [dateFormat, setDateFormat] = useState(date.timeago(value))

  useInterval(() => {
    setDateFormat(date.timeago(value))
  }, 60000)

  return (
    <span className="refresh-status">
      {t('last refresh')}: {t(dateFormat)}
    </span>
  )
}

export default LastRefresh
