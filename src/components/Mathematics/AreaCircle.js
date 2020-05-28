import React, { Suspense } from 'react';
import { Decimal } from 'decimal.js';
import SaveResult from '../ResultHistory/SaveResult';
import { withRouter } from "react-router-dom";
import CalculationCard from "../Utilities/CalculationCard";
import "bootswatch/dist/flatly/bootstrap.min.css";

const AddToFavoritesButton = React.lazy(() => 
import('../SiteUser/AddToFavoritesButton'));

class AreaCircle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentMounted: false,
            formulaName: 'areaCircle',
            variablesUsed : {
                r: {
                    value: Decimal, name: 'r', displayName: 'r', isResult: false
                },
                area: {
                    value: Decimal, name: 'area', displayName: 'Area', isResult: true
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

        console.log('AreaCircle handleChange');

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

        this.calculateArea();
    }

    calculateArea = () => {
        const pi = Decimal.acos(-1);
        const varR = this.state.variablesUsed.r.value;

        const varArea = pi * (varR * varR);

        this.setState(prevState => ({
            ...prevState,
            variablesUsed: {
                ...prevState.variablesUsed,
                area: {
                    ...prevState.variablesUsed.area,
                    value: varArea
                }
            }
        }));
    }

    render() {

        console.log('Area of a Circle re-rendered.');
        console.log(this.state.variablesUsed);
        console.log(this.props);

        return (
            <div className="jumbotron text-center">
            <h1 className="text-info">Area of a Circle</h1>
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

export default withRouter(AreaCircle);