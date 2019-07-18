import { MAP_PEERS_LOADING, MAP_PEERS_ERROR, MAP_PEERS_SUCCESS } from './actionType'

const initialState = {
  loading: false,
  error: false,
  message: null,
  data: [],
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case MAP_PEERS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        message: null,
      }
    case MAP_PEERS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      }
    case MAP_PEERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: false,
        data: action.payload,
      }
    default:
      return state
  }
}

export default reducers
