import React from "react";
import InputValues from "../Utilities/InputValues";
import {Decimal} from 'decimal.js';
import SaveResult from '../ResultHistory/SaveResult';

class PoundMassToPoundForce extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentMounted: false,
            poundsMass: Decimal, 
            acceleration: Decimal, 
            poundsForce: Decimal,
            variableNames: {
                pM: 'Pounds Mass',
                a: 'Acceleration Due to Gravity'
            }
        };
    }

    componentDidMount() {
        this.setState({
            componentMounted: !this.state.componentMounted
        });
    }

    componentWillUnmount() {
        this.setState({
            componentMounted: !this.state.componentMounted
        });
    }

    componentDidUpdate() {
        this.mapVariableNamesToProps();
    }


    mapVariableNamesToProps = () => { 
        let values = Object.values(this.state.variableNames);
        
        
        console.log('Inside PoundMass ' + values);
        // return (values.map(name => values[name]))
        return values;
      };

    // mapVariableNamesToProps = () => { 
    //     let values = [this.state.variableNames]
    //     return(values.map(name => 
    //      name));
        
    //    console.log('Inside PoundMass ' + values);
    //   };

    handlePoundsMassChange = async (inputValue) => {
        await this.setState({ poundsMass: inputValue});
        this.calculatePoundsForce();
        this.mapVariableNamesToProps();
    };

    handleAccelerationChange = async (inputValue) => {
        await this.setState({ acceleration: inputValue });
        this.calculatePoundsForce();
        this.mapVariableNamesToProps();
    };

    calculatePoundsForce = () => {
        
    const earthGravityFtPerSecSq = 32.174;

    const result = (this.state.poundsMass * this.state.acceleration) / earthGravityFtPerSecSq;

    this.setState(
        { poundsForce: result });
    };

    render() {
        let saveButton;
        if(this.props.currentUser) {
            saveButton = [
                <SaveResult>
                    {saveButton}
                </SaveResult>
            ]
        }
        return (
            <div>
            <div className="jumbotron text-center">
                <InputValues
                variableName={this.state.variableNames.pM}
                inputValue={this.props.poundsMass}
                onVariableChange={this.handlePoundsMassChange} />
                <InputValues
                variableName={this.state.variableNames.a}
                inputValue={this.props.acceleration}
                onVariableChange={this.handleAccelerationChange} />
            
            
            <div className="text-success font-weight-bolder">
                <br></br>
                <p>The Pounds Force result is: {this.state.poundsForce} lbf.</p>
                <SaveResult currentUser={this.props.currentUser} 
                variableNamesPassed={this.mapVariableNamesToProps}/>
            </div>
            </div>
            </div>
    );
    }
  }

  

  export default PoundMassToPoundForce;