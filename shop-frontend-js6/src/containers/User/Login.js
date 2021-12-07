import React, {useState} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextInput from "../../components/UI/Form/TextInput";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../store/actions/usersAction";
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    alert: {
        marginTop: theme.spacing(3),
        width: '100%'
    }
}));

const Login = () => {

    const classes = useStyles();
    const [state, setState] = useState({
        username: "",
        password: ""
    });

    const dispatch = useDispatch();
    const errors = useSelector(state => state.users.loginError);

    const inputHandler = event => {
        const {name, value} = event.target;
        setState(prevState => {
            return {...prevState, [name]: value}
        });
    };

    const formSubmitHandler = async event => {
        event.preventDefault();
        await dispatch(loginUser({...state}));
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                {
                errors && errors.error &&
                    <Alert
                        severity="error"
                        className={classes.alert}
                    >
                        {errors.error}
                    </Alert>
                }
                <form className={classes.form} onSubmit={formSubmitHandler}>
                    <Grid container spacing={2}>
                        <TextInput
                            label="Username"
                            onChange={inputHandler}
                            name="username"
                            required={true}
                        />
                        <TextInput
                            label="Password"
                            onChange={inputHandler}
                            name="password"
                            required={true}
                            type="password"
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/register" variant="body2" component={RouterLink}>
                                Or sign up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default Login;