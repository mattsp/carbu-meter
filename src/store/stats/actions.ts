import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '..'
import { db } from '../../firebase'
import {
  FETCH_TOTAL_TRIPS_DISTANCE_FAILURE,
  FETCH_TOTAL_TRIPS_DISTANCE_REQUEST,
  FETCH_TOTAL_TRIPS_DISTANCE_SUCCESS,
  StatsActionTypes,
  UPDATE_TOTAL_TRIPS_DISTANCE,
} from './types'

function fetchTotalTripsDistanceRequest() {
  return {
    type: FETCH_TOTAL_TRIPS_DISTANCE_REQUEST,
  }
}

function fetchTotalTripsDistanceSuccess(total: number): StatsActionTypes {
  return {
    payload: total,
    type: FETCH_TOTAL_TRIPS_DISTANCE_SUCCESS,
  }
}

function fetchTotalTripsDistanceFailure(error: Error) {
  return {
    error: true,
    payload: error,
    type: FETCH_TOTAL_TRIPS_DISTANCE_FAILURE,
  }
}

export const fetchTotalTripsDistance = (): ThunkAction<
  void,
  AppState,
  null,
  Action<any>
> => async (dispatch: any, getState: () => AppState) => {
  dispatch(fetchTotalTripsDistanceRequest())
  const totalTripsDistance = getState().stats.totalTripsDistance
  const userId = localStorage.getItem('authUser')
  if (totalTripsDistance === undefined) {
    db.collection('users').doc(userId!)
      .get()
      .then((documentSnapshot: any) => {
        const data = documentSnapshot.data().tripsTotalDistance
        dispatch(fetchTotalTripsDistanceSuccess(data))
      })
      .catch(error => {
        dispatch(fetchTotalTripsDistanceFailure(error))
      })
  }
  dispatch(fetchTotalTripsDistanceSuccess(totalTripsDistance!))
}

export function updateTotalTripsDistance(
  previousTripsDistance: number,
  newTripsDistance: number
) {
  return (dispatch: any, getState: () => AppState) => {
    const totalTripsDistance = getState().stats.totalTripsDistance || 0
    dispatch(
      (() => {
        return {
          payload:
            totalTripsDistance - previousTripsDistance + newTripsDistance,
          type: UPDATE_TOTAL_TRIPS_DISTANCE,
        }
      })()
    )
  }
}
