import React, {Fragment} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from "../avatar";
import ChatMenu from "../chat-menu";
import UserMenu from "../user-menu";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    hide: {
        display: 'none',
    },
    menuButton: {
      marginRight: 36,
    },
    appBarTitle: {
        flex: 1,
        color: "#fff",
        marginLeft: "14px"
    }
}));

export default function Header(props) {
    const classes = useStyles();

    const {open, handleDrawerOpen, activeUser, activeChat, logout, leaveChat, deleteChat, editUser, error, isConnected} = props;

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: open,
                    })}
                >
                    <MenuIcon />
                </IconButton>

                {activeChat ? (
                    <Fragment>
                        <Avatar colorFrom={activeChat._id}>
                            {activeChat.title}
                        </Avatar>
                        <Typography variant="caption" className={classes.appBarTitle}>
                            {activeChat.title}
                            <ChatMenu
                                disabled={!isConnected}
                                activeUser={activeUser}
                                onLeaveClick={() => leaveChat(activeChat._id)}
                                onDeleteClick={() => deleteChat(activeChat._id)}
                            />
                        </Typography>
                    </Fragment>
                ) : (
                    <Typography variant="caption" className={classes.appBarTitle}>
                        Persal chat
                    </Typography>
                )}
                <UserMenu
                    disabled={!isConnected}
                    activeUser={activeUser}
                    onLogoutClick={logout}
                    onEditProfileClick={editUser}
                    error={error}
                />
            </Toolbar>
        </AppBar>
    )
}
