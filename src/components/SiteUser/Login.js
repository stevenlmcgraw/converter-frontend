import React from 'react';
import { Form } from 'antd';
import LoginForm from '../../components/SiteUser/LoginForm';

class Login extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        
        const AntWrappedLoginForm = Form.create()(LoginForm);
        
        return(
            <div>
                <h1>Login!</h1>
                <br></br>
                <div>
                    <LoginForm onLogin={(e) => this.props.onLogin}/>
                        
                   
                </div>
            </div>
        );
    }
}

export default Login;
