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
            return {
                ...state,
                isFetching: false,
                totalTrips: action.payload.totalTrips,
                trips: new Map([...Array.from(state.trips.entries()), ...action.payload.trips.map(trip => [trip.id, trip] as [string, ITrip])])
            }
        case FETCH_TRIPS_FAILURE:
            return { ...state, isFetching: false }
        default:
            return state
    }
}
