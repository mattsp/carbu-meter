import { SET_REMEMBER_USER_PREFERENCE } from "./types"

export function setRememberUserPreference(value: boolean) {
    return {
        payload: value,
        type: SET_REMEMBER_USER_PREFERENCE
    }
}