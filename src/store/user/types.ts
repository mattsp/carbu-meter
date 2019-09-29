export interface IUser {
  id?: string
  userName?: string
  email: string
  password: string
  firstName?: string
  lastName?: string
}

export interface IUserState {
  user?: IUser
  rememberUser?: boolean
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
  payload: IUser
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
  payload: IUser
}

interface ISignInUserFailureAction {
  type: typeof SIGN_IN_USER_FAILURE
  payload: Error
  error: true
}

export const SIGN_OUT_USER_REQUEST = 'SIGN_OUT_USER_REQUEST'
export const SIGN_OUT_USER_SUCCESS = 'SIGN_OUT_USER_SUCCESS'
export const SIGN_OUT_USER_FAILURE = 'SIGN_OUT_USER_FAILURE'
interface ISignOutUserRequestAction {
  type: typeof SIGN_OUT_USER_REQUEST
}

interface ISignOutUserSuccessAction {
  type: typeof SIGN_OUT_USER_SUCCESS
}

interface ISignOutUserFailureAction {
  type: typeof SIGN_OUT_USER_FAILURE
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
  | ISignOutUserRequestAction
  | ISignOutUserSuccessAction
  | ISignOutUserFailureAction
