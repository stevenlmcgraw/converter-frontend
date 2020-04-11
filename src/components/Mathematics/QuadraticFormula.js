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
                a: { value: Decimal, name: 'a', displayName: 'A' },
                b: { value: Decimal, name: 'b', displayName: 'B' },
                c: { value: Decimal, name: 'c', displayName: 'C' },
                x1: { value: Decimal, name: 'x1', displayName: 'Result' },
                x2: { value: Decimal, name: 'x2', displayName: 'Result' }
                }
            ,
            variableNames: {
                coefA: 'Coefficient A',
                coefB: 'Coefficient B',
                coefC: 'Coefficient C'
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
                    //...prevState.variablesUsed[inputName],
                    value: inputValue,
                    name: inputName,
                    displayName: inputDisplayName
                }}
            }));
        }

        this.solveQuadraticFormula();
    }

    mapVariableNamesToProps = async () => { 
        this.setState({
            variablesUsed : {
                a : this.state.variablesUsed.a,
                b : this.state.variablesUsed.b,
                c : this.state.variablesUsed.c,
                x1: this.state.variablesUsed.x1,
                x2: this.state.variablesUsed.x2
            }
        })
      };

    handleChangeA = async (inputValue) => {
        await this.setState({a: inputValue});
        this.solveQuadraticFormula();
    }

    handleChangeB = async (inputValue) => {
        await this.setState({b: inputValue});
        this.solveQuadraticFormula();
    }

    handleChangeC = async (inputValue) => {
        await this.setState({c: inputValue});
        this.solveQuadraticFormula();
    }

    solveQuadraticFormula = () => {
        const variables = this.state.variablesUsed;

        // let a = Decimal;
        // let b = Decimal;
        // let c = Decimal;

        // const a = this.state.variablesUsed.a.value ? this.state.variablesUsed.a.value : Decimal;
        // const b = this.state.variablesUsed.b.value? this.state.variablesUsed.b.value : Decimal;
        // const c = this.state.variablesUsed.c.value ? this.state.variablesUsed.c.value : Decimal;

        const a = this.state.variablesUsed.a.value;
        const b = this.state.variablesUsed.b.value? this.state.variablesUsed.b.value : Decimal;
        const c = this.state.variablesUsed.c.value ? this.state.variablesUsed.c.value : Decimal;

        // a = variables.b.value === undefined ? variables.b.value : Decimal;
        // b = variables.b.value ? variables.b.value : Decimal;
        // c = variables.c.value ? variables.c.value : Decimal;

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
                x1: { value: result1 },
                x2: { value: result2 }
            }
        }));
        this.mapVariableNamesToProps();
    }

    render() {

        console.log('QuadFormula re-rendered.');
        console.log(this.state.variablesUsed);
        // console.log(this.state.variablesUsed.x1.value);
        // console.log(this.state.variablesUsed.x2.value);

        return (
            <div>
                <div className="jumbotron text-center">
                <CalculationCard 
                    passVariablesUsed={this.state.variablesUsed}
                    passCallback={this.handleChange}
                />
                
                <div className="text-success font-weight-bolder">
                    <br></br>
                    <p>Result:<br></br>x = {this.state.x1}<br></br>x = {this.state.x2}</p>
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