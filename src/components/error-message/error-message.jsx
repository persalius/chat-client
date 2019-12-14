import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
}));

export default function ErrorMessage({error}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleClose = () => {
        setOpen(false);
    };

    if (error && errorMessage !== error) {
        setErrorMessage(error);
        setOpen(true);
    }

    if (!error) {
        return null;
    }

    return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span>{error.message}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
            />
    );
}
