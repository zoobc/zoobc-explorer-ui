import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import reducers from './reducers'

const store = createStore(
  reducers /* preloadedState, */,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)

export default store
