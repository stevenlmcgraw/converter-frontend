import React from 'react';
import LoginForm from '../../components/SiteUser/LoginForm';

class Login extends React.Component {
    
    onLogin = () => {
        this.props.history.push("/");
    }

    render() {
        
        return(
            <div>
                <h1>Login!</h1>
                <br></br>
                <div>
                    <LoginForm onLogin={this.onLogin}/>
                                          
                </div>
            </div>
        );
    }
}

export default Login;
