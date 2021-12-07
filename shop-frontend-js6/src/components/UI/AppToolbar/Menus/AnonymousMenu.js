import React from 'react';
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    link: {
        margin: theme.spacing(1, 1.5),
    }
}));
const AnonymousMenu = () => {
    const classes = useStyles();
    return (
        <>
            <Button to="/login" className={classes.link} color="inherit" variant="outlined" component={NavLink}>Sign In</Button>
            <Button to="/register" className={classes.link} color="inherit" variant="outlined" component={NavLink}>Sign Up</Button>
        </>
    );
};

export default AnonymousMenu;