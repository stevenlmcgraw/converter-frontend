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
                a: { value: null, name: 'a', displayName: 'A' },
                b: { value: null, name: 'b', displayName: 'B' },
                c: { value: null, name: 'c', displayName: 'C' },
                x1: { value: null, name: 'x1', displayName: 'Result' },
                x2: { value: null, name: 'x2', displayName: 'Result' }
                }
            ,
            variableNames: {
                coefA: 'Coefficient A',
                coefB: 'Coefficient B',
                coefC: 'Coefficient C'
            }
        }
    }

    // componentDidMount() {
    //     this.setState({
    //         componentMounted: !this.state.componentMounted
    //     });
    // }

    // componentWillUnmount() {
    //     this.setState({
    //         componentMounted: !this.state.componentMounted
    //     });
    // }

    handleChange = (event) => {

        console.log(event);
        //event.preventDefault();

        // const target = event.target;
        // const inputName = target.name;
        // const inputValue = target.value;

        // await this.setState({
        //     [inputName] : inputValue
        // });
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

        //const classes = useStyles();

        console.log(this.state.variablesUsed);

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