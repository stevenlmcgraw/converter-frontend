import React from "react";
import {Decimal} from 'decimal.js';

const variableNames = {
    pM: 'Pounds Mass',
    a: 'Acceleration Due to Gravity'
}

class InputValues extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onVariableChange(e.target.value);
    }

    render() {
        const inputValue = this.props.inputValue;
        const variableName = this.props.variableName;
        return (
            <fieldset>
                <legend>Enter value for {variableNames[variableName]}: </legend>
                <input value={inputValue}
                        //type="number"
                        onChange={this.handleChange} />
            </fieldset>
        );
    }

}

class PoundMassToPoundForce extends React.Component {
    constructor(props) {
        super(props);
        this.handlePoundsMassChange = this.handlePoundsMassChange.bind(this);
        this.handleAccelerationChange = this.handleAccelerationChange.bind(this);
        this.calculatePoundsForce = this.calculatePoundsForce.bind(this);
        this.state = {poundsMass: Decimal, 
                        acceleration: Decimal, 
                        poundsForce: Decimal};
    }

    handlePoundsMassChange(inputValue){
        this.setState({ poundsMass: inputValue });
        this.calculatePoundsForce();
    };

    handleAccelerationChange(inputValue){
        this.setState({ acceleration: inputValue });
        this.calculatePoundsForce();  
    };

    calculatePoundsForce() {
        
    const earthGravityFtPerSecSq = new Decimal(parseFloat(32.174));
    const decimalPoundsMass = new Decimal(parseFloat(this.state.poundsMass));
    const decimalAcceleration = new Decimal(parseFloat(this.state.acceleration));

    const result = (decimalPoundsMass * decimalAcceleration) / earthGravityFtPerSecSq;

    this.setState(
        { poundsForce: result });
    };

    render() {
        //const poundsMass = this.props.poundsMass;
        //const acceleration = this.props.acceleration;
        return (
            <div>
            <div>
                <InputValues
                variableName="pM"
                inputValue={this.props.poundsMass}
                onVariableChange={this.handlePoundsMassChange} />
                <InputValues
                variableName="a"
                inputValue={this.props.acceleration}
                onVariableChange={this.handleAccelerationChange} />
            </div>
            
            <div>
                <br></br>
                <p>The Pounds Force result is: {this.state.poundsForce} lbf.</p>
            </div>
            </div>
    );
    }
  }

  export default PoundMassToPoundForce;