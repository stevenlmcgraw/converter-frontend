import React from 'react';
import { withRouter } from 'react-router-dom';
import { CardGroup, Card, CardTitle, CardText } from 'reactstrap';
import { getAllUsernameResultHistory } from '../../api_utility/ApiCalls';
import ResultCard from '../../components/ResultHistory/ResultCard';
import { notification } from 'antd';
import "bootswatch/dist/flatly/bootstrap.min.css";

class ResultHistoryLanding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentMounted: false,
            resultHistories: [],
        };
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

    componentDidUpdate() {
        if (this.props.currentUser !== undefined &
            this.state.resultHistories.length === 0) {
            this.fetchUsernameResultHistory();
        }
    }
    
    fetchUsernameResultHistory = () => {

        getAllUsernameResultHistory(this.props.currentUser.username)
        .then(response => {
            if(response.status === 404) {
                this.setState({
                    resultHistories: []
                })
            }
            this.setState({
                resultHistories: response._embedded.resultHistories,
            });
        }).catch(error => {
            notification.error({
                message: 'Saturn Hotdog Super Calculator',
                description: 'Oh no!!! No conversion/calculation result history present.' || error.message
            });   
        });
    }

    render() {

        console.log('ResultHistoryLanding re-rendered.');
        console.log(this.state.resultHistories);

        let results;

        if(this.state.resultHistories.length === 0) {
            results = (
                <Card body outline color="success" className="text-center">
                    <CardTitle>No History!</CardTitle>
                    <CardText>Looks like we don't have any history together... 
                                but we can work on that. Get out there and do 
                                some conversions and calculations!</CardText>
                </Card>
            );
        }
        else {
            results = (this.state.resultHistories).map(resultHistory => 
                <ResultCard 
                    key={resultHistory._links.self.href}
                    resultHistory={resultHistory} />   
            );
        }
        return (
            <div className="jumbotron-fluid">
                <CardGroup>{results}</CardGroup>
            </div>
        );
    }
}

export default withRouter(ResultHistoryLanding);