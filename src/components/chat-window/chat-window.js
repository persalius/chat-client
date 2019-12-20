import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import InputMessage from "../input-message";
import ChatMessage from "../chat-message";

const useStyles = makeStyles(theme => {
    return ({
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative"
        },
        chatLayout: {
            display: "flex",
            flexDirection: "column",
            height: "calc(100vh - 153px)",
            overflowY: "auto",
            width: "100%",
            marginTop: "40px",
            padding: "0 10px",
            position: "relative",
        },
        infotext: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translateY(-50%) translateX(-50%)"
        },
        paper: {
            maxWidth: "400px",
            padding: "15px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translateY(-50%) translateX(-50%)"
        },
    });
});

export default function ChatWindow(props) {
    const classes = useStyles();
    const messagesWrapper = React.createRef();

    const {messages, activeChat, activeUser, joinChat, sendMessage, mountChat, isConnected} = props;

    useEffect(() => {
      const messageWrapper = messagesWrapper.current;
      if (messageWrapper) {
        messageWrapper.scrollTop = messageWrapper.scrollHeight;
      }
    });

    // If there's no active chat, then show a tip
    if (!activeChat) {
        return (
            <main className={classes.content}>
                <Paper className={classes.paper}>
                    <Typography variant="body1" gutterBottom>
                        Start messaging…
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Use <strong>Global</strong> to explore communities around here.
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Use <strong>Recents</strong> to see your recent conversations.
                    </Typography>
                </Paper>
            </main>
        );
    }

    return (
        <main className={classes.content}>
            <div className={classes.chatLayout} ref={messagesWrapper}>
                {messages && messages.length ?
                    messages.map((message, index) => (
                        <ChatMessage activeUser={activeUser} key={message._id} {...message} />
                    ))
                    : <p className={classes.infotext}>There is no messages yet...</p>
                }
            </div>
            <InputMessage
                disabled={!isConnected}
                sendMessage={sendMessage}
                onJoinButtonClick={() => {joinChat(activeChat._id); mountChat(activeChat._id)}}
                activeUser={activeUser}
                showJoinButton={!activeUser.isChatMember}
            />
        </main>
    )
}
