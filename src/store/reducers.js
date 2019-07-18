import { combineReducers } from 'redux'

import mapPeers from './MapPeers/reducers'
import transactionTypeStats from './TransactionTypeStats/reducers'
import transactionAmountStats from './TransactionAmountStats/reducers'
import blockTransactionSummaryStats from './BlockTransactionSummaryStats/reducers'
import blockTransactionPeriodStats from './BlockTransactionPeriodStats/reducers'

const reducers = combineReducers({
  mapPeers,
  transactionTypeStats,
  transactionAmountStats,
  blockTransactionSummaryStats,
  blockTransactionPeriodStats,
})

export default reducers
