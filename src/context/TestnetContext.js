import React, { createContext, useReducer } from 'react'
import store from '../utils/store'
import testnet from '../config/testnet'

const SET_TESTNET = 'SET_TESTNET'

const TestnetContext = createContext()

const testnetReducers = (state, action) => {
  switch (action.type) {
    case SET_TESTNET:
      return {
        ...state,
        selectedTestnet: action.payload,
      }
    default:
      return state
  }
}

export const TestnetState = ({ children }) => {
  const host = window.location.host.replace(':3000', '')
  const subdomain = host.split('.')

  const defaultNetwork =
    subdomain &&
    subdomain.length > 0 &&
    (subdomain[0] === 'staging' || subdomain[0] === 'localhost')
      ? testnet[2]
      : testnet[0]

  const testnetDefaultValue = {
    selectedTestnet: store.use('testnet', defaultNetwork),
  }

  const [state, dispatch] = useReducer(testnetReducers, testnetDefaultValue)

  const onChangeSelectedTestnet = data => {
    store.set('testnet', data)
    dispatch({
      type: SET_TESTNET,
      payload: data,
    })
  }

  return (
    <TestnetContext.Provider
      value={{
        selectedTestnet: state.selectedTestnet,
        onChangeSelectedTestnet,
      }}
    >
      {children}
    </TestnetContext.Provider>
  )
}

export default TestnetContext
