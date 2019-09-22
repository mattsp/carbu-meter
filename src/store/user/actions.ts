import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '..'
import firebase from 'firebase/app'
import { db } from '../../firebase'
import 'firebase/auth'
import {
  CREATE_USER_REQUEST,
  IUser,
  UserActionTypes,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  SIGN_IN_USER_REQUEST,
  SIGN_IN_USER_SUCCESS,
  SIGN_IN_USER_FAILURE,
} from './types'
import { setRememberUserPreference } from '../preference/actions'

function createUserRequest() {
  return {
    type: CREATE_USER_REQUEST,
  }
}

function createUserSuccess(
  user: IUser
): UserActionTypes {
  return {
    payload: user,
    type: CREATE_USER_SUCCESS,
  }
}

function createUserFailure(error: Error) {
  return {
    error: true,
    payload: error,
    type: CREATE_USER_FAILURE,
  }
}

const writeUserData = (userId: string, user: IUser) => {
  return db.collection('users').doc(userId)
      .set({
        id: userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      })
}

const getUserData = (userId: string) => {
  return db.collection('users').doc(userId)
      .get()
}

export const createUser = (
  user: IUser
): ThunkAction<Promise<any>, AppState, null, Action<any>> => async (dispatch: any) => {
  dispatch(createUserRequest())
  firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then((data: firebase.auth.UserCredential) => {
      return writeUserData(data!.user!.uid, user).then(() => {
        dispatch(createUserSuccess(user))
      }).catch((error)=> {
        dispatch(createUserFailure(error))
      })
    })
    .catch((error: Error) => {
      dispatch(createUserFailure(error))
    })
}

function singInUserRequest() {
  return {
    type: SIGN_IN_USER_REQUEST,
  }
}

function singInUserSuccess(
  user: IUser,
): UserActionTypes {
  return {
    payload: user,
    type: SIGN_IN_USER_SUCCESS,
  }
}

function singInUserFailure(error: Error) {
  return {
    error: true,
    payload: error,
    type: SIGN_IN_USER_FAILURE,
  }
}

export const singInUser = (
  user: IUser,
  rememberUser:boolean
): ThunkAction<Promise<any>, AppState, null, Action<any>> => async (dispatch: any) => {
  dispatch(singInUserRequest())
  return firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data: firebase.auth.UserCredential) => {
      return getUserData(data!.user!.uid).then((doc) => {
        dispatch(singInUserSuccess(doc.data() as IUser))
        dispatch(setRememberUserPreference(rememberUser))
      }).catch((error)=> {
        dispatch(singInUserFailure(error))
        throw error
      })
    })
    .catch((error: firebase.auth.Error) => {
      dispatch(singInUserFailure(new Error(error.code)))
      throw error
    })
}
