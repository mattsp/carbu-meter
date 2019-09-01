import { User } from 'firebase'

export interface IUser {
  email: string
  password: string
  firstName?: string
  lastName?: string
  address?:string
}

export interface IUserState {
  userCredential?: firebase.auth.UserCredential
  isLoading: boolean
}

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE'

interface ICreateUserRequestAction {
  type: typeof CREATE_USER_REQUEST
}

interface ICreateUserSuccessAction {
  type: typeof CREATE_USER_SUCCESS
  payload: firebase.auth.UserCredential
}

interface ICreateUserFailureAction {
  type: typeof CREATE_USER_FAILURE
  payload: Error
  error: true
}

export const SIGN_IN_USER_REQUEST = 'SIGN_IN_USER_REQUEST'
export const SIGN_IN_USER_SUCCESS = 'SIGN_IN_USER_SUCCESS'
export const SIGN_IN_USER_FAILURE = 'SIGN_IN_USER_FAILURE'

interface ISignInUserRequestAction {
  type: typeof SIGN_IN_USER_REQUEST
}

interface ISignInUserSuccessAction {
  type: typeof SIGN_IN_USER_SUCCESS
  payload: firebase.auth.UserCredential
}

interface ISignInUserFailureAction {
  type: typeof SIGN_IN_USER_FAILURE
  payload: Error
  error: true
}

export type UserActionTypes =
  | ICreateUserRequestAction
  | ICreateUserSuccessAction
  | ICreateUserFailureAction
  | ISignInUserRequestAction
  | ISignInUserSuccessAction
  | ISignInUserFailureAction
