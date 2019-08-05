import { CLOSE_MODAL, IModalState, ModalActionTypes, OPEN_MODAL } from "./types";

const initialState: IModalState = {
    modal: undefined,
    open: false
}

export function modalReducer(
    state = initialState,
    action: ModalActionTypes): IModalState {
    switch (action.type) {
        case OPEN_MODAL:
            return { ...state, modal: action.payload, open: true }
        case CLOSE_MODAL:
            return {
                ...state,
                open: false
            }
        default:
            return state
    }
}
