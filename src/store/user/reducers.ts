import {
  IUserState,
  UserActionTypes,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  SIGN_IN_USER_FAILURE,
  SIGN_IN_USER_REQUEST,
  CREATE_USER_FAILURE,
  SIGN_IN_USER_SUCCESS,
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
    case CREATE_USER_REQUEST:
      return { ...state, isLoading: true }
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      }
    case CREATE_USER_FAILURE:
      return { ...state, isLoading: false }

    case SIGN_IN_USER_REQUEST:
      return { ...state, isLoading: true }
    case SIGN_IN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      }
    case SIGN_IN_USER_FAILURE:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
