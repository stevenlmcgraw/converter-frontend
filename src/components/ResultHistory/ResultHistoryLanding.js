import React from 'react';
import { withRouter } from 'react-router-dom';
import { getAllUsernameResultHistory } from '../../api_utility/ApiCalls';
import ResultCard from '../../components/ResultHistory/ResultCard';

class ResultHistoryLanding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultHistories: []
        }
    }


    fetchUsernameResultHistory = () => {
        //event.preventDefault();
        

        getAllUsernameResultHistory(this.props.currentUser)
        .then(response => {
            this.setState({
                resultHistories: response._embedded.resultHistories
            });
        });   
    }

    render() {
        console.log('ResultHistoryLanding currentuser.username is: ' +
        this.props.currentUser);
        const results = this.fetchUsernameResultHistory().map(resultHistory =>
            <ResultCard 
                key={resultHistory._links.self.href}
                resultHistory={resultHistory} />
            )
        return (
            <div className="jumbotron-fluid">
                <div>{results}</div>
            </div>
        )
    }
}

export default withRouter(ResultHistoryLanding);