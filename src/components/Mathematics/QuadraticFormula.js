import React, { Suspense } from "react";
import InputValues from "../Utilities/InputValues";
import {Decimal} from 'decimal.js';
import SaveResult from '../ResultHistory/SaveResult';
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "bootswatch/dist/flatly/bootstrap.min.css";
import CalculationCard from "../Utilities/CalculationCard";

const AddToFavoritesButton = React.lazy(() => 
import('../SiteUser/AddToFavoritesButton'));



class QuadraticFormula extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentMounted: false,
            formulaName: 'quadraticFormula',
            variablesUsed: 
                {
                a: { value: Decimal, name: 'a', displayName: 'a', isResult: false },
                b: { value: Decimal, name: 'b', displayName: 'b', isResult: false },
                c: { value: Decimal, name: 'c', displayName: 'c', isResult: false },
                x1: { value: Decimal, name: 'x1', displayName: 'x', isResult: true },
                x2: { value: Decimal, name: 'x2', displayName: 'x', isResult: true }
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
            const inputDisplayName = updatedVariable.displayName;

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

        this.solveQuadraticFormula();
    }

    mapVariableNamesToProps = () => { 
        this.setState({
            variablesUsed : {
                a : { 
                    value: this.state.variablesUsed.a.value,
                    name: this.state.variablesUsed.a.name,
                    displayName: this.state.variablesUsed.a.displayName,
                    isResult: false
                },
                b : { 
                    value: this.state.variablesUsed.b.value,
                    name: this.state.variablesUsed.b.name,
                    displayName: this.state.variablesUsed.b.displayName,
                    isResult: false
                },
                c : { 
                    value: this.state.variablesUsed.c.value,
                    name: this.state.variablesUsed.c.name,
                    displayName: this.state.variablesUsed.c.displayName,
                    isResult: false
                },
                x1 : { 
                    value: this.state.variablesUsed.x1.value,
                    name: this.state.variablesUsed.x1.name,
                    displayName: this.state.variablesUsed.x1.displayName,
                    isResult: true
                },
                x2 : { 
                    value: this.state.variablesUsed.x2.value,
                    name: this.state.variablesUsed.x2.name,
                    displayName: this.state.variablesUsed.x2.displayName,
                    isResult: true
                },
            }
        })
      };

    solveQuadraticFormula = () => {
        const variables = this.state.variablesUsed;

        const a = this.state.variablesUsed.a.value;
        const b = this.state.variablesUsed.b.value? this.state.variablesUsed.b.value : Decimal;
        const c = this.state.variablesUsed.c.value ? this.state.variablesUsed.c.value : Decimal;

        const discriminate = 
            (b * b) - (4 * a * c);

        const sqrtDiscrim = Math.sqrt(discriminate);

        const result1 = (-b + sqrtDiscrim) / (2 * a);
        const result2 = (-b - sqrtDiscrim) / (2 * a);

        console.log('Solve QuadFormula');
        console.log(result1);
        console.log(result2);

        this.setState(prevState => ({
            variablesUsed: {
                ...prevState.variablesUsed,
                x1: { 
                    ...prevState.variablesUsed.x1,
                    value: result1
                },
                x2: { 
                    ...prevState.variablesUsed.x2,
                    value: result2 
                }
            }
        }));
        this.mapVariableNamesToProps();
    }

    render() {

        console.log('QuadFormula re-rendered.');
        console.log(this.state.variablesUsed);

        return (
            <div className="jumbotron text-center">
            <h1 className="text-primary">Quadratic Formula</h1>
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

export default withRouter(QuadraticFormula);