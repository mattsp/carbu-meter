
export interface IModal {
    id: string
    data?: any
}

export interface IModalState {
    modal?: IModal
    open: boolean
}

export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

interface IOpenModalAction {
    type: typeof OPEN_MODAL
    payload: IModal
}

interface ICloseModalAction {
    type: typeof CLOSE_MODAL
    payload: IModal
}

export type ModalActionTypes = IOpenModalAction | ICloseModalAction