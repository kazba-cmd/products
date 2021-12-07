import React from 'react';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';

const TextInput = ({name, label, type, required, error, onChange}) => {

    return (
        <Grid item xs={12}>
            <TextField
                autoComplete={name}
                name={name}
                type={type}
                variant="outlined"
                required={required}
                fullWidth
                id={name}
                label={label}
                autoFocus
                onChange={onChange}
                error={!!error}
                helperText={error}
            />
        </Grid>
    );
};

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.func,
    onChange: PropTypes.func.isRequired
};

export default TextInput;