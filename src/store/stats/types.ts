export interface IStatsState {
  totalTripsDistance?: number
  isLoading: boolean
}

export const FETCH_TOTAL_TRIPS_DISTANCE_REQUEST =
  'FETCH_TOTAL_TRIPS_DISTANCE_REQUEST'
export const FETCH_TOTAL_TRIPS_DISTANCE_SUCCESS =
  'FETCH_TOTAL_TRIPS_DISTANCE_SUCCESS'
export const FETCH_TOTAL_TRIPS_DISTANCE_FAILURE =
  'FETCH_TOTAL_TRIPS_DISTANCE_FAILURE'

interface IFetchTotalTripsDistanceRequestAction {
  type: typeof FETCH_TOTAL_TRIPS_DISTANCE_REQUEST
}

interface IFetchTotalTripsDistanceSuccessAction {
  type: typeof FETCH_TOTAL_TRIPS_DISTANCE_SUCCESS
  payload: number
}

interface IFetchTotalTripsDistanceFailureAction {
  type: typeof FETCH_TOTAL_TRIPS_DISTANCE_FAILURE
  payload: Error
  error: true
}

export const UPDATE_TOTAL_TRIPS_DISTANCE = 'UPDATE_TOTAL_TRIPS_DISTANCE'

interface IUpdateTotalTripsDistanceAction {
  type: typeof UPDATE_TOTAL_TRIPS_DISTANCE
  payload: number
}

export type StatsActionTypes =
  | IFetchTotalTripsDistanceRequestAction
  | IFetchTotalTripsDistanceSuccessAction
  | IFetchTotalTripsDistanceFailureAction
  | IUpdateTotalTripsDistanceAction
