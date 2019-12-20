import {connect} from "react-redux";
import {bindActionCreators} from "redux";

// ===== start action creators =====
import {sendMessage, mountChat, unmountChat, socketsConnect} from "../redux/actions/sockets";
import {logout} from "../redux/actions";
import {fetchAllChats, fetchMyChats, setActiveChat, createChat, deleteChat, joinChat, leaveChat} from "../redux/actions/chats";
import {editUser} from "../redux/actions/users";
// ===== end action creators =====

// ===== start selectors =====
import * as fromState from "../redux/reducers";
import * as fromChats from "../redux/reducers/chats";
// ===== end selectors =====
import ChatPage from "../pages/ChatPage";

const mapStateToProps = state => {
    // Достаем текущий активный чат
    const activeChat = fromChats.getById(state.chats, state.chats.activeId);

    return {
        isAuthenticated: state.auth.isAuthenticated,
        chats: {
            active: activeChat,
            my: fromChats.getByIds(state.chats, state.chats.myIds),
            all: fromChats.getByIds(state.chats, state.chats.allIds)
        },
        activeUser: {
            ...state.auth.user,
            isMember: fromState.isMember(state, activeChat),
            isCreator: fromState.isCreator(state, activeChat),
            isChatMember: fromState.isChatMember(state, activeChat)
        },
        messages: state.messages,
        error: state.services.errors.chat,
        isConnected: state.services.isConnected
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchAllChats,
    fetchMyChats,
    setActiveChat,
    logout,
    createChat,
    deleteChat,
    joinChat,
    leaveChat,
    editUser,
    sendMessage,
    mountChat,
    unmountChat,
    socketsConnect
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatPage);
