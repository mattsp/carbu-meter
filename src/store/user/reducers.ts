import {
  IUserState,
  UserActionTypes,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  SIGN_IN_USER_FAILURE,
  SIGN_IN_USER_REQUEST,
  CREATE_USER_FAILURE,
  SIGN_IN_USER_SUCCESS,
  SIGN_OUT_USER_REQUEST,
  SIGN_OUT_USER_SUCCESS,
  SIGN_OUT_USER_FAILURE,
} from './types'

const initialState: IUserState = {
  isLoading: false,
  user: undefined,
}

export function userReducer(
  state = initialState,
  action: UserActionTypes
): IUserState {
  switch (action.type) {
    case SIGN_IN_USER_REQUEST:
    case SIGN_OUT_USER_REQUEST:
    case CREATE_USER_REQUEST:
      return { ...state, isLoading: true }
    case SIGN_IN_USER_SUCCESS:
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      }
    case SIGN_OUT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: undefined,
      }
    case SIGN_IN_USER_FAILURE:
    case SIGN_OUT_USER_FAILURE:
    case CREATE_USER_FAILURE:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
