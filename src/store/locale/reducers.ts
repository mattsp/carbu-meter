import { FETCH_DATE_FNS_LANGUAGES_FAILURE, FETCH_DATE_FNS_LANGUAGES_REQUEST, FETCH_DATE_FNS_LANGUAGES_SUCCESS, ILocaleState, LocaleActionTypes, SET_CURRENT_LANGUAGE } from "./types";
const initialState: ILocaleState = {
    currentLanguage: 'fr',
    dateFnsLanguages: {} as any as { [key: string]: any },
    isLoading: false,
}

export function localeReducer(
    state = initialState,
    action: LocaleActionTypes): ILocaleState {
    switch (action.type) {
        case SET_CURRENT_LANGUAGE: 
            return {...state, currentLanguage: action.payload}
        case FETCH_DATE_FNS_LANGUAGES_REQUEST:
            return { ...state, isLoading: true }
        case FETCH_DATE_FNS_LANGUAGES_SUCCESS:
            return { ...state, dateFnsLanguages: { ...state.dateFnsLanguages, [action.payload.id]: action.payload.translations }, isLoading: false }
        case FETCH_DATE_FNS_LANGUAGES_FAILURE:
            return { ...state, isLoading: false }
        default:
            return state
    }
}
