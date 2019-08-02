import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk'
import { AppState } from '..'
import { db } from '../../firebase';
import { FETCH_TRIPS_FAILURE, FETCH_TRIPS_REQUEST, FETCH_TRIPS_SUCCESS, ITrip, TripsActionTypes } from "./types"

export function fetchTripsRequest() {
    return {
        type: FETCH_TRIPS_REQUEST
    }
}

export function fetchTripsSuccess(trips: ITrip[], totalTrips = 0): TripsActionTypes {
    return {
        payload: { trips, totalTrips },
        type: FETCH_TRIPS_SUCCESS,
    }
}

export function fetchTripsFailure(error: Error) {
    return {
        payload: error,
        type: FETCH_TRIPS_FAILURE,
    }
}
export const fetchTrips = (): ThunkAction<void, AppState, null, Action<any>> => async (dispatch:any) => {
    dispatch(fetchTripsRequest())
    try {
        db.collection("trips")
            .get()
            .then((querySnapshot: any) => {
                const data = querySnapshot.docs.map((doc:any) => ({ ...doc.data(), id: doc.id }));
                dispatch(fetchTripsSuccess(data))
            });
    } catch (error) {
        dispatch(fetchTripsFailure(error))
    }
}