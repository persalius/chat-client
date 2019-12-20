import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {signup, login, recieveAuth} from "../redux/actions";
import WelcomePage from "../pages/WelcomePage";

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.services.errors.auth
});

const mapDispatchToProps = dispatch => bindActionCreators({
    signup,
    login,
    recieveAuth
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WelcomePage);
