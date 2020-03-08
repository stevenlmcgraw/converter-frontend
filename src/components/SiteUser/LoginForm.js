import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
import { login } from '../../api_utility/ApiCalls';
import { ACCESS_TOKEN } from '../../constants';

const FormItem = Form.Item;

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (event) => {
        
        event.preventDefault();

        this.props.form.validateFields((err, values) => {
            if(!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                .then(response => {
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    this.props.onLogin();
                }).catch(error => {
                    if(error.status === 401) {
                        notification.error({
                            message: 'Saturn Hotdog Calculator',
                            description: 'Incorrect username or password! Perhaps a second try?'
                        });
                    }
                    else {
                        notification.error({
                            message: 'Saturn Hotdog Calculator',
                            description: error.message || 'Uh-oh! Something went sideways, try again please.'
                        });
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return(
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please enter your username!' }],
                    })
                    (
                        <Input
                            prefix={<Icon type="user" />}
                            size="large"
                            name="username"
                            placeholder="Enter Username" />

                    )
                }
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please enter your password!' }],
                    })
                    (
                        <Input
                            prefix={<Icon type="lock" />}
                            size="large"
                            name="password"
                            type="password" />
                    )
                }
                </FormItem>
                <FormItem>
                    <Button 
                        type="primary"
                        htmlType="submit"
                        size="large"
                    >Login!</Button>
                    Not registered? <Link to="/register">Get registered!</Link>
                </FormItem>          
            </Form>
        );
    }
}

export default LoginForm;