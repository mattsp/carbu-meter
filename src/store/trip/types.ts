export interface ITrip {
    creationDate: number
    distance: number
}

export interface ITripState  {
    trips: Map<string, ITrip>
    isFetching: boolean
}

export const FETCH_TRIPS_REQUEST = 'FETCH_TRIPS_REQUEST'
export const FETCH_TRIPS_SUCCESS = 'FETCH_TRIPS_SUCCESS'
export const FETCH_TRIPS_FAILURE = 'FETCH_TRIPS_FAILURE'

interface IFetchTripsRequestAction {
    type: typeof FETCH_TRIPS_REQUEST
}

interface IFetchTripsSuccessAction {
    type: typeof FETCH_TRIPS_SUCCESS
    payload:  Map<string, ITrip>
}

interface IFetchTripsFailureAction {
    type: typeof FETCH_TRIPS_FAILURE
    payload: Error
    error: true
}

export type TripsActionTypes = IFetchTripsRequestAction | IFetchTripsSuccessAction | IFetchTripsFailureAction