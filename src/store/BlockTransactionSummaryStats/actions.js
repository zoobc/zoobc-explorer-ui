import { apiGet } from '../../utils'
import {
  BLOCK_TRANSACTION_SUMMARY_STATS_LOADING,
  BLOCK_TRANSACTION_SUMMARY_STATS_ERROR,
  BLOCK_TRANSACTION_SUMMARY_STATS_SUCCESS,
} from './actionType'

const loadingData = () => ({
  type: BLOCK_TRANSACTION_SUMMARY_STATS_LOADING,
})

const errorData = payload => ({
  type: BLOCK_TRANSACTION_SUMMARY_STATS_ERROR,
  payload,
})

const success = payload => ({
  type: BLOCK_TRANSACTION_SUMMARY_STATS_SUCCESS,
  payload,
})

export const getBlockTransactionSummaryStats = () => {
  return dispatch => {
    dispatch(loadingData())
    try {
      apiGet('blocks/graph/summary')
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
