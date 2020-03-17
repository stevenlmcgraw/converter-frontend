import React from 'react';
import { withRouter } from 'react-router-dom';
import { CardGroup } from 'reactstrap';
import { getAllUsernameResultHistory } from '../../api_utility/ApiCalls';
import ResultCard from '../../components/ResultHistory/ResultCard';

class ResultHistoryLanding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentMounted: false,
            resultHistories: [],
        };
    }

    componentDidMount() {
        //this.fetchUsernameResultHistory();
        this.setState({
            componentMounted: !this.state.componentMounted
        });
    }

    componentWillUnmount() {
        this.setState({
            componentMounted: !this.state.componentMounted
        });
    }

    componentDidUpdate() {
        if (this.props.currentUser !== undefined &
            this.state.resultHistories.length === 0) {
            this.fetchUsernameResultHistory();
        }
    }
    
    fetchUsernameResultHistory = () => {
        //event.preventDefault();
        

        getAllUsernameResultHistory(this.props.currentUser.username)
        .then(response => {
            this.setState({
                resultHistories: response._embedded.resultHistories,
            });
        });   
    }

    render() {
        console.log('ResultHistoryLanding');
        console.log(this.props.currentUser);
        console.log(this.props);
        console.log(this.state.resultHistories);
        const results = (this.state.resultHistories).map(resultHistory => 
            <ResultCard 
                key={resultHistory._links.self.href}
                resultHistory={resultHistory} />   
        );
        return (
            <div className="jumbotron-fluid">
                <CardGroup>{results}</CardGroup>
            </div>
        );
    }
}

export default withRouter(ResultHistoryLanding);