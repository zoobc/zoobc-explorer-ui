import React, { createContext, useReducer } from 'react'

const SET_ANIMATION = 'SET_ANIMATION'

const AnimationContext = createContext()

const animationReducers = (state, action) => {
  switch (action.type) {
    case SET_ANIMATION:
      return {
        ...state,
        animation: action.payload,
      }
    default:
      return state
  }
}

export const AnimationState = ({ children }) => {
  const animationDefaultValue = {
    animation: false,
  }

  const [state, dispatch] = useReducer(animationReducers, animationDefaultValue)

  const onChangeAnimation = () => {
    dispatch({
      type: SET_ANIMATION,
      payload: true,
    })

    setTimeout(() => {
      dispatch({
        type: SET_ANIMATION,
        payload: false,
      })
    }, 6000)
  }

  return (
    <AnimationContext.Provider
      value={{
        animation: state.animation,
        onChangeAnimation,
      }}
    >
      {children}
    </AnimationContext.Provider>
  )
}

export default AnimationContext
