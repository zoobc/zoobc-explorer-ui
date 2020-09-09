import React, { createContext, useReducer, useEffect } from 'react'
import store from '../utils/store'

const ThemeContext = createContext()

const SET_THEME = 'SET_THEME'

const themeReducers = (state, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      }
    default:
      return state
  }
}

export const ThemeState = ({ children }) => {
  const themeDefaultValue = {
    theme: store.use('theme', store.get('theme')),
  }

  const applyTheme = theme => {
    const root = document.getElementsByTagName('html')[0]
    root.style.cssText = theme.join(';')
  }

  const [state, dispatch] = useReducer(themeReducers, themeDefaultValue)

  useEffect(() => {
    onChangeSelectedTheme(themeDefaultValue.theme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangeSelectedTheme = data => {
    store.set('theme', data)
    if (data === '☾') {
      applyTheme(darkTheme)
    } else {
      applyTheme(lightTheme)
    }
    dispatch({
      type: SET_THEME,
      payload: data,
    })
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: state.theme,
        onChangeSelectedTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

const lightTheme = []

const darkTheme = [
  '--color-primary-bg: #012137',
  '--color-secondary-solitude: #01263F',
  '--color-primary-card: #012137',
  '--color-hero:  #01263F',
  '--color-text-card: #FFFFFF',
  '--color-table-text: #FFFFFF',
  '--color-primary-link-txt: #3498DB',
  '--color-text-hero: #FFFFFF',
  '--color-text-search: #92ADBF',
  '--color-text-card-title: #FFFFFF',
  '--color-banner: #01263F',
  '--color-primary-dark-txt: #FFFFFF',
  '--color-escrow-multisignature-expand: #01263F',
]

export default ThemeContext
