import {
  TRANSACTION_TYPE_STATS_LOADING,
  TRANSACTION_TYPE_STATS_ERROR,
  TRANSACTION_TYPE_STATS_SUCCESS,
} from './actionType'

const initialState = {
  loading: false,
  error: false,
  message: null,
  listBlockIds: [],
  data: [['Transaction', 'Amount']],
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTION_TYPE_STATS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        message: null,
      }
    case TRANSACTION_TYPE_STATS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      }
    case TRANSACTION_TYPE_STATS_SUCCESS:
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
