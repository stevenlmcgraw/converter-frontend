import { useState, useEffect } from 'react';
import Decimal from 'decimal.js';

export function useFormulaVariablesUsed(passVariablesUsed) {
    const [ variablesUsed, setVariablesUsed ] = useState(passVariablesUsed);

    setVariablesUsed(passVariablesUsed);

    console.log('Hooks variablesUsed');
    console.log(passVariablesUsed);
    console.log(variablesUsed);

     return variablesUsed;
}

export function useDisplayFormulaVariableNames(passVariableNames) {
    const [ displayVariableNames, setDisplayVariableNames ] = useState(null);

    setDisplayVariableNames(passVariableNames);

    return displayVariableNames;
}

export function useFormulaVariable(passFormulaVariable) {
    const [ formulaVariable, setFormulaVariable ] = useState(passFormulaVariable);

    setFormulaVariable(passFormulaVariable);

    console.log('Inside hook useFormulaVariable');
    console.log(passFormulaVariable);
    console.log(formulaVariable);

     return formulaVariable;
}

export function useFormulaVariableName(passVariableName) {
    const [ formulaVariableName, setFormulaVariableName ] = useState(null);

    setFormulaVariableName(passVariableName);

    return formulaVariableName;
}

export function useDisplayFormulaVariableName(passDisplayVariableName) {
    const [ displayFormulaVariableName, setDisplayFormulaVariableName ] = useState(null);

    setDisplayFormulaVariableName(passDisplayVariableName);

    return displayFormulaVariableName;
}

export function useFormulaInputCallback(passCallback) {
    const [ callback, setCallback ] = useState(null);

    setCallback(passCallback);

    return callback;
}