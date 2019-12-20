import React, {useEffect} from 'react';
import {Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import ErrorMessage from "../components/error-message";
import Modal from "@material-ui/core/Modal";

import LoginForm from "../components/login-form";
import SignUpForm from "../components/signup-form";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {recieveAuth} from "../redux/actions";

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

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    minHeight: "100vh"
  },
  appAuth: {
    maxWidth: "500px",
    margin: "0 auto"
  },
  title: {
    background: "#3f51b5",
    color: "#fff",
    marginBottom: "50px"
  },
  modalWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    minWidth: '300px',
    padding: "15px"
  },
}));

WelcomePage.propTypes = {
  signup: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.instanceOf(Error),
  recieveAuth: PropTypes.func.isRequired
};

WelcomePage.defaultProps = {
  error: null
};

export default function WelcomePage({signup, login, isAuthenticated, error, recieveAuth}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    recieveAuth();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isAuthenticated) {
     return <Redirect to="/chat" />
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Toolbar className={classes.title}>
        <Typography variant="h6">
          Persalius chat
        </Typography>
      </Toolbar>

      <div className={classes.appAuth}>
        <AppBar position="static">
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab label="Login" href="/drafts" {...a11yProps(0)} />
            <LinkTab label="Sign up" href="/trash" {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <LoginForm value={value} index={0} onSubmit={login} />
        <SignUpForm value={value} index={1} onSubmit={signup} />
      </div>

      <ErrorMessage error={error} />
    </div>
  );
}
