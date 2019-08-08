import { Button } from '@material-ui/core';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import React, { SyntheticEvent } from 'react'
import { INotification } from '../../store/notification/types';

interface IProps extends WithSnackbarProps {
    notifications: { [key: string]: INotification }
    addNotification: (notification: INotification)=>void
    removeNotification: (id: string)=>void
    closeNotification:(id:string)=>void
}

class Notifier extends React.Component<IProps> {
    
    private displayed: {[key:string]: string}

    constructor(props:IProps) {
        super(props)
        this.displayed = {} as any as {[key:string]: string};
    }

    public storeDisplayed = (id:string) => {
        this.displayed = {...this.displayed, [id]: id};
    };

    public shouldComponentUpdate({ notifications:  newNotifications }: IProps){
        const newNotificationsKey = Object.keys(newNotifications);
        if (!newNotificationsKey.length){
            this.displayed = {} as any as {[key:string]: string}
            return false
        }
        const { notifications: currentNotifications } = this.props;
        let notExists = false;
        for (const [key, notification] of Object.entries(newNotifications)) {
            if (notification.dismissed) {
                this.props.closeSnackbar(key)
                this.props.removeNotification(key)
            }
            if (notExists) { continue; }
            notExists = notExists || !Object.values(currentNotifications).filter(({id}) => notification.id === id).length
          }
          return notExists;
    }

    public componentDidUpdate() {
        const { notifications } = this.props; 
        for (const [key, notification] of Object.entries(notifications)) {
            if (this.displayed[key]) {
                continue 
            }
            this.props.enqueueSnackbar(notification.message, {
                ...notification.options,
                action: (id:string) => (
                    <Button onClick={() => this.props.closeNotification(id)}>dissmiss me</Button>
                ),
                onClose: (event: SyntheticEvent<any, Event>, reason: string, id:string) => {
                    if (notification.options.onClose) {
                        (notification.options as any).onClose(event, reason, id);
                    }
                    this.props.removeNotification(id)
                }
            } as any)
            this.storeDisplayed(key)
        }

    }

    public render() {
        return null
    }

}

export default withSnackbar(Notifier)