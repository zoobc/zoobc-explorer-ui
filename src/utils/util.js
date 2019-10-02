export const getSortString = payload => {
  if (payload && payload.order && payload.columnKey) {
    return `${payload.order === 'ascend' ? '' : '-'}${payload.columnKey}`
  }
  return payload
}

export const getSortObject = payload => {
  if (payload && payload !== '') {
    const order = payload.charAt(0) === '-' ? 'descend' : 'ascend'
    const columnKey =
      payload.charAt(0) === '-'
        ? payload.substr(1, payload.length)
        : payload.substr(0, payload.length)
    return { columnKey, order }
  }
  return payload
}

export const getSortOrder = (sortBy, payload) => {
  const sort = getSortObject(payload)
  if (sort && sort.order && sort.columnKey && sort.columnKey === sortBy) {
    return sort.order
  }
  return false
}
