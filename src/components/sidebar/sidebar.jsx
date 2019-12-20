import React, {useState} from "react";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import BottomNavigation from "../bottom-navigation";
import ChatList from "../chat-list";
import NewChatButton from "../new-chat-button";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      position: "relative"
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    drawer__block: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        height: "100%"
    }
}));

const Sidebar = ({chats, createChat, isConnected, open, handleDrawerClose}) => {
    const classes = useStyles();

    const [searchValue, setSearchValue] = useState("");
    const [activeTab, setActiveTab] = useState(0);

    const handleSearchChange = (event) => setSearchValue(event.target.value);

    const handleTabChange = (event, value) => setActiveTab(value);

    const filterChats = (chats) => {
        return chats
            .filter(chat => chat.title.toLowerCase().includes(searchValue.toLowerCase()))
            .sort((one, two) => (one.title.toLowerCase() <= two.title.toLowerCase() ? -1 : 1));
    };

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
            open={open}
        >
            <div className={classes.toolbar}>
              <Input
                  placeholder="Search chats..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  className={classes.input}
                  inputProps={{
                    'aria-label': 'description',
                  }}
              />
              <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
              </IconButton>
            </div>

            <Divider />

            <div className={classes.drawer__block}>
                <ChatList
                    disabled={!isConnected}
                    chats={filterChats(activeTab === 0 ? chats.my : chats.all)}
                    activeChat={chats.active}
                    open={open}
                />

                <NewChatButton
                    openSidebar={open}
                    disabled={!isConnected}
                    onClick={createChat}
                />
                <BottomNavigation value={activeTab} onChange={handleTabChange} />
            </div>
        </Drawer>
    );
};

// Sidebar.propTypes = {
//     chats: PropTypes.shape({
//         active: PropTypes.object,
//         my: PropTypes.array.isRequired,
//         all: PropTypes.array.isRequired,
//     }).isRequired,
//     createChat: PropTypes.func.isRequired,
//     isConnected: PropTypes.bool.isRequired,
// }

export default Sidebar;
