import { IDataSourceItem } from "../../components/List/List";

export interface ITrip extends IDataSourceItem {
    id: string
    creationDate: number
    distance: number
}

export interface ITripState  {
    trips: {[key: string] : ITrip}
    isFetching: boolean
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
    payload:  {trips: ITrip[], totalTrips: number}
}

interface IFetchTripsFailureAction {
    type: typeof FETCH_TRIPS_FAILURE
    payload: Error
    error: true
}

export type TripsActionTypes = IFetchTripsRequestAction | IFetchTripsSuccessAction | IFetchTripsFailureAction