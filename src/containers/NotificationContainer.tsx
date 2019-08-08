import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import Notifier from '../components/Notifier/Notifier'
import { AppState } from '../store';
import { addNotification, closeNotification, removeNotification } from '../store/notification/actions'

const mapStateToProps =  (state: AppState) => ({
    notifications: state.notification.notifications,
});

const  mapDispatchToProps = {
    addNotification,
    closeNotification,
    removeNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar<any>(Notifier));