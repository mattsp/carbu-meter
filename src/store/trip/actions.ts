import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk'
import { AppState } from '..'
import { db } from '../../firebase';
import { ADD_TRIP_FAILURE, ADD_TRIP_REQUEST, ADD_TRIP_SUCCESS, FETCH_TRIPS_FAILURE, FETCH_TRIPS_REQUEST, FETCH_TRIPS_SUCCESS, ITrip, TripsActionTypes } from "./types"

function fetchTripsRequest() {
    return {
        type: FETCH_TRIPS_REQUEST
    }
}

function fetchTripsSuccess(trips: ITrip[], totalTrips = 0): TripsActionTypes {
    return {
        payload: { trips, totalTrips },
        type: FETCH_TRIPS_SUCCESS,
    }
}

function fetchTripsFailure(error: Error) {
    return {
        payload: error,
        type: FETCH_TRIPS_FAILURE,
    }
}
export const fetchTrips = (): ThunkAction<void, AppState, null, Action<any>> => async (dispatch: any) => {
    dispatch(fetchTripsRequest())
    db.collection("trips")
        .orderBy('creationDate', 'desc')
        .get()

        .then((querySnapshot: any) => {
            const data = querySnapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
            dispatch(fetchTripsSuccess(data, data.length))
        }).catch(error => {
            dispatch(fetchTripsFailure(error))
        });
}

function addTripRequest() {
    return {
        type: ADD_TRIP_REQUEST
    }
}

function addTripSuccess(trip:ITrip) {
    return {
        payload: trip,
        type: ADD_TRIP_SUCCESS,
    }
}

function addTripFailure(error: Error) {
    return {
        payload: error,
        type: ADD_TRIP_FAILURE,
    }
}

export const addTrip = (trip: ITrip): ThunkAction<void, AppState, null, Action<any>> => async (dispatch: any) => {
    dispatch(addTripRequest())
    db.collection("trips")
        .add(trip)
        .then((querySnapshot: any) => {
            dispatch(addTripSuccess({...trip, id: querySnapshot.id}))
        }).catch(error => {
            dispatch(addTripFailure(error))
        })
}