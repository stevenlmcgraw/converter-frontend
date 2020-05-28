import React, { Suspense } from 'react';
import { Decimal } from 'decimal.js';
import SaveResult from '../ResultHistory/SaveResult';
import { withRouter } from "react-router-dom";
import CalculationCard from "../Utilities/CalculationCard";
import "bootswatch/dist/flatly/bootstrap.min.css";

const AddToFavoritesButton = React.lazy(() => 
import('../SiteUser/AddToFavoritesButton'));

class MHzToMeters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentMounted: false,
            formulaName: 'mhzToMeters',
            variablesUsed : {
                mhz: {
                    value: Decimal, name: 'mhz', displayName: 'MHz', isResult: false
                },
                meters: {
                    value: Decimal, name: 'meters', displayName: 'meters', isResult: true
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

        console.log('Square Root handleChange');

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
        const mhzToMeters = 299.792458;

        const varMhz = this.state.variablesUsed.mhz.value;

        const varM = mhzToMeters / varMhz;

        this.setState(prevState => ({
            ...prevState,
            variablesUsed: {
                ...prevState.variablesUsed,
                meters: {
                    ...prevState.variablesUsed.meters,
                    value: varM
                }
            }
        }));
    }

    render() {

        console.log('MHz to Meters re-rendered.');
        console.log(this.state.variablesUsed);
        console.log(this.props);

        return (
            <div className="jumbotron text-center">
            <h1 className="text-info">MHz to Meters</h1>
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

export default withRouter(MHzToMeters);