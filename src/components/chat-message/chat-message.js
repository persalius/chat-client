import React from "react";
import Avatar from "../avatar";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import classnames from "classnames";
import { makeStyles } from '@material-ui/core/styles';
import senderName from "../../utils/sender-name";
import randomColor from "../../utils/color-from";
import moment from "moment";
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    messageWrapper: {
        display: "flex",
        alignItems: "center",
        padding: "5px 0"
    },
    messageWrapperFromMe: {
        justifyContent: "flex-end"
    },
    message: {
        maxWidth: "79%",
        minWidth: "10%",
        padding: "10px",
        marginLeft: "10px"
    },
    messageFromMe: {
        marginLeft: 0,
        marginRight: "10px",
        background: "#e6dcff"
    },
    statusMessage: {
        width: '100%',
        textAlign: 'center',
    },
    statusMessageUser: {
        display: 'inline',
    },
    name: {
        color: "rgb(3, 169, 244)"
    }
}));

export default function ChatMessage({content, sender, activeUser, createdAt, statusMessage}) {
    const classes = useStyles();

    const isMessageFromMe = sender._id === activeUser._id;
    const displayedName = senderName(sender);

    if (statusMessage) {
        return (
            <div className={classes.messageWrapper}>
                <Typography className={classes.statusMessage}>
                    <Typography
                        variant="caption"
                        style={{ color: randomColor(sender._id) }}
                        className={classes.statusMessageUser}
                    >
                        {displayedName}
                    </Typography>
                    {content}
                    <Typography variant="caption" component="span">
                        {` ${moment(createdAt).fromNow()}`}
                    </Typography>
                </Typography>
            </div>
        );
    }

    const userAvatar = (
        <Avatar colorFrom={sender._id}>{displayedName}</Avatar>
    );

    return(
        <div
            className={classnames(
                classes.messageWrapper,
                isMessageFromMe && classes.messageWrapperFromMe)}
        >
            {!isMessageFromMe && userAvatar}
            <Paper
                className={classnames(classes.message, isMessageFromMe && classes.messageFromMe)}
            >
                <Typography variant="caption" className={classes.name}>{displayedName}</Typography>
                <Typography variant="body1">{content}</Typography>
                <Typography variant="caption" className={classes.time}>
                    {moment(createdAt).fromNow()}
                </Typography>
            </Paper>
            {isMessageFromMe && userAvatar}
        </div>
    )
};

// ChatMessage.propTypes = {
//     classes: PropTypes.objectOf(PropTypes.string).isRequired,
//     content: PropTypes.string.isRequired,
//     sender: PropTypes.shape({
//         _id: PropTypes.string.isRequired,
//         firstName: PropTypes.string,
//         lastName: PropTypes.string,
//         username: PropTypes.string,
//     }).isRequired,
//     activeUser: PropTypes.shape({
//         _id: PropTypes.string.isRequired,
//     }).isRequired,
//     createdAt: PropTypes.string.isRequired,
//     statusMessage: PropTypes.bool,
// };

ChatMessage.defaultProps = {
    statusMessage: false,
};
