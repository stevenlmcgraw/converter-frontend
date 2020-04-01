import React, { Suspense } from "react";
import InputValues from "../Utilities/InputValues";
import {Decimal} from 'decimal.js';
import SaveResult from '../ResultHistory/SaveResult';
import { withRouter } from "react-router-dom";
import "bootswatch/dist/flatly/bootstrap.min.css";

const AddToFavoritesButton = React.lazy(() => 
import('../SiteUser/AddToFavoritesButton'));

class QuadraticFormula extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentMounted: false,
            formulaName: 'quadraticFormula',
            variablesUsed: {
                a: Decimal,
                b: Decimal,
                c: Decimal,
                x1: Decimal,
                x2: Decimal
            },
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

    mapVariableNamesToProps = async () => { 
        this.setState({
            variablesUsed : {
                a : this.state.a,
                b : this.state.b,
                c : this.state.c,
                x1: this.state.x1,
                x2: this.state.x2
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
        const discriminate = 
            (this.state.b * this.state.b) - (4 * this.state.a * this.state.c);

        const sqrtDiscrim = Math.sqrt(discriminate);

        const result1 = (-this.state.b + sqrtDiscrim) / (2 * this.state.a);
        const result2 = (-this.state.b - sqrtDiscrim) / (2 * this.state.a);

        this.setState({
            x1: result1,
            x2: result2
        });
        this.mapVariableNamesToProps();
    }

    render() {
        return (
            <div>
                <div className="jumbotron text-center">
                <h1 className="text-primary">Quadratic Formula</h1>
                    <InputValues 
                    variableName={this.state.variableNames.coefA}
                    inputValue={this.props.a}
                    onVariableChange={this.handleChangeA}
                    />
                    <InputValues 
                    variableName={this.state.variableNames.coefB}
                    inputValue={this.props.b}
                    onVariableChange={this.handleChangeB}
                    />
                    <InputValues 
                    variableName={this.state.variableNames.coefC}
                    inputValue={this.props.c}
                    onVariableChange={this.handleChangeC}
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