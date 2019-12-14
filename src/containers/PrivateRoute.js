import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Route, Redirect, withRouter} from "react-router-dom";
import {recieveAuth} from "../redux/actions";

// Проверка аворизирован ли пользователь. Если да, то перенаправить на страницу chat, если нет - на главную
class PrivateRoute extends Component {
    componentDidMount() {
        this.props.recieveAuth();
    }

    render() {
        const {component: Component, isAuthenticated, ...rest} = this.props;

        return (
            <Route {...rest} render={props => {
                return (
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{
                        state: {from: props.location}
                    }} />
                )
            )}} />
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => bindActionCreators({
    recieveAuth
}, dispatch);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivateRoute));
