import React from "react";
import InputValues from "../Utilities/InputValues";
import {Decimal} from 'decimal.js';

class PoundMassToPoundForce extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            poundsMass: Decimal, 
            acceleration: Decimal, 
            poundsForce: Decimal,
            variableNames: {
                pM: 'Pounds Mass',
                a: 'Acceleration Due to Gravity'
            }
        };
    }

    handlePoundsMassChange = async (inputValue) => {
        await this.setState({ poundsMass: inputValue});
        this.calculatePoundsForce();
    };

    handleAccelerationChange = async (inputValue) => {
        await this.setState({ acceleration: inputValue });
        this.calculatePoundsForce();  
    };

    calculatePoundsForce = () => {
        
    const earthGravityFtPerSecSq = 32.174;

    const result = (this.state.poundsMass * this.state.acceleration) / earthGravityFtPerSecSq;

    this.setState(
        { poundsForce: result });
    };

    render() {
        return (
            <div>
            <div>
                <InputValues
                variableName={this.state.variableNames.pM}
                inputValue={this.props.poundsMass}
                onVariableChange={this.handlePoundsMassChange} />
                <InputValues
                variableName={this.state.variableNames.a}
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