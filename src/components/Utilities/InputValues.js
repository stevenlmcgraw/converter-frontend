import React, { useState, useEffect } from "react";
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

    // TODO: Not sure why you would do it this way, but this is how you could use useEffect to reassign
    // passed props to state variable in the component.
    const [currentVariable, setCurrentVariable ] = useState({});
    const [parentCallback, setParentCallback ] = useState();

    useEffect(() => {
      setCurrentVariable(passFormulaVariable);
      setParentCallback(passCallback)
    }, [passFormulaVariable, passCallback]);

    const handleChange = event => {
      event.preventDefault();

      console.log('InputValues handleChange');
      console.log(event.target.name);
      console.log(event.target.value);

      
      const updatedVariable = {
        value: event.target.value,
        name: event.target.name,
        displayName: currentVariable.displayName
      };

    
      console.log(event.target);
      console.log(updatedVariable)

      setCurrentVariable(updatedVariable); 
      passCallback(event, updatedVariable);
    }

    const showVariable = ( passedVariable ) => {

      console.log('InputValues showVariable()');
      console.log(passedVariable);

      let theVariable;

       if(passedVariable.isResult) {
          theVariable = 
          <TextField 
              autoComplete="off"
              label={currentVariable.displayName}
              name={currentVariable.name}
              value={currentVariable.value}
              onChange={event => handleChange(event)}
              variant="outlined"
              />
        }
        else {
          theVariable =
          <TextField 
              autoComplete="off"
              label={currentVariable.displayName}
              name={currentVariable.name}
              value={currentVariable.value}
              onChange={event => handleChange(event)}
              variant="outlined"
              />
              
        }
      
      return theVariable;
    }

    console.log('InputValues re-rendered.');
    console.log(currentVariable);
    console.log(parentCallback);
    console.log(passCallback);

        return (
          <Typography className={classes.root}>
          {showVariable(currentVariable)}
          </Typography>
        )
    
});

export default InputValues;