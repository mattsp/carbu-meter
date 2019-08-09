import { connect } from 'react-redux';
import Trips from '../components/Trips/Trips';
import { AppState } from '../store';
import { fetchFnsLanguages } from '../store/locale/actions'
import { openModal } from '../store/modal/actions'
import { deleteTrip, fetchTrips } from '../store/trip/actions'

const mapStateToProps =  (state: AppState) => ({
    currentLanguage: state.locale.currentLanguage,
    dateFnsLanguages: state.locale.dateFnsLanguages,
    totalTrips: state.trip.totalTrips,
    trips: state.trip.trips,
});

const  mapDispatchToProps = {
    deleteTrip,
    fetchFnsLanguages,
    fetchTrips,
    openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trips);