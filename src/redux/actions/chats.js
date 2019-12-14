import * as types from "../constants/chats";
import callApi from "../../utils/call-api";
import {redirect} from "./services";

export function fetchMyChats() {
    return (dispatch, getState) => {
        const state = getState();
        const {isFetching} = state.services;
        const {token} = state.auth;

        if (isFetching.myChats) {
            return Promise.resolve();
        }

        dispatch({
            type: types.FETCH_MY_CHATS_REQUEST
        });

        return callApi("/chats/my", token)
            .then(result => dispatch({
                type: types.FETCH_MY_CHATS_SUCCESS,
                payload: result.data
            }))
            .catch(error => dispatch({
                type: types.FETCH_MY_CHATS_FAILURE,
                payload: error
            }));
    };
}

export function fetchAllChats() {
    return (dispatch, getState) => {
        const state = getState();
        const {isFetching} = state.services;
        const {token} = state.auth;

        if (isFetching.allChats) {
            return Promise.resolve();
        }

        dispatch({
            type: types.FETCH_ALL_CHATS_REQUEST
        });

        return callApi("/chats", token)
            .then(result => dispatch({
                type: types.FETCH_ALL_CHATS_SUCCESS,
                payload: result.data
            }))
            .catch(error => dispatch({
                type: types.FETCH_ALL_CHATS_FAILURE,
                payload: error
            }));
    };
}

export function fetchChat(chatId) {
    return (dispatch, getState) => {
        const state = getState();
        const {isFetching} = state.services;
        const {token} = state.auth;

        if (isFetching.chat) {
            return Promise.resolve();
        }

        dispatch({
            type: types.FETCH_CHAT_REQUEST
        });

        return callApi(`/chats/${chatId}`, token)
           .then(result => {
               dispatch({
                   type: types.FETCH_CHAT_SUCCESS,
                   payload: result.data.chat
               })
               return result.data;
           })
            .catch(error => dispatch({
                type: types.FETCH_CHAT_FAILURE,
                payload: error
            }));
    }
}

export function setActiveChat(chatId) {
    return dispatch => {
        return dispatch(fetchChat(chatId))
            .then(result => {
                if (!result) {
                    dispatch(redirect("/chat"));
                    return dispatch({
                        type: types.UNSET_ACTIVE_CHAT
                    });
                }

                dispatch({
                    type: types.SET_ACTIVE_CHAT,
                    payload: result.chat._id
                });

                dispatch(redirect(`/chat/${result.chat._id}`));
            })
    };
}

export function joinChat(chatId) {
    return (dispatch, getState) => {
        const state = getState();
        const {isFetching} = state.services;
        const {token} = state.auth;

        if (isFetching.joinChat) {
            return Promise.resolve();
        }

        dispatch({
            type: types.JOIN_CHAT_REQUEST,
            payload: {chatId}
        });

        return callApi(`/chats/${chatId}/join`, token)
            .then(result => {
                const {chat} = result.data;
                dispatch({
                    type: types.JOIN_CHAT_SUCCESS,
                    payload: {chat}
                });

                dispatch(redirect(`/chat/${result.data.chat._id}`));
                return result.data.chat;
            })
            .catch(error => dispatch({
                type: types.JOIN_CHAT_FAILURE,
                payload: error
            }));
    }
}

export function leaveChat(chatId) {
    return (dispatch, getState) => {
        const state = getState();
        const {isFetching} = state.services;
        const {token} = state.auth;

        if (isFetching.leaveChat) {
            return Promise.resolve();
        }

        dispatch({
            type: types.LEAVE_CHAT_REQUEST,
            payload: {chatId}
        });

        return callApi(`/chats/${chatId}/leave`, token)
            .then(result => {
                const {chat} = result.data;
                dispatch({
                    type: types.LEAVE_CHAT_SUCCESS,
                    payload: {chat}
                });

                dispatch(redirect("/chat"));

                dispatch({
                    type: types.UNSET_ACTIVE_CHAT
                });

                return result.data;
            })
            .catch(error => dispatch({
                type: types.LEAVE_CHAT_FAILURE,
                payload: error
            }));
    }
}

export function createChat(title) {
    return (dispatch, getState) => {
        const state = getState();
        const {isFetching} = state.services;
        const {token} = state.auth;

        if (isFetching.createChat) {
            return Promise.resolve();
        }

        dispatch({
            type: types.CREATE_CHAT_REQUEST,
            payload: {title}
        });

        return callApi("/chats", token, {method: "POST"}, {data: {title}})
            .then(result => {
                const {chat} = result.data;
                dispatch({
                    type: types.CREATE_CHAT_SUCCESS,
                    payload: {chat}
                });

                dispatch({
                    type: types.SET_ACTIVE_CHAT,
                    payload: chat._id
                });

                dispatch(redirect(`/chat/${result.data.chat._id}`));
                return result.data.chat;
            })
            .catch(error => {
                dispatch({
                    type: types.CREATE_CHAT_FAILURE,
                    payload: error
                })
            });
    }
}

export function deleteChat(chatId) {
    return (dispatch, getState) => {
        const state = getState();
        const {isFetching} = state.services;
        const {token} = state.auth;

        if (isFetching.deleteChat) {
            return Promise.resolve();
        }

        dispatch({
            type: types.DELETE_CHAT_REQUEST,
            payload: {chatId}
        });

        return callApi(`/chats/${chatId}`, token, {method: "DELETE"})
            .then(result => {
                let {chat} = result.data;
                dispatch({
                    type: types.DELETE_CHAT_SUCCESS,
                    payload: {chat}
                });

                dispatch(redirect("/chat"));

                dispatch({
                    type: types.UNSET_ACTIVE_CHAT
                });

                return result.data;
            })
            .catch(error => dispatch({
                type: types.DELETE_CHAT_FAILURE,
                payload: error
            }));
    }
}
