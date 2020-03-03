import React from "react";
import InputValues from "../Utilities/InputValues";
import {Decimal} from 'decimal.js';

class QuadraticFormula extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            a: Decimal,
            b: Decimal,
            c: Decimal,
            x1: Decimal,
            x2: Decimal
        }
    }

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

    }

    render() {
        const variableNames = {
            coefA: 'Coefficient A',
            coefB: 'Coefficient B',
            coefC: 'Coefficient C'
        }
        return (
            <div>
                <div>
                    <InputValues 
                    variableName="coefA"
                    inputValue={this.props.a}
                    onVariableChange={this.handleChangeA}
                    />
                    <InputValues 
                    variableName="coefB"
                    inputValue={this.props.b}
                    onVariableChange={this.handleChangeB}
                    />
                    <InputValues 
                    variableName="coefC"
                    inputValue={this.props.c}
                    onVariableChange={this.handleChangeC}
                    />
                </div>

                <div>
                    <br></br>
                    <p>Result:<br></br>x = {this.state.x1}<br></br>x = {this.state.x2}</p>
                </div>
            </div>
        );
    }

    }

export default QuadraticFormula;