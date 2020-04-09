import { useState, useEffect } from 'react';
import Decimal from 'decimal.js';

export function useFormulaVariablesUsed(passVariablesUsed) {
    const [ variablesUsed, setVariablesUsed ] = useState([]);

    setVariablesUsed(passVariablesUsed);

    // useEffect(() => {
    //     variablesUsed = setVariablesUsed(passVariablesUsed);
    //  });

     return variablesUsed;
}

export function useDisplayFormulaVariableNames(passVariableNames) {
    const [ displayVariableNames, setDisplayVariableNames ] = useState(null);

    setDisplayVariableNames(passVariableNames);

    // useEffect(() => {
    //     variableNames = setVariableNames(passVariableNames);
    //  });

    return displayVariableNames;
}

export function useFormulaVariable(passFormulaVariable) {
    const [ formulaVariable, setFormulaVariable ] = useState(null);

    setFormulaVariable(passFormulaVariable);

    // useEffect(() => {
    //     formulaVariable = setFormulaVariable(passFormulaVariable);
    //  });

     return formulaVariable;
}

export function useFormulaVariableName(passVariableName) {
    const [ formulaVariableName, setFormulaVariableName ] = useState(null);

    setFormulaVariableName(passVariableName);

    // useEffect(() => {
    //     formulaVariableName = setFormulaVariableName(passVariableName);
    //  });

    return formulaVariableName;
}

export function useDisplayFormulaVariableName(passDisplayVariableName) {
    const [ displayFormulaVariableName, setDisplayFormulaVariableName ] = useState(null);

    setDisplayFormulaVariableName(passDisplayVariableName);

    // useEffect(() => {
    //     formulaVariableName = setFormulaVariableName(passVariableName);
    //  });

    return displayFormulaVariableName;
}

export function useFormulaInputCallback(passCallback) {
    const [ callback, setCallback ] = useState(null);

    setCallback(passCallback);

    // useEffect(() => {
    //     formulaVariableName = setFormulaVariableName(passVariableName);
    //  });

    return callback;
}