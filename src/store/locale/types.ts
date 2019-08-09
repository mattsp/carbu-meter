
export interface ILanguage {
    id:string
    translations: any
}
export interface ILocaleState {
    currentLanguage: string,
    dateFnsLanguages: {[key:string] :any}
    isLoading: boolean
}
export const SET_CURRENT_LANGUAGE= 'SET_CURRENT_LANGUAGE'
export const FETCH_DATE_FNS_LANGUAGES_REQUEST = 'FETCH_DATE_FNS_LANGUAGES_REQUEST'
export const FETCH_DATE_FNS_LANGUAGES_SUCCESS = 'FETCH_DATE_FNS_LANGUAGES_SUCCESS'
export const FETCH_DATE_FNS_LANGUAGES_FAILURE = 'FETCH_DATE_FNS_LANGUAGES_FAILURE'

interface ISetCurrentLanguageAction {
    type: typeof SET_CURRENT_LANGUAGE
    payload: string
}

interface IFetchDateFnsLanguagesRequestAction {
    type: typeof FETCH_DATE_FNS_LANGUAGES_REQUEST
}

interface IFetchDateFnsLanguagesSuccessAction {
    type: typeof FETCH_DATE_FNS_LANGUAGES_SUCCESS
    payload: ILanguage
}

interface IFetchDateFnsLanguagesFailureAction {
    type: typeof FETCH_DATE_FNS_LANGUAGES_FAILURE
    payload: Error,
    error: boolean
}

export type LocaleActionTypes = IFetchDateFnsLanguagesRequestAction | IFetchDateFnsLanguagesSuccessAction |
IFetchDateFnsLanguagesFailureAction | ISetCurrentLanguageAction