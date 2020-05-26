import omit from 'lodash.omit'

const isContainsNullValue = objectValue => {
  const obj = omit(objectValue, ['__typename'])
  for (var key in obj) {
    if (obj[key] !== null && obj[key] !== '') return false
  }
  return true
}

export default {
  isContainsNullValue,
}
