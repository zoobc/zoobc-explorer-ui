import React, { createContext, useReducer } from 'react';
import store from '../utils/store';
import tesnet from '../config/tesnet';

const SET_TESTNET = 'SET_TESTNET';

const TesnetContext = createContext();

const tesnetReducers = (state, action) => {
  switch (action.type) {
    case SET_TESTNET:
      return {
        ...state,
        selectedTestnet: action.payload
      }
    default:
      return state
  }
}

export const TesnetState = ({ children }) => {
  const tesnetDefaultValue = {
    selectedTestnet: store.get('testnet') || tesnet[0],
  };

  const [state, dispatch] = useReducer(tesnetReducers, tesnetDefaultValue)

  const onChangeSelectedTestnet = data => {
    store.set('testnet', data)
    dispatch({
      type: SET_TESTNET,
      payload: data
    })
  }

  return (
    <TesnetContext.Provider
      value={{
        selectedTestnet: state.selectedTestnet,
        onChangeSelectedTestnet
      }}
    >
      {children}
    </TesnetContext.Provider>
  )
}

export default TesnetContext;
