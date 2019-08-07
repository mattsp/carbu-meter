import { WithSnackbarProps } from 'notistack';
import React, { SyntheticEvent } from 'react'
import { INotification } from '../../store/notification/types';

interface IProps extends WithSnackbarProps {
    notifications: { [key: string]: INotification }
    addNotification: (notification: INotification)=>void
    removeNotification: (id: string)=>void
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

    public shouldComponentUpdate({ notifications:  newSnacks }: IProps){
        const notificationsKey = Object.keys(newSnacks);
        if (!notificationsKey.length){
            return false
        }
        const { notifications: currentSnacks } = this.props;
        let notExists = false;
        for (const [key] of Object.entries(newSnacks)) {
            const newNotification = newSnacks[key]
            if (newNotification.dismissed) {
                this.props.closeSnackbar(newNotification.id)
                this.props.removeNotification(newNotification.id)
            }
            if (notExists) { continue; }
            notExists = notExists || !currentSnacks[key];
          }
          return notExists;
    }

    public componentDidUpdate() {
        const { notifications } = this.props; 
        for (const [key, value] of Object.entries(notifications)) {
            if (this.displayed[key]) {
                return 
            }
            this.props.enqueueSnackbar(value.options.message, {
                ...value.options,
                onClose: (event: SyntheticEvent<any, Event>, reason: string) => {
                    if (value.options.onClose) {
                        value.options.onClose(event, reason);
                    }
                    this.props.removeNotification(key)
                }
            })
            this.storeDisplayed(key)
        }

    }

}

export default Notifier