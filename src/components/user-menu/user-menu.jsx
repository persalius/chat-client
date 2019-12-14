import React, {useState, useEffect, Fragment} from "react";
import PropTypes from 'prop-types';
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    modalWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '30%',
        minWidth: '300px',
        padding: "15px",
    },
}));

export default function UserMenu(props) {
    const classes = useStyles();

    const [isModalOpen, setModalState] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [checkUpdate, setCheckUpdate] = useState(true);
    const [errorInput, setErrorInput] = useState(false);

    const { disabled, error } = props;

    function updateData() {
        if (props.activeUser) {
            if (props.activeUser.username !== username) {
                setUsername(props.activeUser.username);
            }

            if (props.activeUser.firstName !== firstName) {
                setFirstName(props.activeUser.firstName);
            }

            if (props.activeUser.lastName !== lastName) {
                setLastName(props.activeUser.lastName);
            }
        }

        if (error) {
            setErrorInput(true);
        }
    };

    if (checkUpdate) {
        updateData();
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        if (errorInput) {
            setUsername(props.activeUser.username);
            setErrorInput(false);
        }
        setAnchorEl(null);
    };

    const handleInputChange = (event) => {
        setCheckUpdate(false);
        switch (event.target.name) {
            case "username":
                return setUsername(event.target.value);
            case "firstName":
                return setFirstName(event.target.value);
            case "lastName":
                return setLastName(event.target.value);
            default:
                return null;
        }
    };

    const toggleEditProfileModal = () => {
        setModalState(!isModalOpen);
        handleClose();
    };

    const handleSaveClick = () => {
        props.onEditProfileClick({
            username,
            firstName,
            lastName
        })
            .then(result => {
                if (result.payload && result.payload.message) {
                    setErrorInput(true);
                } else {
                    toggleEditProfileModal();
                }
            })
            .catch(() => console.log("Error"));
    };

    const handleLogoutClick = () => {
        props.onLogoutClick();
        handleClose();
    };

        return (
            <Fragment>
                <IconButton
                    color="inherit"
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    disabled={disabled}
                    onClick={handleClick}
                >
                    <AccountCircleIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={toggleEditProfileModal}>Edit Profile</MenuItem>
                    <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                </Menu>
                <Modal
                    open={isModalOpen}
                    className={classes.modalWrapper}
                    onClose={toggleEditProfileModal}
                >
                    <Paper className={classes.modal}>
                        <Typography variant="caption" id="modal-title">
                            Edit profile
                        </Typography>
                        <TextField
                            required
                            error={errorInput}
                            fullWidth
                            name="username"
                            label="Username"
                            placeholder="Enter you username..."
                            type="text"
                            margin="normal"
                            defaultValue={username}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            name="firstName"
                            label="First name"
                            placeholder="Enter you first name..."
                            type="text"
                            margin="normal"
                            defaultValue={firstName}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            name="lastName"
                            label="Last name"
                            placeholder="Enter you last name..."
                            type="text"
                            margin="normal"
                            defaultValue={lastName}
                            onChange={handleInputChange}
                        />
                        <Button color="primary" onClick={handleSaveClick}>
                            Save
                        </Button>
                        <Button onClick={toggleEditProfileModal}>Close</Button>
                    </Paper>
                </Modal>
            </Fragment>
        );
}

// UserMenu.propTypes = {
//     activeUser: PropTypes.shape({
//         firstName: PropTypes.string,
//         lastName: PropTypes.string,
//         username: PropTypes.string,
//     }).isRequired,
//     onEditProfileClick: PropTypes.func.isRequired,
//     onLogoutClick: PropTypes.func.isRequired,
//     disabled: PropTypes.bool.isRequired,
// };
