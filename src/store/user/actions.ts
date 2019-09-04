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
} from './types'

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
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      })
}

export const createUser = (
  user: IUser
): ThunkAction<void, AppState, null, Action<any>> => async (dispatch: any) => {
  dispatch(createUserRequest())
  firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then((data: firebase.auth.UserCredential) => {
      return writeUserData(data!.user!.uid, user).then((doc:any) => {
        dispatch(createUserSuccess(doc.data() as IUser))
      }).catch((error)=> {
        dispatch(createUserFailure(error))
      })
    })
    .catch((error: Error) => {
      dispatch(createUserFailure(error))
    })
}
