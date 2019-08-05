import { CLOSE_MODAL, IModal, OPEN_MODAL } from "./types"

export function openModal(modal: IModal) {
    return {
        payload: modal,
        type: OPEN_MODAL
    }
}

export function closeModal(modal: IModal) {
    return {
        payload: modal,
        type: CLOSE_MODAL
    }
}