import React from "react";

class InputValues extends React.Component {
    constructor(props) {
        super(props); 
    }

    handleChange = (e) => {
        this.props.onVariableChange(e.target.value);
    }

    render() {
        const inputValue = this.props.inputValue;
        const variableName = this.props.variableName;
        const variableNames = {};
        return (
            <fieldset>
                <legend>Enter value for {variableNames[variableName]}: </legend>
                <input value={inputValue}
                        onChange={this.handleChange} />
            </fieldset>
        );
    }

}

export default InputValues;