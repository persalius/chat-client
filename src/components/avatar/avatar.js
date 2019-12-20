import React from "react";
import PropTypes from "prop-types";
import MUIAvatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import getColor from "../../utils/color-from";
import titleInitials from "../../utils/title-initials";

const useStyles = makeStyles(theme => ({
    avatar: {
        width: "36px",
        height: "36px",
        fontSize: "1.1em",
        [theme.breakpoints.down('xs')]: {
            width: "30px",
            height: "30px",
        },
    }
}));

const Avatar = ({colorFrom, children }) => {
    const classes = useStyles();

    return (
        <MUIAvatar
            style={{backgroundColor: getColor(colorFrom)}}
            className={classes.avatar}
        >
            {titleInitials(children)}
        </MUIAvatar>
    );
};

Avatar.propTypes = {
    colorFrom: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired
};

export default Avatar;
