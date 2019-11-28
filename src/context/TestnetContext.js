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
  const testnetDefaultValue = {
    selectedTestnet: store.use('testnet', testnet[0]),
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
