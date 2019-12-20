import * as types from "../constants/auth";
import callApi from "../../utils/call-api";

export function signup(username, password) {
    return (dispatch, getState) => {
        const {isFetching} = getState().services;

        if (isFetching.signup) {
            return Promise.resolve();
        }

        dispatch({
            type: types.SIGNUP_REQUEST
        });

        return callApi("/signup", undefined, {method: "POST"}, {username, password})
            .then(result => {
                if (!result.data.token) {
                    throw new Error("Token has not been provided!")
                }
                // Save JWT to localStorage
                localStorage.setItem("token", result.data.token)

                dispatch({
                    type: types.SIGNUP_SUCCESS,
                    payload: result.data
                })
            }
            )
            .catch(error => dispatch({
                type: types.SIGNUP_FAILURE,
                payload: error
            }));
    }
}

export function login(username, password) {
    return (dispatch, getState) => {
        const {isFetching} = getState().services;

        if (isFetching.login) {
            return Promise.resolve();
        }

        dispatch({
            type: types.LOGIN_REQUEST
        });

        return callApi("/login", undefined, {method: "POST"}, {username, password})
            .then(result => {
                if (!result.data.token) {
                    throw new Error("Token has not been provided!")
                }
                // Save JWT to localStorage
                localStorage.setItem("token", result.data.token)

                dispatch({
                    type: types.LOGIN_SUCCESS,
                    payload: result.data
                })
            })
            .catch(error => dispatch({
                type: types.LOGIN_FAILURE,
                payload: error
            }));
        }
}

export function logout() {
    return (dispatch, getState) => {
        const {isFetching} = getState().services;

        if (isFetching.logout) {
            return Promise.resolve();
        }

        dispatch({
            type: types.LOGOUT_REQUEST
        });

        return callApi("/logout")
            .then(result => {
                localStorage.removeItem("token");
                // redirect to welcome in case of failure
                dispatch({
                    type: types.LOGOUT_SUCCESS,
                    payload: result.data
                });
            })
            .catch(error => dispatch({
                type: types.LOGOUT_FAILURE,
                payload: error
            }))
    }
}

// Проверка пользователя при переходе на любую страницу проекта
export function recieveAuth() {
    return (dispatch, getState) => {
        const {token} = getState().auth;

        if (!token) {
            dispatch({type: types.RECIEVE_AUTH_FAILURE})
        }

        return callApi("/users/me", token)
            .then(result => dispatch({
                    type: types.RECIEVE_AUTH_SUCCESS,
                    payload: result.data
                })
            )
            .catch(error => dispatch({
                type: types.RECIEVE_AUTH_FAILURE,
                payload: error
            }));
    }
}

