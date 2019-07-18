import config from '../config'

const restApi = config.endpoint.api

const searchParams = params =>
  Object.keys(params)
    .map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    })
    .join('&')

const headerOptions = {
  Accept: '*/*',
  'Content-Type': 'application/json; charset=utf-8',
}

export const apiGet = async endpoint => {
  return fetch(`${restApi}/${endpoint}`, {
    method: 'GET',
    headers: headerOptions,
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)
}

export const apiPost = async (endpoint, payload, formatter = 'json') => {
  return fetch(`${restApi}/${endpoint}`, {
    method: 'POST',
    headers: headerOptions,
    body: formatter === 'json' ? JSON.stringify(payload) : searchParams(payload),
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)
}

export const apiPut = async (endpoint, payload, formatter = 'json') => {
  return fetch(`${restApi}/${endpoint}`, {
    method: 'PUT',
    headers: headerOptions,
    body: formatter === 'json' ? JSON.stringify(payload) : searchParams(payload),
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)
}
