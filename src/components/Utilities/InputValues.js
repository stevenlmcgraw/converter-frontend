import React from "react";

class InputValues extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            variableName: ''
        }
    }

    handleChange = (e) => {
        this.props.onVariableChange(e.target.value);
    }

    render() {
        return (
            <fieldset className="text-dark">
                <legend>Enter value for {this.props.variableName}: </legend>
                <input value={this.props.inputValue}
                        onChange={this.handleChange} />
            </fieldset>
        );
    }

}

export default InputValues;