import { connect } from 'react-redux';
import Modal from '../components/Modal/Modal';
import { AppState } from '../store';
import { closeModal, openModal } from '../store/modal/actions'

const mapStateToProps =  (state: AppState) => ({
    modal: state.modal.modal,
    open: state.modal.open
});

const  mapDispatchToProps = {
    closeModal,
    openModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);