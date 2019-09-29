import { connect } from 'react-redux';
import {signOutUser} from '../store/user/actions';
import Header from '../components/Header/Header';


const  mapDispatchToProps = {
    signOutUser,
};

export default connect(null, mapDispatchToProps)(Header);
