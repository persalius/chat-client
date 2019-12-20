import React, {useState, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "16px",
    height: "64px"
  },
  input: {
      width: "100%",
      border: "none"
  }
}));

export default function InputMessage(props) {
  const classes = useStyles();
  const [value, setValue] = useState("");

  const {onJoinButtonClick, showJoinButton, sendMessage, activeUser, disabled} = props;

   const handleValueChange = (event) => {
       setValue(event.target.value)
   };

  const handleKeyPress = (event) => {
      if (event.key === 'Enter' && value) {
          sendMessage(value);
          setValue("");
      }
  };

  return (
    <Fragment>
        {showJoinButton ? (
            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={onJoinButtonClick}
                disabled={disabled}
            >
                Join
            </Button>
        ) : (
            <Paper className={classes.root}>
                <Input
                    disabled={disabled}
                    placeholder="Type your message..."
                    value={value}
                    className={classes.input}
                    onChange={handleValueChange}
                    onKeyPress={handleKeyPress}
                    inputProps={{
                        'aria-label': 'description',
                    }}
                />
            </Paper>
        )}
    </Fragment>
  );
}
