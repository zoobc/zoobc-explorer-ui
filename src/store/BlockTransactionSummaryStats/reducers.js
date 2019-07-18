import {
  BLOCK_TRANSACTION_SUMMARY_STATS_LOADING,
  BLOCK_TRANSACTION_SUMMARY_STATS_ERROR,
  BLOCK_TRANSACTION_SUMMARY_STATS_SUCCESS,
} from './actionType'

const initialState = {
  loading: false,
  error: false,
  message: null,
  data: [['Category', 'Total']],
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case BLOCK_TRANSACTION_SUMMARY_STATS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        message: null,
      }
    case BLOCK_TRANSACTION_SUMMARY_STATS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      }
    case BLOCK_TRANSACTION_SUMMARY_STATS_SUCCESS:
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
