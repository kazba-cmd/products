import React, {useRef, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    file: {
        display: 'none'
    }
});
const FileInput = ({name, label, onChange}) => {
    const inputRef = useRef();
    const [filename, setFilename] = useState('');

    const classes = useStyles();

    const onFileChange = e => {
        if(e.target.files[0]) {
            setFilename(e.target.files[0].name)
        }else{
            setFilename('')
        }
        onChange(e);
    };
    const activateInput = () => {
        inputRef.current.click();
    };

    return (
        <>
            <input
                type="file"
                name={name}
                className={classes.file}
                onChange={onFileChange}
                ref={inputRef}
            />
            <Grid container direction="row" spacing={2} alignItems="center">
                <Grid item>
                    <TextField
                        variant="outlined"
                        disabled
                        fullWidth
                        label={label}
                        value={filename}
                        onClick={activateInput}
                        required
                        />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={activateInput}
                    >
                        Select file
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default FileInput;