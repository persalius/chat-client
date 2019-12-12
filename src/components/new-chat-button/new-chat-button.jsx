import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Fab from "@material-ui/core/Fab";
import clsx from "clsx";
import AddIcon from '@material-ui/icons/Add';
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    addBtn: {
        width: "50px",
        height: "50px",
        position: "absolute",
        bottom: "74px",
        right: "23px",
        zIndex: 1,
        transition: "0.3s all",
        [theme.breakpoints.down('xs')]: {
            width: "40px",
            height: "40px",
        },
    },
    addBtnClosed: {
        position: "static",
        margin: "0 auto"
    },
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

const NewChatButton = ({openSidebar, disabled, onClick}) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState({
        value: "",
        isValid: true
    });

    const toggleModal = () => setOpen(!open);

    const handleTitleChange = (event) => {
        setTitle({
            value: event.target.value,
            isValid: true
        });
    };

    const handleCreateClick = (event) => {
        event.preventDefault();

        if (!title.value) {
            setTitle({
                value: title.value,
                isValid: false,
            });
            return;
        }

        onClick(title.value);
        toggleModal();
        setTitle({
            value: "",
            isValid: true,
        });
    };

    return (
        <Fragment>
            <Fab
                color="primary"
                aria-label="add"
                disabled={disabled}
                className={clsx(classes.addBtn, {
                    [classes.addBtnClosed]: !openSidebar
                })}
                onClick={toggleModal}
            >
                <AddIcon />
            </Fab>

            <Modal open={open} className={classes.modalWrapper} onClose={toggleModal}>
                <Paper className={classes.modal}>
                    <Typography variant="caption" id="modal-title">
                        Create new chat
                    </Typography>
                    <TextField
                        required
                        fullWidth
                        label="New chat"
                        placeholder="Type the title..."
                        type="text"
                        margin="normal"
                        autoComplete="new-chat"
                        value={title.value}
                        onChange={handleTitleChange}
                        error={!title.isValid}
                    />
                    <Button color="primary" onClick={handleCreateClick}>
                        Create
                    </Button>
                </Paper>
            </Modal>
        </Fragment>
    );
}

// NewChatButton.propTypes = {
//     onClick: PropTypes.func.isRequired,
//     disabled: PropTypes.bool.isRequired,
// }

export default NewChatButton;