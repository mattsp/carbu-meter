import { ADD_NOTIFICATION, CLOSE_NOTIFICATION, INotification, INotificationState, NotificationActionTypes, REMOVE_NOTIFICATION } from "./types";

const initialState: INotificationState = {
    notifications: {} as any as { [key: string]: INotification },
}

export function notificationReducer(
    state = initialState,
    action: NotificationActionTypes): INotificationState {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return { ...state, notifications: { ...state.notifications, [action.payload.id]: action.payload } }
        case REMOVE_NOTIFICATION: {
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
        }
        case CLOSE_NOTIFICATION: {
            const notifications = Object.keys(state.notifications).reduce((object, key) => {
                (action.payload.dismissAll || state.notifications[key].id === action.payload.id) ?
                    object[key] = { ...state.notifications[key], dismissed: true }
                    :
                    object[key] = { ...state.notifications[key] }

                return object
            }, {} as any as { [key: string]: INotification })
            return {
                ...state,
                notifications
            }
        }

        default:
            return state
    }
}
