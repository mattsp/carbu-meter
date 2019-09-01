import { connect } from 'react-redux';
import { AppState } from '../store';
import SignUp from '../components/SignUp/SignUp';
import {createUser} from '../store/user/actions';

const mapStateToProps =  (state: AppState) => ({
    user: state.user.user
});

const  mapDispatchToProps = {
    createUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);