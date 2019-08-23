import {
  FETCH_TOTAL_TRIPS_DISTANCE_FAILURE,
  FETCH_TOTAL_TRIPS_DISTANCE_REQUEST,
  FETCH_TOTAL_TRIPS_DISTANCE_SUCCESS,
  IStatsState,
  StatsActionTypes,
  UPDATE_TOTAL_TRIPS_DISTANCE,
} from './types'

const initialState: IStatsState = {
  isLoading: false,
  totalTripsDistance: undefined,
}

export function statsReducer(
  state = initialState,
  action: StatsActionTypes
): IStatsState {
  switch (action.type) {
    case FETCH_TOTAL_TRIPS_DISTANCE_REQUEST:
      return { ...state, isLoading: true }
    case FETCH_TOTAL_TRIPS_DISTANCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        totalTripsDistance: action.payload,
      }
    case FETCH_TOTAL_TRIPS_DISTANCE_FAILURE:
      return { ...state, isLoading: false }
    case UPDATE_TOTAL_TRIPS_DISTANCE: {
      return {
        ...state,
        totalTripsDistance: action.payload,
      }
    }
    default:
      return state
  }
}
