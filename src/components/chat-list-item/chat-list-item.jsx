import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "../avatar";
import {grey} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    item: {
        paddingLeft: "12px",
        paddingRight: "12px",
        [theme.breakpoints.down('xs')]: {
            padding: "0 12px"
        }
    },
    activeItem: {
        paddingLeft: "12px",
        paddingRight: "12px",
        backgroundColor: grey["200"]
    },
    item__name: {
        marginLeft: "14px"
    }
}));

const ChatListItem = ({disabled, title, chatId, active, createdAt, open}) => {
    const classes = useStyles();

    return (
        <ListItem
            button
            component={Link}
            to={`/chat/${chatId}`}
            className={active ? clsx(classes.activeItem, classes.item) : classes.item}
            disabled={disabled}
        >
            <Avatar colorFrom={chatId}>{title}</Avatar>
            <ListItemText className={classes.item__name} primary={title} secondary={moment(createdAt).fromNow()} />
        </ListItem>
    )
};

// ChatListItem.propTypes = {
//     disabled: PropTypes.bool.isRequired,
//     active: PropTypes.bool.isRequired,
//     chatId: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     createdAt: PropTypes.string.isRequired,
// };

export default ChatListItem;
