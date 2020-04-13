import React, { Suspense } from 'react';
import InputValues from "../Utilities/InputValues";
import {Decimal, eq} from 'decimal.js';
import SaveResult from '../ResultHistory/SaveResult';
import { withRouter } from "react-router-dom";
import CalculationCard from "../Utilities/CalculationCard";
import "bootswatch/dist/flatly/bootstrap.min.css";

const AddToFavoritesButton = React.lazy(() => 
import('../SiteUser/AddToFavoritesButton'));

class PythagoreanTheorem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentMounted: false,
            formulaName: 'pythagoreanTheorem',
            variablesUsed : {
                a: {
                    value: null, name: 'a', displayName: 'a', isResult: true
                },
                b: {
                    value: null, name: 'b', displayName: 'b', isResult: true
                },
                c: {
                    value: null, name: 'c', displayName: 'c', isResult: true
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

    handleChange = async (event, updatedVariable) => {

        console.log('Pythagorean handleChange');

        console.log(updatedVariable);
        console.log(this.state.variablesUsed);

        if(updatedVariable !== undefined) {

            console.log('handleChange Hit if()');

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

        console.log(this.state.variablesUsed);

        this.calculateTheorem();
    }

    calculateTheorem = () => {
        const variables = this.state.variablesUsed;

        console.log('hit calculate');
        console.log(variables);

        // let aVar = variables.a.value;
        // let bVar = variables.b.value;
        // let cVar = variables.c.value;

        // let aVar = variables.a.value ? new Decimal(variables.a.value) : null;
        // let bVar = variables.b.value ? new Decimal(variables.b.value) : null;
        // let cVar = variables.c.value ? new Decimal(variables.c.value) : null;

        let aVar = variables.a.value ? variables.a.value : null;
        let bVar = variables.b.value ? variables.b.value : null;
        let cVar = variables.c.value ? variables.c.value : null;

        // aVar = variables.a.value;
        // bVar = variables.b.value;
        // cVar = variables.c.value;

        console.log(aVar);
        console.log(bVar);
        console.log(cVar);

        if(bVar !== null && cVar !== null && aVar === null) {
            
            console.log('calculate if() 1');
            console.log(aVar);
            console.log(bVar);
            console.log(cVar);
            
            const bSq = bVar * bVar;
            const cSq = cVar * cVar;

            aVar = Math.sqrt(cSq - bSq);

            console.log('calculate if() 1 after sqrt');
            console.log(aVar);

            // this.setState(prevState => ({
            //     ...prevState,
            //     variablesUsed: {
            //         ...prevState.variablesUsed,
            //         a: {
            //             ...prevState.variablesUsed.a,
            //             value: aVar
            //         }
            //     }
            // }));
        }
        else if(aVar !== null && cVar !== null && bVar === null) {
            
            console.log('calculate if() 2');
            console.log(aVar);
            console.log(bVar);
            console.log(cVar);

            const aSq = aVar * aVar;
            const cSq = cVar * cVar;

            bVar = Math.sqrt(cSq - aSq);

            console.log('calculate if() 2 after sqrt');
            console.log(bVar);

            // this.setState(prevState => ({
            //     ...prevState,
            //     variablesUsed: {
            //         ...prevState.variablesUsed,
            //         b: {
            //             ...prevState.variablesUsed.b,
            //             value: bVar
            //         }
            //     }
            // }));
        }
        else if(aVar !== null && bVar !== null && cVar === null) {
            
            console.log('calculate if() 2');
            console.log(aVar);
            console.log(bVar);
            console.log(cVar);

            const aSq = aVar * aVar;
            const bSq = bVar * bVar;

            cVar = Math.sqrt(aSq + bSq);

            console.log('calculate if() 3 after sqrt');
            console.log(cVar);

            // this.setState(prevState => ({
            //     ...prevState,
            //     variablesUsed: {
            //         ...prevState.variablesUsed,
            //         c: {
            //             ...prevState.variablesUsed.c,
            //             value: cVar
            //         }
            //     }
            // }));
        }

        console.log(this.state.variablesUsed);

        this.setState(prevState => ({
            ...prevState,
            variablesUsed: {
                ...prevState.variablesUsed,
                a: {
                    ...prevState.variablesUsed.a,
                    value: aVar
                },
                b: {
                    ...prevState.variablesUsed.b,
                    value: bVar
                },
                c: {
                    ...prevState.variablesUsed.c,
                    value: cVar
                }
            }
        }));
    }

    render() {
        console.log('Pythagorean Theorem');
        console.log(this.props.currentUser);
        console.log(this.props);
        return (
            <div className="jumbotron text-center">
            <h1 className="text-primary">Pythagorean Theorem</h1>
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

export default withRouter(PythagoreanTheorem);