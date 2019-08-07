import { OptionsObject } from "notistack";
import { SyntheticEvent } from "react";

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

interface IAddNotificationAction {
    type: typeof ADD_NOTIFICATION
    payload: INotification
}

interface IRemoveNotificationAction {
    type: typeof REMOVE_NOTIFICATION
    payload: string
}

export type NotificationActionTypes = IAddNotificationAction | IRemoveNotificationAction