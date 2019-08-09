
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppState } from "..";
import { loadDateFnsLocale } from "../../i18n/i18n";
import { FETCH_DATE_FNS_LANGUAGES_FAILURE, FETCH_DATE_FNS_LANGUAGES_REQUEST, FETCH_DATE_FNS_LANGUAGES_SUCCESS, ILanguage } from "./types"

export function fetchFnsLanguagesRequest() {
    return {
        type: FETCH_DATE_FNS_LANGUAGES_REQUEST
    }
}

export function fetchFnsLanguagesSuccess(language: ILanguage) {
    return {
        payload: language,
        type: FETCH_DATE_FNS_LANGUAGES_SUCCESS
    }
}

export function fetchFnsLanguagesFailure(error: Error) {
    return {
        error: true,
        payload: error,
        type: FETCH_DATE_FNS_LANGUAGES_FAILURE
    }
}

export const fetchFnsLanguages = (language: string): ThunkAction<void, AppState, null, Action<any>> => async (dispatch: any, getState: () => AppState) => {
    dispatch(fetchFnsLanguagesRequest())
    try {
        const translations = getState().locale.dateFnsLanguages[language] || await  loadDateFnsLocale(language)
        dispatch(fetchFnsLanguagesSuccess({id: language, translations}))
    } catch(e) {
        dispatch(fetchFnsLanguagesFailure(e))
    }
}