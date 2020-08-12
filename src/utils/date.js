import moment from 'moment'

const timeago = date => {
  const time = moment(date, 'YYYYMMDD').fromNow()

  if (time === 'a few seconds ago') return 'just now'

  return time
}

export default {
  timeago,
}
