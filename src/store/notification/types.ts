import { OptionsObject } from "notistack";

export interface INotification {
    id: string
    message: string
    dismissed?:boolean
    options: OptionsObject
}

export interface INotificationState {
    notifications: { [key: string]: INotification }
}

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'
export const CLOSE_NOTIFICATION  = 'CLOSE_NOTIFICATION'

interface IAddNotificationAction {
    type: typeof ADD_NOTIFICATION
    payload: INotification
}

interface IRemoveNotificationAction {
    type: typeof REMOVE_NOTIFICATION
    payload: string
}

interface ICloseNotificationAction {
    type: typeof CLOSE_NOTIFICATION
    payload: {id: string, dismissAll: boolean}
}

export type NotificationActionTypes = IAddNotificationAction | IRemoveNotificationAction | ICloseNotificationAction