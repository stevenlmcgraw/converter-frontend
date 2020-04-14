import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { sizing } from '@material-ui/system';
import InputValues from './InputValues';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: 275
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
});

const CalculationCard = React.memo( ({ passVariablesUsed, passCallback }) => {

    const classes = useStyles();

    const [ variablesUsed, setVariablesUsed ] = useState({});
    const [ parentCallback, setParentCallback ] = useState(passCallback);

    //setVariablesUsed(passVariablesUsed);

    useEffect(() => {
        setVariablesUsed(passVariablesUsed);
    });

    let inputValues;

    inputValues = Object.entries(variablesUsed).map(([key, variable]) => (
        <InputValues
        passFormulaVariable={variable}
        passCallback={passCallback}
        />
    ));

    console.log('CalculationCard re-rendered.');
    console.log(variablesUsed);
    console.log(inputValues);
    console.log(parentCallback);
    console.log(passCallback);

        return (
        <React.Fragment>
        <Card 
            className={classes.root} 
            variant="outlined" 
            raised="true"
            height="auto"
            >
            <CardContent>
            <Typography className={classes.title} gutterBottom>
            Calculate!
            </Typography>
            <Typography className={classes.pos}>
            {inputValues}
            </Typography>
            </CardContent>
        </Card>
        </React.Fragment>
    );
});

export default CalculationCard;