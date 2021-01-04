import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { date } from '../utils'
import useInterval from '../hooks/useInterval'
import moment from 'moment'

const Timestamp = ({ value }) => {
  const { t } = useTranslation()
  const [dateFormat, setDateFormat] = useState(date.fromNow(value))

  useInterval(() => {
    setDateFormat(date.fromNow(value))
  }, 10000)

  return !!value ? `${dateFormat} : ${moment(value).format('DD/MM/YY @ H:mm:ss')}` : t('unknown')
}

export default Timestamp
