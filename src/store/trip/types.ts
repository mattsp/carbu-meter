

export interface ITrip {
    id: string
    creationDate: number
    distance: number
}

export interface ITripState {
    trips: { [key: string]: ITrip }
    isLoading: boolean
    totalTrips: number
}

export const FETCH_TRIPS_REQUEST = 'FETCH_TRIPS_REQUEST'
export const FETCH_TRIPS_SUCCESS = 'FETCH_TRIPS_SUCCESS'
export const FETCH_TRIPS_FAILURE = 'FETCH_TRIPS_FAILURE'

interface IFetchTripsRequestAction {
    type: typeof FETCH_TRIPS_REQUEST
}

interface IFetchTripsSuccessAction {
    type: typeof FETCH_TRIPS_SUCCESS
    payload: { trips: ITrip[], totalTrips: number }
}

interface IFetchTripsFailureAction {
    type: typeof FETCH_TRIPS_FAILURE
    payload: Error
    error: true
}

export const ADD_TRIP_REQUEST = 'ADD_TRIP_REQUEST'
export const ADD_TRIP_SUCCESS = 'ADD_TRIP_SUCCESS'
export const ADD_TRIP_FAILURE = 'ADD_TRIP_FAILURE'

interface IAddTripRequestAction {
    type: typeof ADD_TRIP_REQUEST
}

interface IAddTripSuccessAction {
    type: typeof ADD_TRIP_SUCCESS
    payload: ITrip
}

interface IAddTripFailureAction {
    type: typeof ADD_TRIP_FAILURE
    payload: Error
    error: boolean
}

export const EDIT_TRIP_REQUEST = 'EDIT_TRIP_REQUEST'
export const EDIT_TRIP_SUCCESS = 'EDIT_TRIP_SUCCESS'
export const EDIT_TRIP_FAILURE = 'EDIT_TRIP_FAILURE'

interface IEditTripRequestAction {
    type: typeof EDIT_TRIP_REQUEST
}

interface IEditTripSuccessAction {
    type: typeof EDIT_TRIP_SUCCESS
    payload: ITrip
}

interface IEditTripFailureAction {
    type: typeof EDIT_TRIP_FAILURE
    payload: Error
    error: boolean
}

export const DELETE_TRIP_REQUEST = 'DELETE_TRIP_REQUEST'
export const DELETE_TRIP_SUCCESS = 'DELETE_TRIP_SUCCESS'
export const DELETE_TRIP_FAILURE = 'DELETE_TRIP_FAILURE'

interface IDeleteTripRequestAction {
    type: typeof DELETE_TRIP_REQUEST
}

interface IDeleteTripSuccessAction {
    type: typeof DELETE_TRIP_SUCCESS
    payload: string
}

interface IDeleteTripFailureAction {
    type: typeof DELETE_TRIP_FAILURE
    payload: Error
    error: boolean
}

export type TripsActionTypes = IFetchTripsRequestAction | IFetchTripsSuccessAction | IFetchTripsFailureAction |
    IAddTripRequestAction | IAddTripSuccessAction | IAddTripFailureAction |
    IDeleteTripRequestAction | IDeleteTripSuccessAction | IDeleteTripFailureAction |
    IEditTripRequestAction | IEditTripSuccessAction | IEditTripFailureAction