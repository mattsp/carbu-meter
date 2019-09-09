import { connect } from 'react-redux';
import { AppState } from '../store';
import {singInUser} from '../store/user/actions';
import SignIn from '../components/SignIn/SignIn';

const mapStateToProps =  (state: AppState) => ({
    user: state.user.user
});

const  mapDispatchToProps = {
    singInUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);