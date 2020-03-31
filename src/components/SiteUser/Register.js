import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Icon, notification } from 'antd';
import { register, checkUsernameAvailability, checkEmailAvailability } from '../../api_utility/ApiCalls';
import { MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH, 
    MAX_EMAIL_LENGTH, MIN_PASSWORD_LENGTH, 
    MAX_PASSWORD_LENGTH, DEFAULT_SUCCESSFUL_REGISTER_MESSAGE} from '../../constants/index';
import "bootswatch/dist/flatly/bootstrap.min.css";

const FormItem = Form.Item;

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: { value: ''},
            password: { value: ''},
            email: { value: ''}  
        }
    }

    handleInputValueChange = (event, validationFunc) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFunc(inputValue)
            }
        });
    }

    handleSubmit = (event) => {

        event.preventDefault();

        const registerRequest = {
            username: this.state.username.value,
            password: this.state.password.value,
            email: this.state.email.value 
        };

        register(registerRequest)
        .then(response => {
            notification.success({
                message: 'Saturn Hotdog Calculator',
                description: DEFAULT_SUCCESSFUL_REGISTER_MESSAGE
            });
            this.props.history.push("/login");
        }).catch(error => {
            notification.error({
                message: 'Saturn Hotdog Calculator',
                description: error.message || 
                'Apologies, but something went awry. Try again please.'
            });
        });
    }

    isFormInvalid = () => {
        return !(this.state.username.validateStatus === 'success' &&
                this.state.email.validateStatus === 'success' &&
                this.state.password.validateStatus === 'success'
        );
    }

    render() {
        return (
            <div className="register-container">
                <h1 className="page-title">Register!</h1>
                <br></br>
                    <div className="register-content">
                    <Form onSubmit={this.handleSubmit} className="register-form">
                        <FormItem
                            hasFeedback
                            validateStatus={this.state.username.validateStatus}
                            help={this.state.username.errorMsg}>
                            <Input
                                prefix={<Icon type="user" />}
                                size="large"
                                name="username"
                                autoComplete="off"
                                placeholder="Enter username"
                                value={this.state.username.value}
                                onBlur={this.validateUsernameAvailability}
                                onChange={(event) => 
                                    this.handleInputValueChange(event, this.validateUsername)} />
                        </FormItem>
                        <br></br>
                        <FormItem
                            hasFeedback
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}>
                            <Input 
                                prefix={<Icon type="mail" />}
                                size="large"
                                name="email"
                                type="email"
                                autoComplete="off"
                                placeholder="Enter email address"
                                value={this.state.email.value}
                                onBlur={this.validateEmailAvailability}
                                onChange={(event) => 
                                    this.handleInputValueChange(event, this.validateEmail)} />
                        </FormItem>
                        <br></br>
                        <FormItem
                            validateStatus={this.state.password.validateStatus}
                            help={this.state.password.errorMsg}>
                            <Input
                                prefix={<Icon type="lock" />}
                                size="large"
                                name="password"
                                type="password"
                                autoComplete="off"
                                placeholder="Enter pasword"
                                value={this.state.password.value}
                                onChange={(event) => 
                                    this.handleInputValueChange(event, this.validatePassword)} />
                        </FormItem>
                        <br></br>
                        <FormItem>
                        <div>
                            <Button 
                                type="primary"
                                htmlType="submit"
                                size="large"
                                className="register-form-button"
                                disabled={this.isFormInvalid()}>Register!</Button>
                                <br></br>
                                <br></br>
                                Already a registered user? <Link to="/login">Login</Link>
                        </div>        
                        </FormItem>
                    </Form>
                    </div>
            </div>
        );
    }

    validateUsername = (username) => {
        if(username.length < MIN_USERNAME_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `At least ${MIN_USERNAME_LENGTH} characters required.`
            }
        }
        else if(username.length > MAX_USERNAME_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Username must be less than ${MAX_USERNAME_LENGTH} characters in length.`
            }
        }
        else {
            return {
                validateStatus: null,
                errorMsg: null
            };
        }
    }

    validateUsernameAvailability = () => {
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if(usernameValidation.validateStatus === 'error') {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }

        this.setState({
            username: {
                value: usernameValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkUsernameAvailability(usernameValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            }
            else {
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: 'error',
                        errorMsg: 'Username already exists - try again!'
                    }
                });
            }
        }).catch(error => {
            this.setState({
                username: {
                    value: usernameValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validateEmail = (email) => {
        if(!email) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email address required.'
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Invalid email.'
            }
        }

        if(email.length > MAX_EMAIL_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Email must be less than ${MAX_EMAIL_LENGTH} characters in length.`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    }

    validateEmailAvailability = () => {
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if(emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });
            return;
        }
        
        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkEmailAvailability(emailValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            }
            else {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'error',
                        errorMsg: 'Email address already registered.'
                    }
                });
            }
        }).catch(error => {
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validatePassword = (password) => {
        if(password.length < MIN_PASSWORD_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Password must be at least ${MIN_PASSWORD_LENGTH} characters in length`
            }
        }
        else if(password.length > MAX_PASSWORD_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Password must be less than ${MAX_PASSWORD_LENGTH} characters in length`
            }
        }
        else {
            return {
                validateStatus: 'success',
                errorMsg: null
            };
        }
    }
}

export default Register;