import { connect } from 'react-redux';
import Modal from '../components/Modal/Modal';
import { AppState } from '../store';
import { fetchFnsLanguages } from '../store/locale/actions'
import { closeModal, openModal } from '../store/modal/actions'
import { addTrip, editTrip } from '../store/trip/actions'

const mapStateToProps =  (state: AppState) => ({
    currentLanguage: state.locale.currentLanguage,
    dateFnsLanguages: state.locale.dateFnsLanguages,
    loading: state.locale.isLoading,
    modal: state.modal.modal,
    open: state.modal.open
});

const  mapDispatchToProps = {
    addTrip,
    closeModal,
    editTrip,
    fetchFnsLanguages,
    openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);