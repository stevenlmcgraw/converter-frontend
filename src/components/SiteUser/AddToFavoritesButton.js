import React from 'react';
import "bootswatch/dist/flatly/bootstrap.min.css";
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import { notification } from 'antd';
import { getUserProfile, addFormulaToFavoritesList } 
    from '../../api_utility/ApiCalls';

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

    handleClick = (event) => {
        event.preventDefault();

        addFormulaToFavoritesList(this.props.currentUser.username,
            this.props.formulaName)
        .then(() => {
            notification.success({
                message: 'Saturn Hotdog Super Calculator',
                description: 'Formula added to your favorites!'
            });
            this.setState({
                isAlreadyFave: true,
                faveCheckDone: true
            })
        }).catch(error => {
            notification.error({
                message: 'Saturn Hotdog Super Calculator',
                description: 'Oh no!!! Something went wrong - give it another go yo.' 
                || error.message
            });
        });
    }

    fetchUsernameFavoritesList = () => {

        getUserProfile(this.props.currentUser.username)
        .then(response => {
            if(response.status === 204) {
                this.setState({
                    favoritesList: []
                });
            }
            else {
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
    }

    checkIfFormulaIsFaveAlready = (formulaName) => {
        let faveList = this.state.favoritesList;
        const controlList = faveList.filter(formula =>
            formula.formulaName === formulaName);

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
        let addButton;

        if(this.state.isAlreadyFave) {
            addButton = null;
        }
        else {
            addButton = [
            <div>
            <React.Fragment>
                <Button
                onClick={(event) => this.handleClick(event)}
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