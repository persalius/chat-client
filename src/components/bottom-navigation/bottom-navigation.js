import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "auto",
    flexWrap: "wrap",
  },
  button: {
      minWidth: "50px",
  }
}));

export default function SimpleBottomNavigation({value, onChange}) {
  const classes = useStyles();

  return (
    <BottomNavigation
      value={value}
      onChange={onChange}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction className={classes.button} label="My chats" icon={<RestoreIcon />} />
      <BottomNavigationAction className={classes.button} label="All chats" icon={<FavoriteIcon />} />
    </BottomNavigation>
  );
}