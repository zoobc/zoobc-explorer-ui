import {
  TRANSACTION_AMOUNT_STATS_LOADING,
  TRANSACTION_AMOUNT_STATS_ERROR,
  TRANSACTION_AMOUNT_STATS_SUCCESS,
} from './actionType'

const initialState = {
  loading: false,
  error: false,
  message: null,
  blockID: null,
  senderPK: null,
  recipientPK: null,
  listBlockIds: [],
  listSenderPKs: [],
  listRecipientPKs: [],
  data: [],
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTION_AMOUNT_STATS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        message: null,
      }
    case TRANSACTION_AMOUNT_STATS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      }
    case TRANSACTION_AMOUNT_STATS_SUCCESS:
      let initState = {
        ...state,
        loading: false,
        error: false,
        message: false,
      }

      if (action.payload && action.payload.data) {
        initState.data = action.payload.data
      }

      if (action.payload && action.payload.listBlockIds) {
        initState.listBlockIds = action.payload.listBlockIds
      }

      if (action.payload && action.payload.listSenderPKs) {
        initState.listSenderPKs = action.payload.listSenderPKs
      }

      if (action.payload && action.payload.listRecipientPKs) {
        initState.listRecipientPKs = action.payload.listRecipientPKs
      }

      if (action.payload && action.payload.blockID) {
        initState.blockID = action.payload.blockID
      }

      if (action.payload && action.payload.senderPK) {
        initState.senderPK = action.payload.senderPK
      }

      if (action.payload && action.payload.recipientPK) {
        initState.recipientPK = action.payload.recipientPK
      }

      return initState
    default:
      return state
  }
}

export default reducers
