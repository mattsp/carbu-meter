import React, { lazy } from 'react'
import { IModal } from '../../store/modal/types'
import { ITrip } from '../../store/trip/types'
import Loader from '../Loader/Loader'

export interface IProps {
  loading: boolean
  dateFnsLanguages: { [key: string]: any }
  modal: IModal
  open: boolean
  addTrip: (trip: ITrip) => void
  closeModal: (modal: IModal) => void
  fetchFnsLanguages: (language: string) => void
  openModal: (modal: IModal) => void
}
const modalComponentMap = new Map()
const Modal = ({ modal, ...rest }: IProps) => {
  if (modal.id) {
    let ModalComponent = modalComponentMap.get(modal.id)
    if (!ModalComponent) {
      ModalComponent = lazy(() => import(`./${modal.id}/${modal.id}`))
      modalComponentMap.set(modal.id, ModalComponent)
    }
    return rest.loading ? (
      <Loader />
    ) : (
      <ModalComponent modal={modal} {...rest} />
    )
  }
  return null
}

export default Modal
