import { connect } from 'react-redux';
import Trips from '../components/Trips/Trips';
import { AppState } from '../store';
import { fetchTrips } from '../store/trip/actions'

const mapStateToProps =  (state: AppState) => ({
    totalTrips: state.trip.totalTrips,
    trips: state.trip.trips,
});

const  mapDispatchToProps = {
    fetchTrips
};

export default connect(mapStateToProps, mapDispatchToProps)(Trips);