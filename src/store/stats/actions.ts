import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '..'
import { db } from '../../firebase'
import {
  FETCH_TOTAL_TRIPS_DISTANCE_FAILURE,
  FETCH_TOTAL_TRIPS_DISTANCE_REQUEST,
  FETCH_TOTAL_TRIPS_DISTANCE_SUCCESS,
  StatsActionTypes,
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
> => async (dispatch: any) => {
  dispatch(fetchTotalTripsDistanceRequest())
  db.doc('stats/tripsDistance')
    .get()
    .then((documentSnapshot: any) => {
      const data = documentSnapshot.data().count
      dispatch(fetchTotalTripsDistanceSuccess(data))
    })
    .catch(error => {
      dispatch(fetchTotalTripsDistanceFailure(error))
    })
}
