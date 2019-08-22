import { connect } from 'react-redux'
import { AppState } from '../store'
import { fetchTotalTripsDistance } from '../store/stats/actions'
import Stats from '../components/Stats/Stats'

const mapStateToProps = (state: AppState) => ({
  totalTripsDistance: state.stats.totalTripsDistance,
  loading: state.trip.isLoading,
})

const mapDispatchToProps = {
  fetchTotalTripsDistance,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stats)
