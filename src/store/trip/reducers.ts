import { FETCH_TRIPS_FAILURE, FETCH_TRIPS_REQUEST, FETCH_TRIPS_SUCCESS, ITrip, ITripState, TripsActionTypes } from "./types";

const initialState: ITripState = {
    isFetching: false,
    totalTrips: 0,
    trips: new Map<string, ITrip>(),
}

export function tripReducer(
    state = initialState,
    action: TripsActionTypes): ITripState {
    switch (action.type) {
        case FETCH_TRIPS_REQUEST:
            return { ...state, isFetching: true }
        case FETCH_TRIPS_SUCCESS:
            const data = new Map([...Array.from(state.trips.entries()), ...action.payload.trips.map(trip => [trip.id, trip] as [string, ITrip])]);
            const test =  {
                ...state,
                isFetching: false,
                totalTrips: 20,
                trips: data,
            }
            return test;
        case FETCH_TRIPS_FAILURE:
            return { ...state, isFetching: false }
        default:
            return state
    }
}
