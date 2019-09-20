import { connect } from 'react-redux'
import { AppState } from '../store'
import Layout from '../components/Layout/Layout'

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
})


export default connect(
  mapStateToProps
)(Layout)
