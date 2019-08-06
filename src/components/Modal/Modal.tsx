import React, { lazy } from 'react'
import { IModal } from '../../store/modal/types';
import { ITrip } from '../../store/trip/types';

export interface IProps {
    modal: IModal,
    open: boolean,
    addTrip: (trip: ITrip) => void
    closeModal: (modal: IModal) => void,
    openModal: (modal: IModal) => void

}
const modalComponentMap = new Map()
const Modal = ({ modal, ...rest }: IProps) => {
    if (modal.id) {
        const ModalComponent = modalComponentMap.has(modal.id) ?
            modalComponentMap.get(modal.id) :
            lazy(() => import(`./${modal.id}/${modal.id}`));
        return (<ModalComponent modal={modal} {...rest} />)
    }
    return null;
}

export default Modal