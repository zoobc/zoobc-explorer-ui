import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
import 'antd/dist/antd.css'

import React from 'react'
import ReactDOM from 'react-dom'
import './scss/main.scss'
import App from './App'

ReactDOM.render(<App />, document.getElementById('app'))
