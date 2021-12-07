import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import UserMenu from "./Menus/UserMenu";
import AnonymousMenu from "./Menus/AnonymousMenu";

const useStyles = makeStyles(theme => ({
    mainLink: {
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
            color: 'inherit'
        }
    },
    staticToolbar: {
        marginBottom: theme.spacing(2)
    },
    toolbar: {
        flexWrap: 'wrap'
    },
    toolbarTitle: {
        flexGrow: 1
    }
}));
const AppToolbar = ({user}) => {
    const classes = useStyles();

    return (
        <>
          <AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" className={classes.toolbarTitle}>
                    <Link to="/" className={classes.mainLink}>Shop.kz</Link>
                </Typography>
                {user ? <UserMenu user={user} /> : <AnonymousMenu/>}
            </Toolbar>
          </AppBar>
            <Toolbar className={classes.staticToolbar}/>
        </>
    );
};

export default AppToolbar;