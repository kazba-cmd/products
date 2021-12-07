import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import {Link as RouterLink} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {registerUser} from "../../store/actions/usersAction";
import {useDispatch, useSelector} from "react-redux";
import TextInput from "../../components/UI/Form/TextInput";

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
}));

const Register = (props) => {
    const classes = useStyles();
    const [state, setState] = useState({
        username: "",
        email: "",
        password: ""
    });

    const dispatch = useDispatch();
    const errors = useSelector(state => state.users.registerError);

    const inputHandler = event => {
        const {name, value} = event.target;
        setState(prevState => {
            return {...prevState, [name]: value}
        });
    };

    const formSubmitHandler = async event => {
        event.preventDefault();
        await dispatch(registerUser({...state}));
    };

    const getFieldError = fieldName => {
        try {
            return errors.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register User
                </Typography>
                <form className={classes.form} noValidate onSubmit={formSubmitHandler}>
                    <Grid container spacing={2}>
                        <TextInput
                            label="Username"
                            onChange={inputHandler}
                            name="username"
                            error={getFieldError('username')}
                            required={true}
                        />
                        <TextInput
                            label="E-mail"
                            onChange={inputHandler}
                            name="email"
                            error={getFieldError('email')}
                            required={true}
                        />
                        <TextInput
                            label="Password"
                            onChange={inputHandler}
                            name="password"
                            error={getFieldError('password')}
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
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2" component={RouterLink}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default Register;