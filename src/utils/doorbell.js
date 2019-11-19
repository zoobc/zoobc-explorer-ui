const doorbellEnpoint = 'https://doorbell.io/api/applications'
const doorbellID = process.env.REACT_APP_DOORBELL_ID
const doorbellKey = process.env.REACT_APP_DOORBELL_KEY

const headerOptions = {
  Accept: '*/*',
  'Content-Type': 'application/json; charset=utf-8',
}

const open = () => {
  return fetch(`${doorbellEnpoint}/${doorbellID}/open?key=${doorbellKey}`, {
    method: 'POST',
    headers: headerOptions,
    body: JSON.stringify({ library: 'javascript' }),
  })
    .then(response => {
      if (response.status === 201) {
        return {
          type: 'success',
          message: 'Successfully to send feedback',
        }
      } else {
        return {
          type: 'error',
          message: 'Failed to send feedback',
        }
      }
    })
    .catch(error => error)
}
const submit = payload => {
  return fetch(`${doorbellEnpoint}/${doorbellID}/submit?key=${doorbellKey}`, {
    method: 'POST',
    headers: headerOptions,
    body: JSON.stringify({ library: 'javascript', ...payload, nps: payload.nps * 2 }),
  })
    .then(response => {
      if (response.status === 201) {
        return {
          type: 'success',
          message: 'Successfully to send feedback',
        }
      } else {
        return {
          type: 'error',
          message: 'Failed to send feedback',
        }
      }
    })
    .catch(error => error)
}

export default {
  open,
  submit,
}
