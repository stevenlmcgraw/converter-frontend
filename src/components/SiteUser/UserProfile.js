import React from 'react';
import { Avatar, Tabs } from 'antd';
import { getUserProfile } from '../../api_utility/ApiCalls';
import './UserProfile.css';
import NotFound from '../Utilities/NotFound';
import LoadingIndicator from '../Utilities/LoadingIndicator';
import ServerError from '../Utilities/ServerError';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            siteUser: null,
            isLoading: false
        }
    }

    loadUserProfile(username) {
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

    componentDidMount = () => {
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
            <div className="profile">
                {
                    this.state.siteUser ? (
                        <div className="user-profile">
                            <div className="user-details">
                                <div className="user-avatar">
                                    <Avatar className="user-avatar-circle">
                                            {this.state.siteUser.username}
                                    </Avatar>
                                </div>
                                <div className="user-summary">
                                    <div className="username">@{this.state.siteUser.username}</div>
                                </div>
                            </div>
                            </div>
                    ): null
                }
            </div>
        );
    }
}

export default UserProfile;