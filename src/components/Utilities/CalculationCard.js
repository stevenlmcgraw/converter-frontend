import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Hooks, { useFormulaVariablesUsed, useFormulaInputCallback } from '../Utilities/Hooks';
import InputValues from './InputValues';

const useStyles = makeStyles({
    root: {
        minWidth: 275
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
});

const CalculationCard = ({ passVariablesUsed, passCallback }) => {

    const classes = useStyles();

    //const variablesUsed = useFormulaVariablesUsed(passVariablesUsed);
    //const displayVariableNames = useDisplayFormulaVariableNames(passDisplayVariableNames);
    //const parentCallback = useFormulaInputCallback(passCallback);

    const [ variablesUsed, setVariablesUsed ] = useState(passVariablesUsed);
    const [ parentCallback, setParentCallback ] = useState(passCallback);

    console.log('CalculationCar re-rendered.');

    return (
        
        <Card className={classes.root} variant="outlined">
            <CardContent className={classes.title}>
            <Typography>
            Calculate!
            </Typography>
            {Object.entries(variablesUsed).map(([key, variable]) => (
                <InputValues
                passFormulaVariable={variable}
                callback={parentCallback}
                />
            ))}
            </CardContent>
        </Card>
        
    );
}

export default CalculationCard;