import { apiGet } from '../../utils'
import {
  TRANSACTION_TYPE_STATS_LOADING,
  TRANSACTION_TYPE_STATS_ERROR,
  TRANSACTION_TYPE_STATS_SUCCESS,
} from './actionType'

const loadingData = () => ({
  type: TRANSACTION_TYPE_STATS_LOADING,
})

const errorData = payload => ({
  type: TRANSACTION_TYPE_STATS_ERROR,
  payload,
})

const success = payload => ({
  type: TRANSACTION_TYPE_STATS_SUCCESS,
  payload,
})

export const getTransactionTypeStats = () => {
  return dispatch => {
    dispatch(loadingData())
    try {
      apiGet('transactions/graph/type')
        .then(resp => {
          resp.meta.status === 200
            ? dispatch(success(resp.data.graph))
            : dispatch(errorData(resp.meta.message))
        })
        .catch(error => {
          dispatch(errorData(error.message))
        })
    } catch (error) {
      dispatch(errorData(error.message))
    }
  }
}
