import {combineReducers} from "redux";
import auth from "./auth";
import chats from "./chats";
import messages from "./messages";
import services from "./services";

export default combineReducers({
    auth,
    chats,
    messages,
    services
});

// ===== Selectors =====
export const getActiveUser = state => state.auth.user;
export const getUserId = user => user._id;

// Проверяет если идентификатор создателя чата соответствует идентификатору текущего активного пользователя
// тогда этот пользователь создал этот чат
export const isCreator = (state, chat) => {
    try {
        return getUserId(chat.creator) === getUserId(getActiveUser(state));
    } catch (e) {
        return false;
    }
}

// Проверяет текущий пользователь состоит в чате просто как участник
export const isMember = (state, chat) => {
    try {
        return chat.members.some(
            member => getUserId(member) === getUserId(getActiveUser(state))
        );
    } catch (e) {
        return false;
    }
}

// Проверяет текущий пользователь создал этот чат или он просто в нем состоит
export const isChatMember = (state, chat) => {
    return isCreator(state, chat) || isMember(state, chat);
}
