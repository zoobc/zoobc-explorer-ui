import { apiGet } from '../../utils'
import { MAP_PEERS_LOADING, MAP_PEERS_ERROR, MAP_PEERS_SUCCESS } from './actionType'

const loadingMapPeers = () => ({
  type: MAP_PEERS_LOADING,
})

const errorMapPeers = payload => ({
  type: MAP_PEERS_ERROR,
  payload,
})

const successMapPeers = payload => ({
  type: MAP_PEERS_SUCCESS,
  payload,
})

export const getMapPeers = () => {
  return dispatch => {
    dispatch(loadingMapPeers())
    try {
      apiGet('peers/map')
        .then(resp => {
          resp.meta.status === 200
            ? dispatch(successMapPeers(resp.data))
            : dispatch(errorMapPeers(resp.meta.message))
        })
        .catch(error => {
          dispatch(errorMapPeers(error.message))
        })
    } catch (error) {
      dispatch(errorMapPeers(error.message))
    }
  }
}
