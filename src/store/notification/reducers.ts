import { ADD_NOTIFICATION, INotification, INotificationState, NotificationActionTypes, REMOVE_NOTIFICATION } from "./types";

const initialState: INotificationState = {
    notifications: {} as any as { [key: string]: INotification },
}

export function notificationReducer(
    state = initialState,
    action: NotificationActionTypes): INotificationState {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return { ...state, notifications: { ...state.notifications, [action.payload.id]: action.payload } }
        case REMOVE_NOTIFICATION:
            const notifications = Object.keys(state.notifications).reduce((object, key) => {
                if (key !== action.payload) {
                    object[key] = state.notifications[key]
                }
                return object
            }, {} as any as { [key: string]: INotification })

            return {
                ...state,
                notifications
            }
        default:
            return state
    }
}
