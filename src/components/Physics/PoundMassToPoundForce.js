import React, { Suspense } from "react";
import InputValues from "../Utilities/InputValues";
import {Decimal} from 'decimal.js';
import SaveResult from '../ResultHistory/SaveResult';
import { withRouter } from "react-router-dom";
import "bootswatch/dist/flatly/bootstrap.min.css";

const AddToFavoritesButton = React.lazy(() => 
import('../SiteUser/AddToFavoritesButton'));

class PoundMassToPoundForce extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentMounted: false,
            formulaName: 'poundMassToPoundForce',
            variablesUsed : {
                poundsMass: Decimal, 
                acceleration: Decimal, 
                poundsForce: Decimal
            },
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

    mapVariableNamesToProps = async () => { 
        this.setState({
            variablesUsed : {
                poundsMass : this.state.poundsMass,
                acceleration : this.state.acceleration,
                poundsForce : this.state.poundsForce
            }
        })
      };

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
        console.log('PoundMass');
        console.log(this.props.currentUser);
        console.log(this.props);
        return (
            
            <div>
            
            <div className="jumbotron text-center">
            <h1 className="text-primary">Pound Mass to Pound Force</h1>
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
                variablesUsed={this.state.variablesUsed}
                variableNames={this.state.variableNames}
                />
            </div>
            <div>
            <br></br>
            <Suspense fallback={null}>
            <AddToFavoritesButton 
                currentUser={this.props.currentUser}
                formulaName={this.state.formulaName}
            />
            </Suspense>
            </div>
            </div>
            </div>
    );
    }
  }

  export default withRouter(PoundMassToPoundForce);