import {
  BLOCK_TRANSACTION_PERIOD_STATS_LOADING,
  BLOCK_TRANSACTION_PERIOD_STATS_ERROR,
  BLOCK_TRANSACTION_PERIOD_STATS_SUCCESS,
} from './actionType'

const initialState = {
  loading: false,
  error: false,
  message: null,
  startDate: '',
  endDate: '',
  data: [],
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case BLOCK_TRANSACTION_PERIOD_STATS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        message: null,
      }
    case BLOCK_TRANSACTION_PERIOD_STATS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      }
    case BLOCK_TRANSACTION_PERIOD_STATS_SUCCESS:
      let initState = {
        ...state,
        loading: false,
        error: false,
        message: false,
      }

      if (action.payload && action.payload.data) {
        initState.data = action.payload.data
      }

      if (action.payload && action.payload.startDate) {
        initState.startDate = action.payload.startDate
      }

      if (action.payload && action.payload.endDate) {
        initState.endDate = action.payload.endDate
      }

      return initState
    default:
      return state
  }
}

export default reducers
