import _ from 'lodash'

const isContainsNullValue = objectValue => {
  const obj = _.omit(objectValue, ['__typename'])
  for (var key in obj) {
    if (obj[key] !== null && obj[key] !== '') return false
  }
  return true
}

export default {
  isContainsNullValue,
}
