import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import ChatWindow from "../components/chat-window";
import ErrorMessage from "../components/error-message";
import {isChatMember, isCreator} from "../redux/reducers";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: "100vh"
  }
}));

let localChatId = true;

ChatPage.propTypes = {
    chats: PropTypes.shape({
        active: PropTypes.object,
        my: PropTypes.array.isRequired,
        all: PropTypes.array.isRequired
    }).isRequired,
    activeUser: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        username: PropTypes.string,
        isMember: PropTypes.bool.isRequired,
        isCreator: PropTypes.bool.isRequired,
        isChatMember: PropTypes.bool.isRequired
    }).isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({
        chatId: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        sender: PropTypes.object.isRequired,
        createdAt: PropTypes.string.isRequired
    })).isRequired,
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    }).isRequired,
    logout: PropTypes.func.isRequired,
    createChat: PropTypes.func.isRequired,
    joinChat: PropTypes.func.isRequired,
    leaveChat: PropTypes.func.isRequired,
    deleteChat: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired,
    isConnected: PropTypes.bool.isRequired,
    fetchAllChats: PropTypes.func.isRequired,
    fetchMyChats: PropTypes.func.isRequired,
    setActiveChat: PropTypes.func.isRequired,
    socketsConnect: PropTypes.func.isRequired,
    mountChat: PropTypes.func.isRequired,
    unmountChat: PropTypes.func.isRequired,
    error: PropTypes.instanceOf(Error)
};

ChatPage.defaultProps = {
    error: null
};

export default function ChatPage(props) {
  const classes = useStyles();

    const {
        logout,
        chats,
        activeUser,
        createChat,
        joinChat,
        leaveChat,
        deleteChat,
        sendMessage,
        messages,
        editUser,
        isConnected,
        fetchAllChats,
        fetchMyChats,
        setActiveChat,
        match,
        socketsConnect,
        mountChat,
        unmountChat,
        error
    } = props;

  const [open, setOpen] = useState(false);
  // const [chatId, setChatId] = useState(undefined);
    console.log("activeUser", activeUser);


  // (function () {
  //     // If we change route, then fetch messages from chat by chatID
  //     if (chatId !== match.params.chatId) {
  //         if (match.params.chatId) {
  //             setChatId(match.params.chatId);
  //             setActiveChat(match.params.chatId);
  //             if (chatId) {
  //                 unmountChat(chatId);
  //                 mountChat(match.params.chatId);
  //             }
  //         } else {
  //             setChatId(undefined);
  //         }
  //
  //         // Promise.all([fetchAllChats(), fetchMyChats()]);
  //     }
  // })();


    useEffect(() => {
        Promise.all([fetchAllChats(), fetchMyChats()])
            .then(() => {
                socketsConnect();
            })
            .then(() => {
                const { chatId } = match.params;
                if (chatId && localChatId) {
                    localChatId = false;
                    setActiveChat(chatId);
                    mountChat(chatId);
                } else {
                    localChatId = false;
                }
            });
    }, []);

  useEffect(() => {
      console.log();
      const { chatId } = match.params;

      if (chats.active && chatId) {
          localChatId = false;
          setActiveChat(chatId);
          unmountChat(localChatId);
          mountChat(chatId);
          return;
      }

      if (!localChatId && chatId) {
          setActiveChat(chatId);
          mountChat(chatId);
          return;
      }
      // не первый рендер есть match.params.chatId
      // if (localChatId && match.params.chatId) {
      //     console.log(1);
      //     localChatId = match.params.chatId;
      //     if (match.params.chatId) {
      //         setActiveChat(match.params.chatId);
      //         unmountChat(localChatId);
      //         mountChat(match.params.chatId);
      //     }
      //     return;
      // }
      //
      // if (match.params.chatId) {
      //     console.log(2);
      //     // setChatId(match.params.chatId);
      //
      //
      //     setActiveChat(match.params.chatId);
      //     if (localChatId) {
      //         unmountChat(localChatId);
      //     }
      //     localChatId = match.params.chatId;
      //     mountChat(match.params.chatId);
      // } else {
      //     localChatId = undefined;
      // }
    }, [match.params.chatId]);

  // useEffect(() => {
  //     Promise.all([fetchAllChats(), fetchMyChats()])
  //         .then(() => {
  //             socketsConnect();
  //         })
  //         .then(() => {
  //             const {chatId} = match.params;
  //             // If we pass a chatId, then fetch messages from chat
  //             if (chatId) {
  //                 setActiveChat(chatId);
  //                 mountChat(chatId);
  //             }
  //         })
  // }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          activeUser={activeUser}
          activeChat={chats.active}
          logout={logout}
          leaveChat={leaveChat}
          deleteChat={deleteChat}
          editUser={editUser}
          error={error}
          isConnected={isConnected}
      />
      <Sidebar
          open={open}
          handleDrawerClose={handleDrawerClose}
          chats={chats}
          createChat={createChat}
          isConnected={isConnected}
      />
      <ChatWindow
          messages={messages}
          activeChat={chats.active}
          activeUser={activeUser}
          sendMessage={sendMessage}
          joinChat={joinChat}
          mountChat={mountChat}
          isConnected={isConnected}
      />

      <ErrorMessage error={error} />
    </div>
  );
}
