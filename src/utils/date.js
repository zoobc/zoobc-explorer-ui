import moment from 'moment'

const timeago = date => {
  const time = moment(date, 'YYYYMMDD').fromNow()

  if (time === 'a few seconds ago') return 'just now'

  return time
}

const fromNow = date => {
  const startDate = moment(date)
  const endDate = moment(new Date())
  const diffInSecond = endDate.diff(startDate, 'seconds')
  const diffInMinute = endDate.diff(startDate, 'minutes')
  const diffInHour = endDate.diff(startDate, 'hours')
  const diffInDay = endDate.diff(startDate, 'days')
  const diffInWeek = endDate.diff(startDate, 'weeks')

  if (diffInDay > 6) {
    return `${diffInWeek}w`
  } else if (diffInHour > 23) {
    return `${diffInDay}d`
  } else if (diffInMinute > 59) {
    return `${diffInHour}h`
  } else if (diffInSecond > 59) {
    return `${diffInMinute} min`
  }

  return `${diffInSecond} sec`
}

export default {
  timeago,
  fromNow,
}
