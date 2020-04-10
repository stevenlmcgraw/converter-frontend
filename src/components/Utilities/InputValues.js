import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useFormulaVariable, useFormulaVariableName, 
    useDisplayFormulaVariableName, useFormulaInputCallback } from '../Utilities/Hooks';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import "bootswatch/dist/flatly/bootstrap.min.css";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

const InputValues = React.memo( ({ passFormulaVariable, passCallback }) => {

    const classes = useStyles();

    const [currentVariable, setCurrentVariable ] = useState(passFormulaVariable);
    const [parentCallback, setParentCallback ] = useState(passCallback);

    useEffect(() => {
      setCurrentVariable(currentVariable);
      setParentCallback(passCallback);
    });

    const handleChange = event => {
      console.log('InputValues handleChange');
      console.log(event);
      setCurrentVariable(event.target); 
      passCallback(currentVariable);
    }

    console.log('InputValues re-rendered.');
    console.log(currentVariable);
    console.log(parentCallback);
    console.log(passCallback);

          return (
            <Typography>
            <TextField 
                autoComplete="off"
                label={currentVariable.displayName}
                name={currentVariable.name}
                value={currentVariable.value}
                onChange={event => handleChange(event)}
                variant="outlined"
                />
            </Typography>
        );
    
});

export default InputValues;