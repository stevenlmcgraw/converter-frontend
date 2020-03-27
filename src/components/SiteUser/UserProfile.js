import React, { Suspense } from 'react';
import { withRouter } from 'react-router-dom';
import { getUserProfile } from '../../api_utility/ApiCalls';
import './UserProfile.css';
import NotFound from '../Utilities/NotFound';
import LoadingIndicator from '../Utilities/LoadingIndicator';
import ServerError from '../Utilities/ServerError';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

const ManageFavoritesList = React.lazy(() => import('../SiteUser/ManageFavoritesList'));

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            siteUser: null,
            isLoading: false,
            activeTab: '1'
        };
    }

    toggle = tab => {
        if(this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            })
        }
        //setActiveTab(tab);
    }

    loadUserProfile = (username) => {
        this.setState({
            isLoading: true
        });

        getUserProfile(username)
        .then(response => {
            this.setState({
                siteUser: response,
                isLoading: false
            });
        }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            }
            else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });
            }
        });
    }

    componentDidMount() {
        const username = this.props.match.params.username;
        this.loadUserProfile(username);
    }

    componentDidUpdate(nextProps) {
        if(this.props.match.params.username 
            !== nextProps.match.params.username) {
                this.loadUserProfile(nextProps.match.params.username);
            }
    }

    render() {
        console.log('UserProfile');
        console.log(this.state.siteUser);
        console.log(this.props.currentUser);
        console.log(this.props);
        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        const tabBarStyle = {
            textAlign: 'center'
        };

        return (
            <div className="container-fluid text-center">
            <Nav tabs>
                <NavItem >
                <NavLink
                    className={classnames({ 
                        active: this.state.activeTab === '1' })}
                    onClick={() => this.toggle('1')}
                >
                Details
                </NavLink>
                </NavItem>
                <NavItem>
                <NavLink
                    className={classnames({ 
                        active: this.state.activeTab === '2' })}
                    onClick={() => this.toggle('2')}
                >
                Security
                </NavLink>
                </NavItem>
                <NavItem>
                <NavLink
                    className={classnames({ 
                        active: this.state.activeTab === '3' })}
                    onClick={() => this.toggle('3')}
                >
                Favorites
                </NavLink>
                </NavItem>
            </Nav>
            <div className="jumbotron">
            <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                <Row>
                <Col>
                        <h4>Profile Details</h4>
                </Col>
                </Row>
                </TabPane>
                <TabPane tabId="2">
                <Row>
                <Col>
                        <h4>Security Settings</h4>
                </Col>
                </Row>
                </TabPane>
                <TabPane tabId="3">
                <Row>
                <Col>
                        <h4>Favorites List</h4>
                </Col>
                </Row>
                <div className="container">
                <Suspense fallback={<LoadingIndicator/>}>
                        <ManageFavoritesList 
                            siteUser={this.state.siteUser}
                            {...this.props}
                        />
                </Suspense>
                </div>
                </TabPane>
            
            </TabContent>
            </div>
            </div>
        );
    }
}

export default withRouter(UserProfile);