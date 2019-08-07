import { ADD_NOTIFICATION, INotification, REMOVE_NOTIFICATION } from "./types"

export function addNotification(notification: INotification) {
    return {
        payload: notification,
        type: ADD_NOTIFICATION
    }
}

export function removeNotification(id: string) {
    return {
        payload: id,
        type: REMOVE_NOTIFICATION
    }
}