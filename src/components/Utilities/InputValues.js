import React from "react";
import { useFormulaVariable, useFormulaVariableName, 
    useDisplayFormulaVariableName, useFormulaInputCallback } from '../Utilities/Hooks';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import "bootswatch/dist/flatly/bootstrap.min.css";
//import classes from "./Input.module.css";

// class InputValues extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             inputValue: '',
//             variableName: ''
//         }
//     }

//     handleChange = (e) => {
//         this.props.onVariableChange(e.target.value);
//     }

//     render() {
//         return (
//             <fieldset className="text-dark">
//                 <legend>Enter value for {this.props.variableName}: </legend>
//                 <input value={this.props.inputValue}
//                         onChange={this.handleChange} />
//             </fieldset>
//         );
//     }

// }

// export default InputValues;

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

const InputValues = ({ passFormulaVariable, callback }) => {

    const classes = useStyles();

    const inputValue= useFormulaVariable(passFormulaVariable.value);
    const variableName = useFormulaVariableName(passFormulaVariable.name);
    const displayVariableName = useDisplayFormulaVariableName(passFormulaVariable.displayName);
    const parentCallback = useFormulaInputCallback(callback);

    console.log('InputValues re-rendered.');
    console.log(variableName);

        return (
            
            <TextField 
                autoComplete="off"
                label={displayVariableName}
                name={variableName}
                value={inputValue}
                onChange={callback}
                variant="outlined"
                />
        );
    
}

export default InputValues;