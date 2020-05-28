import React, { Suspense } from 'react';
import { Decimal } from 'decimal.js';
import SaveResult from '../ResultHistory/SaveResult';
import { withRouter } from "react-router-dom";
import CalculationCard from "../Utilities/CalculationCard";
import "bootswatch/dist/flatly/bootstrap.min.css";

const AddToFavoritesButton = React.lazy(() => 
import('../SiteUser/AddToFavoritesButton'));

class PowerToDecibels extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentMounted: false,
            formulaName: 'powerToDecibels',
            variablesUsed : {
                p1: {
                    value: Decimal, name: 'p1', displayName: 'P1', isResult: false
                },
                p2: {
                    value: Decimal, name: 'p2', displayName: 'P2', isResult: true
                },
                dB: {
                    value: Decimal, name: 'dB', displayName: 'dB', isResult: true
                }
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

    handleChange = async (event, updatedVariable) => {

        console.log('PowerToDecibels handleChange');

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
                    value: inputValue
                }}
            }));
        }

        this.convert();
    }

    convert = () => {
        const varP1 = this.state.variablesUsed.p1.value;
        const varP2 = this.state.variablesUsed.p2.value;

        const varDb = 10 * (Math.log(varP1/varP2));

        this.setState(prevState => ({
            ...prevState,
            variablesUsed: {
                ...prevState.variablesUsed,
                dB: {
                    ...prevState.variablesUsed.dB,
                    value: varDb
                }
            }
        }));
    }

    render() {

        console.log('PowerToDecibels re-rendered.');
        console.log(this.state.variablesUsed);
        console.log(this.props);

        return (
            <div className="jumbotron text-center">
            <h1 className="text-info">Power to Decibels</h1>
                <div className="text-left">
                    <CalculationCard 
                        passVariablesUsed={this.state.variablesUsed}
                        passCallback={this.handleChange}
                        className="card card-body"
                    />
                <div className="text-success font-weight-bolder">
                <br></br>
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

export default withRouter(PowerToDecibels);