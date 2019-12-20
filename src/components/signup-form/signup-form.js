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

const SignUpForm = ({value, index, onSubmit}) => {
    const classes = useStyles();
    const [inputs, setInputs] = React.useState({
        username: {value: "", isValid: true},
        password: {value: "", isValid: true},
        repeatPassword: {value: "", isValid: true}
    });

    const validate = () => {
        const isValid = inputs.password.value === inputs.repeatPassword.value;
    
        setInputs({
            ...inputs,
            password: {
                ...inputs.password,
                isValid
            },
            repeatPassword: {
                ...inputs.repeatPassword,
                isValid
            }
        });
        
        return isValid;
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

    const handleSubmit = event => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        onSubmit(inputs.username.value, inputs.password.value);
    }

    return(
        <TabPanel value={value} index={index}>
            <form onSubmit={handleSubmit}>
                <Input
                        placeholder="Username*"
                        name="username"
                        required
                        className={classes.input}
                        inputProps={{
                        'aria-label': 'description',
                        }}
                        value={inputs.username.value}
                        onChange={handleInputChange}
                        error={!inputs.username.isValid}
                />
                <Input
                        placeholder="Password*"
                        name="password"
                        required
                        type="password"
                        className={classes.input}
                        inputProps={{
                        'aria-label': 'description',
                        }}
                        value={inputs.password.value}
                        onChange={handleInputChange}
                        error={!inputs.password.isValid}
                />
                <Input
                        placeholder="Repeat password*"
                        name="repeatPassword"
                        required
                        type="password"
                        className={classes.input}
                        inputProps={{
                        'aria-label': 'description',
                        }}
                        value={inputs.repeatPassword.value}
                        onChange={handleInputChange}
                        error={!inputs.repeatPassword.isValid}
                />
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                    Login
                </Button>
            </form>
        </TabPanel>
    );
};

export default SignUpForm;