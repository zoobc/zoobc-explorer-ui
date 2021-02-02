/**
 * ZooBC Copyright (C) 2020 Quasisoft Limited - Hong Kong
 * This file is part of ZooBC <https://github.com/zoobc/zoobc-explorer-ui>

 * ZooBC is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * ZooBC is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with ZooBC.  If not, see <http://www.gnu.org/licenses/>.

 * Additional Permission Under GNU GPL Version 3 section 7.
 * As the special exception permitted under Section 7b, c and e,
 * in respect with the Author’s copyright, please refer to this section:

 * 1. You are free to convey this Program according to GNU GPL Version 3,
 *     as long as you respect and comply with the Author’s copyright by
 *     showing in its user interface an Appropriate Notice that the derivate
 *     program and its source code are “powered by ZooBC”.
 *     This is an acknowledgement for the copyright holder, ZooBC,
 *     as the implementation of appreciation of the exclusive right of the
 *     creator and to avoid any circumvention on the rights under trademark
 *     law for use of some trade names, trademarks, or service marks.

 * 2. Complying to the GNU GPL Version 3, you may distribute
 *     the program without any permission from the Author.
 *     However a prior notification to the authors will be appreciated.

 * ZooBC is architected by Roberto Capodieci & Barton Johnston
 * contact us at roberto.capodieci[at]blockchainzoo.com
 * and barton.johnston[at]blockchainzoo.com

 * IMPORTANT: The above copyright notice and this permission notice
 * shall be included in all copies or substantial portions of the Software.
**/

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
