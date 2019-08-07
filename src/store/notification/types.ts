import { SnackbarProps } from "@material-ui/core/Snackbar";

export interface INotification {
    id: string
    dismissed:boolean
    options: SnackbarProps
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