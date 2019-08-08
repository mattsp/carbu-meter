import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import Notifier from '../components/Notifier/Notifier'
import { AppState } from '../store';
import { addNotification, removeNotification } from '../store/notification/actions'

const mapStateToProps =  (state: AppState) => ({
    notifications: state.notification.notifications,
});

const  mapDispatchToProps = {
    addNotification,
    removeNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar<any>(Notifier));