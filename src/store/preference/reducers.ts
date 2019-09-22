import {
  PreferenceActionTypes,
  IPreferenceState,
  SET_REMEMBER_USER_PREFERENCE,
} from './types'

const initialState: IPreferenceState = {
  rememberUser: false,
}

export function preferenceReducer(
  state = initialState,
  action: PreferenceActionTypes
): IPreferenceState {
  switch (action.type) {
    case SET_REMEMBER_USER_PREFERENCE:
      return { ...state, rememberUser: action.payload }
    default:
      return state
  }
}
