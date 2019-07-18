import { apiGet, getUnique } from '../../utils'
import {
  TRANSACTION_AMOUNT_STATS_LOADING,
  TRANSACTION_AMOUNT_STATS_ERROR,
  TRANSACTION_AMOUNT_STATS_SUCCESS,
} from './actionType'

const loadingData = () => ({
  type: TRANSACTION_AMOUNT_STATS_LOADING,
})

const errorData = payload => ({
  type: TRANSACTION_AMOUNT_STATS_ERROR,
  payload,
})

const successData = payload => ({
  type: TRANSACTION_AMOUNT_STATS_SUCCESS,
  payload,
})

export const getFieldBlocks = field => {
  return apiGet('blocks')
    .then(resp => {
      const { meta, data } = resp

      if (meta.status === 200) {
        const response = data.Blocks
          ? data.Blocks.filter(i => i[field] !== '').map(i => ({ [field]: i[field] }))
          : []
        return Promise.resolve(getUnique(response, field))
      } else {
        return Promise.reject(meta.message)
      }
    })
    .catch(error => Promise.reject(error.message))
}

export const getFieldTransactions = field => {
  return apiGet('transactions')
    .then(resp => {
      const { meta, data } = resp

      if (meta.status === 200) {
        const response = data
          ? data.filter(i => i[field] !== '').map(i => ({ [field]: i[field] }))
          : []
        return Promise.resolve(getUnique(response, field))
      } else {
        return Promise.reject(meta.message)
      }
    })
    .catch(error => Promise.reject(error.message))
}

export const getTransactionAmountStats = (
  paramBlockID,
  paramAccessPK,
  paramSenderPK,
  paramRecipientPK
) => {
  return async dispatch => {
    dispatch(loadingData())
    try {
      const listBlockIds = await getFieldBlocks('ID')
      const blockID = Array.isArray(listBlockIds) ? listBlockIds[0].BlockID : listBlockIds.BlockID
      const listSenderPKs = await getFieldTransactions('SenderPublicKey')
      const senderPK = Array.isArray(listSenderPKs)
        ? listSenderPKs[0].SenderPublicKey
        : listSenderPKs.SenderPublicKey
      const listRecipientPKs = await getFieldTransactions('RecipientPublicKey')
      const recipientPK = Array.isArray(listRecipientPKs)
        ? listRecipientPKs[0].RecipientPublicKey
        : listRecipientPKs.RecipientPublicKey

      const params = `${
        typeof paramBlockID !== 'undefined' && paramBlockID
          ? `&blockID=${paramBlockID ? paramBlockID : blockID}`
          : `&blockID=${blockID}`
      }${
        typeof paramAccessPK !== 'undefined' && paramAccessPK
          ? `&accessPublicKey=${paramAccessPK}`
          : ''
      }${
        typeof paramSenderPK !== 'undefined' && paramSenderPK
          ? `&senderPublicKey=${paramSenderPK ? paramSenderPK : senderPK}`
          : `&senderPublicKey=${senderPK}`
      }${
        typeof paramRecipientPK !== 'undefined' && paramRecipientPK
          ? `&recipientPublicKey=${paramRecipientPK ? paramRecipientPK : recipientPK}`
          : ''
      }`

      apiGet(`transactions/graph/amounts?filter=true${params}`)
        .then(resp => {
          resp.meta.status === 200
            ? dispatch(
                successData({
                  blockID,
                  senderPK,
                  recipientPK,
                  listBlockIds,
                  listSenderPKs,
                  listRecipientPKs,
                  data: resp.data,
                })
              )
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
