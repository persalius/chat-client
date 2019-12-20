import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

function TabPanel(props) {
    const { children, value, index } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

const useStyles = makeStyles(theme => ({
    input: {
      width: "100%",
      margin: "10px 0"
    },
    button: {
      width: "100%",
      marginTop: "20px"
    }
}));

const LoginForm = ({value, index, onSubmit}) => {
    const classes = useStyles();
    const [inputs, setInputs] = React.useState({
        username: {value: "", isValid: true},
        password: {value: "", isValid: true}
    });

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit(inputs.username.value, inputs.password.value);
    }

    const handleInputChange = event => {
        const {name, value} = event.target;
        setInputs({
            ...inputs,
            [name]: {
                ...inputs[name],
                value
            }
        });
    }

    return(
        <TabPanel value={value} index={index}>
            <form onSubmit={handleSubmit}>
                <Input
                        placeholder="Username*"
                        required
                        className={classes.input}
                        inputProps={{
                            'aria-label': 'description',
                        }}
                        name="username"
                        value={inputs.username.value}
                        onChange={handleInputChange}
                        error={!inputs.username.isValid}
                />
                <Input
                        placeholder="Password*"
                        type="password"
                        required
                        className={classes.input}
                        inputProps={{
                        'aria-label': 'description',
                        }}
                        name="password"
                        value={inputs.password.value}
                        onChange={handleInputChange}
                        error={!inputs.password.isValid}
                />
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                    Login
                </Button>
            </form>
        </TabPanel>
    );
};

export default LoginForm;