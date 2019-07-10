import { connect } from 'react-redux';
import { fetchTrips } from '../store/trip/actions'

const TripsContainers = ()=> {}

const  mapDispatchToProps = {
    fetchTrips
};

export default connect(mapDispatchToProps)(TripsContainers);