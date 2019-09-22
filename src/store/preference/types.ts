
export interface IPreference {
    rememberUser: boolean
}

export interface IPreferenceState {
    rememberUser: boolean
}

export const SET_REMEMBER_USER_PREFERENCE = 'SET_REMEMBER_USER_PREFERENCE'

interface ISetRememberUserPreferenceAction {
    type: typeof SET_REMEMBER_USER_PREFERENCE
    payload: boolean
}

export type PreferenceActionTypes = ISetRememberUserPreferenceAction