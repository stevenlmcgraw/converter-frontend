import React from 'react';
import "bootswatch/dist/flatly/bootstrap.min.css";
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import { notification } from 'antd';
import { getUserProfile } from '../../api_utility/ApiCalls';

class AddToFavoritesButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAlreadyFave: false,
            faveCheckDone: false,
            favoritesList: [],
            componentMounted: false  
        }
    }

    componentDidMount() {
        this.setState({
            componentMounted: !this.state.componentMounted
        });
    }

    componentWillUnmount() {
        this.setState({
            componentMounted: !this.state.componentMounted,
            isAlreadyFave: false,
            faveCheckDone: false
        });
    }

    componentDidUpdate(prevProps, prevState, nextProps) {
        if(this.props.currentUser !== undefined &&
            this.props.currentUser === null &&
            !this.state.faveCheckDone) {
                this.setState({
                    isAlreadyFave: true,
                    faveCheckDone: true
                });
            }
        if(this.props.currentUser !== undefined &
            this.props.currentUser !== null &
            this.props.formulaName !== undefined &
            !this.state.faveCheckDone) {
            this.fetchUsernameFavoritesList();
        }
    }

    fetchUsernameFavoritesList = () => {

        console.log('fetchFaveList');
        console.log(this.props.currentUser.username);

        getUserProfile(this.props.currentUser.username)
        .then(response => {
            if(response.status === 204) {
                this.setState({
                    favoritesList: []
                });
                console.long('inside if()');
            }
            else {
                console.log('inside else{}');
                console.log(response);
                console.log(this.props.formulaName);
                this.setState({
                    favoritesList: response.favoritesList
                });
                this.checkIfFormulaIsFaveAlready(this.props.formulaName);
        }
        }).catch(error => {
            notification.error({
                message: 'Saturn Hotdog Super Calculator',
                description: 'Oh no!!! We have got a little problem.' || error.message
            });   
        });

        
        console.log('fetchFaveList after API call');
        console.log(this.state.favoritesList);
        console.log(this.state.siteUser);
    }

    checkIfFormulaIsFaveAlready = (formulaName) => {
        let faveList = this.state.favoritesList;
        const controlList = faveList.filter(formula =>
            formula.formulaName === formulaName);

        console.log('favorite check');
        console.log(this.state.favoritesList);
        console.log(faveList);
        console.log(controlList);

        if(controlList.length !== 0) {
            this.setState({
                isAlreadyFave: true,
                faveCheckDone: true
            });
        }
        else {
            this.setState({
                faveCheckDone: true
            })
        }
    }

    render() {
        console.log('AddFave render()');
        console.log(this.props.formulaName);
        console.log(this.state.isAlreadyFave);

        let addButton;

        if(this.state.isAlreadyFave) {
            addButton = null;
        }
        else {
            addButton = [
            <div>
            <React.Fragment>
                <Button
                onClick={this.props.onClick}
                type="button"
                className="btn-dark btn-outline-primary 
                btn-lg btn-primary mr-2"
                >Add Me to Favorites!</Button>
            </React.Fragment>
            </div>
            ];
        }
        return (
            <div>{addButton}</div>
        );
    }
}

export default withRouter(AddToFavoritesButton);