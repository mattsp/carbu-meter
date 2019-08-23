import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '..'
import { db } from '../../firebase'
import { addNotification } from '../notification/actions'
import {
  ADD_TRIP_FAILURE,
  ADD_TRIP_REQUEST,
  ADD_TRIP_SUCCESS,
  DELETE_TRIP_FAILURE,
  DELETE_TRIP_REQUEST,
  DELETE_TRIP_SUCCESS,
  EDIT_TRIP_FAILURE,
  EDIT_TRIP_REQUEST,
  EDIT_TRIP_SUCCESS,
  FETCH_TRIPS_FAILURE,
  FETCH_TRIPS_REQUEST,
  FETCH_TRIPS_SUCCESS,
  ITrip,
  TripsActionTypes,
} from './types'
import { updateTotalTripsDistance } from '../stats/actions'

function fetchTripsRequest() {
  return {
    type: FETCH_TRIPS_REQUEST,
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
    error: true,
    payload: error,
    type: FETCH_TRIPS_FAILURE,
  }
}
export const fetchTrips = (): ThunkAction<
  void,
  AppState,
  null,
  Action<any>
> => async (dispatch: any) => {
  dispatch(fetchTripsRequest())
  db.collection('trips')
    .orderBy('creationDate', 'desc')
    .get()

    .then((querySnapshot: any) => {
      const data = querySnapshot.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }))
      dispatch(fetchTripsSuccess(data, data.length))
    })
    .catch(error => {
      dispatch(fetchTripsFailure(error))
    })
}

function addTripRequest() {
  return {
    type: ADD_TRIP_REQUEST,
  }
}

function addTripSuccess(trip: ITrip) {
  return {
    payload: trip,
    type: ADD_TRIP_SUCCESS,
  }
}

function addTripFailure(error: Error) {
  return {
    error: true,
    payload: error,
    type: ADD_TRIP_FAILURE,
  }
}

export const addTrip = (
  trip: ITrip
): ThunkAction<void, AppState, null, Action<any>> => async (dispatch: any, getState: ()=>AppState) => {
  dispatch(addTripRequest())
  const { id, ...doc } = trip
  db.collection('trips')
    .add(doc)
    .then((querySnapshot: any) => {
      dispatch(addTripSuccess({ ...trip, id: querySnapshot.id }))
      dispatch(updateTotalTripsDistance(0, trip.distance))
      const noficationId = (new Date().getTime() + Math.random()).toString()
      dispatch(
        addNotification({
          id: noficationId,
          message: 'Successfully trip added.',
          options: {
            key: noficationId,
            variant: 'success',
          },
        })
      )
    })
    .catch(error => {
      dispatch(addTripFailure(error))
      const noficationId = (new Date().getTime() + Math.random()).toString()
      dispatch(
        addNotification({
          id: noficationId,
          message: 'Failed to adding trip.',
          options: {
            key: noficationId,
            variant: 'error',
          },
        })
      )
    })
}

function editTripRequest() {
  return {
    type: EDIT_TRIP_REQUEST,
  }
}

function editTripSuccess(trip: ITrip) {
  return {
    payload: trip,
    type: EDIT_TRIP_SUCCESS,
  }
}

function editTripFailure(error: Error) {
  return {
    error: true,
    payload: error,
    type: EDIT_TRIP_FAILURE,
  }
}

export const editTrip = (
  trip: ITrip
): ThunkAction<void, AppState, null, Action<any>> => async (dispatch: any, getState: ()=>AppState) => {
  dispatch(editTripRequest())
  const { id, ...doc } = trip
  const previousTrip = getState().trip.trips[trip.id];
  db.collection('trips')
    .doc(trip.id)
    .set(doc)
    .then((querySnapshot: any) => {
      dispatch(editTripSuccess({ ...trip }))
      dispatch(updateTotalTripsDistance(previousTrip.distance, trip.distance))
      const noficationId = (new Date().getTime() + Math.random()).toString()
      dispatch(
        addNotification({
          id: noficationId,
          message: 'Successfully trip updated.',
          options: {
            key: noficationId,
            variant: 'success',
          },
        })
      )
    })
    .catch(error => {
      dispatch(editTripFailure(error))
      const noficationId = (new Date().getTime() + Math.random()).toString()
      dispatch(
        addNotification({
          id: noficationId,
          message: 'Failed to updating trip.',
          options: {
            key: noficationId,
            variant: 'error',
          },
        })
      )
    })
}

function deleteTripRequest() {
  return {
    type: DELETE_TRIP_REQUEST,
  }
}

function deleteTripSuccess(id: string) {
  return {
    payload: id,
    type: DELETE_TRIP_SUCCESS,
  }
}

function deleteTripFailure(error: Error) {
  return {
    error: true,
    payload: error,
    type: DELETE_TRIP_FAILURE,
  }
}

export const deleteTrip = (
  id: string
): ThunkAction<void, AppState, null, Action<any>> => async (dispatch: any, getState: ()=>AppState) => {
  dispatch(deleteTripRequest())
  const previousTrip = getState().trip.trips[id];
  db.collection('trips')
    .doc(id)
    .delete()
    .then(() => {
      dispatch(deleteTripSuccess(id))
      dispatch(updateTotalTripsDistance(previousTrip.distance, 0))
      const noficationId = (new Date().getTime() + Math.random()).toString()
      dispatch(
        addNotification({
          id: noficationId,
          message: 'Successfully trip Deleted.',
          options: {
            key: noficationId,
            variant: 'success',
          },
        })
      )
    })
    .catch(error => {
      dispatch(deleteTripFailure(error))
      const noficationId = (new Date().getTime() + Math.random()).toString()
      dispatch(
        addNotification({
          id: noficationId,
          message: 'Failed to deleting trip.',
          options: {
            key: noficationId,
            variant: 'error',
          },
        })
      )
    })
}
