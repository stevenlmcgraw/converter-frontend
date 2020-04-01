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
            favoritesList: []
        }
    }

    componentDidMount() {
        this.fetchUsernameFavoritesList();
    }

    componentDidUpdate(prevProps, prevState) {
        // if (this.props.currentUser !== undefined &
        //     this.props.formulaName !== undefined &
        //     this.state.favoritesList !== undefined) {
        //     this.fetchUsernameFavoritesList();
        //     this.checkIfFormulaIsFaveAlready(this.props.formulaName);
        // }
        // if(this.props.currentUser !== undefined &
        //     this.props.formulaName !== undefined &
        //     this.state.favoritesList !== prevState.favoritesList) {
        //     this.fetchUsernameFavoritesList();
        //     this.checkIfFormulaIsFaveAlready(this.props.formulaName);
        // }
        if(this.props.currentUser !== undefined & 
            this.props.formulaName !== undefined &
            this.state.favoritesList.length === 0) {
            this.fetchUsernameFavoritesList();
            this.checkIfFormulaIsFaveAlready();
        }
    }

    fetchUsernameFavoritesList = async () => {

        await getUserProfile(this.props.currentUser.username)
        .then(response => {
            if(response.status !== 200) {
                this.setState({
                    favoritesList: []
                })
            }
            this.setState({
                favoritesList: response.favoritesList,
            });
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
            formula.formulaName.localeCompare(formulaName));

        console.log('favorite check');
        console.log(faveList);
        console.log(controlList);

        if(!controlList.length === 0) {
            this.setState({
                isAlreadyFave: true
            });
        }
    }

    render() {
        console.log('AddFave');
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