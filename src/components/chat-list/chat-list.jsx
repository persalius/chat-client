import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ChatListItem from "../chat-list-item";

const useStyles = makeStyles(theme => ({
    list: {
        // maxHeight: "calc(100% - 135px)",
        overflow: "hidden",
        overflowY: "auto",
        flex: 1
    },
    listItem: {
        paddingLeft: "12px",
        paddingRight: "12px",
    },
    noChats: {
        display: "block",
        textAlign: "center"
    },
}));

const ChatList = ({chats, activeChat, open, disabled}) => {
    const classes = useStyles();

    return (
        <List className={classes.list}>
            {chats && chats.length ? (
                chats.map(chat => (
                    <ChatListItem
                        disabled={disabled}
                        key={chat._id}
                        active={Boolean(activeChat && activeChat._id === chat._id)}
                        chatId={chat._id}
                        open={open}
                        {...chat}
                    />
                ))
            ) : (
                <Typography variant="subtitle1" className={classes.noChats}>
                    There is no chats yet...
                </Typography>
            )}
        </List>
    );
};

// ChatList.propTypes = {
//     chats: PropTypes.arrayOf(PropTypes.shape({
//         _id: PropTypes.string.isRequired,
//         title: PropTypes.string.isRequired,
//         createdAt: PropTypes.string.isRequired,
//     })).isRequired,
//     activeChat: PropTypes.shape({
//         _id: PropTypes.string.isRequired,
//     }),
//     disabled: PropTypes.bool.isRequired,
// };

ChatList.defaultProps = {
    activeChat: null,
};

export default ChatList;
