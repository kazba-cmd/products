import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import FileInput from "../UI/Form/FileInput";
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
import { useSelector } from 'react-redux';
const useStyles = makeStyles(theme => ({
   root: {
       marginTop: theme.spacing(2)
   }
}));

const ProductAddForm = ({onSubmit}) => {
    const classes = useStyles();
    const category = useSelector(state=> state.products.category);
    const [state, setState] = useState({
        title: "",
        price: "",
        description: "",
        image: "",
        category: ''
    });
    const inputChangeHandler = event => {
      const {name, value} = event.target;
      setState(prevState => {
          return {...prevState, [name]: value}
      })
    };
    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setState(prevState =>({
            ...prevState,
            [name]: file
            })
        )
    };
    const submitFormHandler = event => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(state).forEach(key => {
            formData.append(key, state[key])
        });
        onSubmit(formData);
    };
    return (
        <form
            className={classes.root}
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <TextField
                    fullWidth
                    variant="outlined"
                    id="title"
                    label="Title"
                    value={state.title}
                    name="title"
                    required
                    onChange={inputChangeHandler}
                    />
            </Grid>
            <Grid item>
                <TextField
                    fullWidth
                    variant="outlined"
                    id="price"
                    label="Price"
                    value={state.price}
                    name="price"
                    required
                    onChange={inputChangeHandler}
                />
            </Grid>
            <Grid item>
                <TextField
                    fullWidth
                    multiline
                    rows={5}
                    variant="outlined"
                    id="description"
                    label="Description"
                    value={state.description}
                    name="description"
                    required
                    onChange={inputChangeHandler}
                />
            </Grid>
            <Grid item>
                <FileInput
                    name="image"
                    label="Image"
                    onChange={fileChangeHandler}
                />
            </Grid>
            <Grid item>
                <Select name='category' value={state.category} required onChange={inputChangeHandler}>
                    {category.map((elem, index) => {
                        return (
                            <MenuItem key={index} value={elem._id}>
                                {elem.title}
                            </MenuItem>
                        )
                    })}
                </Select>
            </Grid>
            <Grid item>
                <Button type="submit" color="primary" variant="contained">Create</Button>
            </Grid>
        </Grid>
        </form>
    );
};

export default ProductAddForm;