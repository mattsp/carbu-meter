import { ADD_TRIP_FAILURE, ADD_TRIP_REQUEST, ADD_TRIP_SUCCESS, FETCH_TRIPS_FAILURE, FETCH_TRIPS_REQUEST, FETCH_TRIPS_SUCCESS, ITrip, ITripState, TripsActionTypes, DELETE_TRIP_REQUEST, DELETE_TRIP_SUCCESS, DELETE_TRIP_FAILURE } from "./types";

const initialState: ITripState = {
    isLoading: false,
    totalTrips: 0,
    trips: {} as any as { [key: string]: ITrip },
}

export function tripReducer(
    state = initialState,
    action: TripsActionTypes): ITripState {
    switch (action.type) {
        case FETCH_TRIPS_REQUEST:
            return { ...state, isLoading: true }
        case FETCH_TRIPS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                totalTrips: action.payload.totalTrips,
                trips: { ...state.trips, ...action.payload.trips.reduce((acc, val) => ({ ...acc, [val.id]: val }), {} as any as { [key: string]: ITrip }) },
            }
        case FETCH_TRIPS_FAILURE:
            return { ...state, isLoading: false }
        case ADD_TRIP_REQUEST:
            return { ...state, isLoading: true }
        case ADD_TRIP_SUCCESS:
            return { ...state, trips: { [action.payload.id]: action.payload, ...state.trips }, totalTrips: ++state.totalTrips, isLoading: false }
        case ADD_TRIP_FAILURE:
            return { ...state, isLoading: false }
        case DELETE_TRIP_REQUEST:
            return { ...state, isLoading: true }
        case DELETE_TRIP_SUCCESS:
            const trips = Object.keys(state.trips).reduce((object, key) => {
                if (key !== action.payload) {
                    object[key] = state.trips[key]
                }
                return object
            }, {} as any as { [key: string]: ITrip })
            return { ...state, trips, totalTrips: --state.totalTrips, isLoading: false }
        case DELETE_TRIP_FAILURE:
            return { ...state, isLoading: false }
        default:
            return state
    }
}
