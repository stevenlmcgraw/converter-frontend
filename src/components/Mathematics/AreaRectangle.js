import React, { Suspense } from 'react';
import { Decimal } from 'decimal.js';
import SaveResult from '../ResultHistory/SaveResult';
import { withRouter } from "react-router-dom";
import CalculationCard from "../Utilities/CalculationCard";
import "bootswatch/dist/flatly/bootstrap.min.css";

const AddToFavoritesButton = React.lazy(() => 
import('../SiteUser/AddToFavoritesButton'));

class AreaRectangle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentMounted: false,
            formulaName: 'areaRectangle',
            variablesUsed : {
                a: {
                    value: Decimal, name: 'a', displayName: 'a', isResult: false
                },
                b: {
                    value: Decimal, name: 'b', displayName: 'b', isResult: false
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

        console.log('QuadFormula handleChange');

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
        const varA = this.state.variablesUsed.a.value;
        const varB = this.state.variablesUsed.b.value;

        const varArea = varA * varB;

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

        console.log('Area of a Square re-rendered.');
        console.log(this.state.variablesUsed);
        console.log(this.props);

        return (
            <div className="jumbotron text-center">
            <h1 className="text-primary">Area of a Rectangle</h1>
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

export default withRouter(AreaRectangle);