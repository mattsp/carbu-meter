import { FETCH_TRIPS_FAILURE, FETCH_TRIPS_REQUEST, FETCH_TRIPS_SUCCESS, ITrip, ITripState, TripsActionTypes } from "./types";

const initialState: ITripState = {
    isFetching: false,
    totalTrips: 0,
    trips: {} as any as {[key: string] : ITrip},
}

export function tripReducer(
    state = initialState,
    action: TripsActionTypes): ITripState {
    switch (action.type) {
        case FETCH_TRIPS_REQUEST:
            return { ...state, isFetching: true }
        case FETCH_TRIPS_SUCCESS:
            const test =  {
                ...state,
                isFetching: false,
                totalTrips: 0,
                trips: {...state.trips, ...action.payload.trips.reduce((acc, val) => ({ ...acc, [val.id]: val }), {} as any as {[key: string] : ITrip})},
            }
            return test;
        case FETCH_TRIPS_FAILURE:
            return { ...state, isFetching: false }
        default:
            return state
    }
}