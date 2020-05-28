import React, { Suspense } from "react";
import {Decimal} from 'decimal.js';
import SaveResult from '../ResultHistory/SaveResult';
import { withRouter } from "react-router-dom";
import CalculationCard from "../Utilities/CalculationCard";
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
                poundsMass: {
                    value: Decimal, name: 'poundsMass', displayName: 'lbm', isResult: false
                },
                acceleration: {
                    value: Decimal, name: 'acceleration', displayName: 'Acceleration', isResult: false
                },
                poundsForce: {
                    value: Decimal, name: 'poundsForce', displayName: 'lbf', isResult: true
                },
            }
        }
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

    handleChange = async (event, updatedVariable) => {

        console.log('PoundMass handleChange');

        console.log(updatedVariable);
        console.log(this.state.variablesUsed);

        if(updatedVariable !== undefined) {

            console.log('Hit if()');

            const inputValue = updatedVariable.value;
            const inputName = updatedVariable.name;
            // const inputDisplayName = updatedVariable.displayName;

            await this.setState(prevState => ({
                ...prevState,
                variablesUsed: {
                    ...prevState.variablesUsed,
                [inputName]: {
                    ...prevState.variablesUsed[inputName],
                    value: inputValue,
                    //name: inputName,
                    //displayName: inputDisplayName
                }}
            }));
        }

        this.calculatePoundsForce();
    }

    calculatePoundsForce = () => {
        
        const lbm = this.state.variablesUsed.poundsMass.value;
        const a = this.state.variablesUsed.acceleration.value;

        const earthGravityFtPerSecSq = 32.174;

        const result = (lbm * a) / earthGravityFtPerSecSq;

        this.setState(prevState => ({
            ...prevState,
            variablesUsed: {
                ...prevState.variablesUsed,
                poundsForce: {
                    ...prevState.variablesUsed.poundsForce,
                    value: result
                }
            }
        }));
    };

    render() {
        console.log('PoundMass');
        console.log(this.props.currentUser);
        console.log(this.props);
        return (
            <div className="jumbotron text-center">
            <h1 className="text-primary">Pound Mass to Pound Force</h1>
            <div className="text-left">
                <CalculationCard
                    passVariablesUsed={this.state.variablesUsed}
                    passCallback={this.handleChange}
                />
                <div className="text-success font-weight-bolder">
                <br></br>
                
                <SaveResult currentUser={this.props.currentUser}
                            variablesUsed={this.state.variablesUsed}
                            variableNames={this.state.variableNames}
                />
            </div>
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
    );
    }
  }

  export default withRouter(PoundMassToPoundForce);