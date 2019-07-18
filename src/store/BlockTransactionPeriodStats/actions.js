import moment from 'moment'
import { apiGet } from '../../utils'
import {
  BLOCK_TRANSACTION_PERIOD_STATS_LOADING,
  BLOCK_TRANSACTION_PERIOD_STATS_ERROR,
  BLOCK_TRANSACTION_PERIOD_STATS_SUCCESS,
} from './actionType'

const dateFormatSender = 'DD-MM-YYYY'
const dateFormatRecip = 'YYYY-MM-DD'

const loadingData = () => ({
  type: BLOCK_TRANSACTION_PERIOD_STATS_LOADING,
})

const errorData = payload => ({
  type: BLOCK_TRANSACTION_PERIOD_STATS_ERROR,
  payload,
})

const successData = payload => ({
  type: BLOCK_TRANSACTION_PERIOD_STATS_SUCCESS,
  payload,
})

export const setBlockTransactionPeriodStats = payload => {
  return async dispatch => {
    dispatch(successData(payload))
  }
}

export const getBlockTransactionPeriodStats = (startDate, endDate) => {
  return async dispatch => {
    dispatch(loadingData())
    try {
      const sDate =
        typeof startDate !== 'undefined' && startDate !== ''
          ? moment(startDate).format(dateFormatSender)
          : moment().format(dateFormatSender)
      const eDate =
        typeof endDate !== 'undefined' && endDate !== ''
          ? moment(endDate).format(dateFormatSender)
          : moment().format(dateFormatSender)

      const rsDate =
        typeof startDate !== 'undefined' && startDate !== ''
          ? moment(startDate).format(dateFormatRecip)
          : moment().format(dateFormatRecip)
      const reDate =
        typeof endDate !== 'undefined' && endDate !== ''
          ? moment(endDate).format(dateFormatRecip)
          : moment().format(dateFormatRecip)

      apiGet(`blocks/graph/period?start_date=${sDate}&end_date=${eDate}`)
        .then(resp => {
          const { meta, data } = resp
          if (meta.status === 200) {
            const result = {
              startDate: rsDate,
              endDate: reDate,
              data: data.graph,
            }
            dispatch(successData(result))
          } else {
            dispatch(errorData(resp.meta.message))
          }
        })
        .catch(error => {
          dispatch(errorData(error.message))
        })
    } catch (error) {
      dispatch(errorData(error.message))
    }
  }
}
