import React from 'react';
import LoginForm from '../../components/SiteUser/LoginForm';
import './Login.css';

class Login extends React.Component {
    
    // onLogin = () => {
    //     this.props.history.push("/");
    // }

    render() {
        
        return(
            <div className="login-container">
                <h1 className="page-title">Login!</h1>
                <br></br>
                <div className="login-content">
                    <LoginForm onLogin={this.props.onLogin}/>
                                          
                </div>
            </div>
        );
    }
}

export default Login;
