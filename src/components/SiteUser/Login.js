import React from 'react';
import LoginForm from '../../components/SiteUser/LoginForm';
import "bootswatch/dist/flatly/bootstrap.min.css";
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
    
    onLogin = () => {
        this.props.history.push("/");
    }

    render() {
        
        return(
            <div className="container-fluid text-center">
                <h1 className="text-dark">Login!</h1>
                
                <div >
                    <LoginForm onLogin={this.props.onLogin}/>
                                          
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
