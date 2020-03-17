import React from 'react';
import { PropTypes } from 'prop-types';
import SaveResultButton from '../ResultHistory/SaveResultButton';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, 
    Form, FormGroup, Label, Input, FormText, 
    ModalFooter } from 'reactstrap';
import { notification } from 'antd';
import { saveResultHistoryObject } from '../../api_utility/ApiCalls';

class SaveResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultHistory : {
                username: '',
                title: null,
                message: null,
                entryDate: Date,
                calculationAttributes: {}
            },
            variablesPassed: this.props.variablesUsed,
            modalOpen: false
        }
    }

    toggle = () => {
        this.setState({
            modalOpen: !this.state.modalOpen,
            title: null,
            message: null
        });
    }

    initResultHistory = () => {
        this.setState({ 
            resultHistory: {
            username: this.props.currentUser.username,
            title: this.state.title,
            message: this.state.message,
            entryDate: new Date(),
            calculationAttributes: {...this.props.variablesUsed}
            }
        });
    }

    resetResultHistory = () => {
        this.setState({
            resultHistory : {
                title: null,
                message: null
            }
        });
    }

    handleInputChange = async (event) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        await this.setState({
            [inputName]: inputValue
        });

        this.initResultHistory();
    }

    handleSaveResult = (event) => {
        event.preventDefault();

        saveResultHistoryObject(this.state.resultHistory)
        .then(response => {
            notification.success({
                message: 'Saturn Hotdog Super Calculator',
                description: 'This calculation has been saved!'
            });
            this.toggle();
        }).catch(error => {
            notification.error({
                message: 'Saturn Hotdog Super Calculator',
                description: error.message || 'Oh no!!! Something went wrong - give it another go yo.'
            });
            this.toggle();
        });
    }

    render() {
        console.log(this.props);
        console.log(this.props.variablesUsed);
        console.log(this.props.currentUser);
        console.log(this.state.resultHistory);
        return(
            <div>
            <React.Fragment>
                <SaveResultButton currentUser={this.props.currentUser} onClick={this.toggle}/>
                <Modal isOpen={this.state.modalOpen} 
                        toggle={this.toggle}
                        onOpened={this.initResultHistory}>
                    <ModalHeader toggle={this.toggle}>Save Result!</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={(event) => this.handleSaveResult(event)}>
                            <FormGroup>
                                <Label>Title</Label>
                                <Input 
                                    type="text"
                                    name="title"
                                    placeholder="Give it a name! Or don't..."
                                    value={this.props.title}
                                    onChange={(event) => this.handleInputChange(event)}
                                    />
                            </FormGroup>
                                <FormGroup>
                                    <Label>Description</Label>
                                    <Input 
                                        type="text"
                                        name="message"
                                        placeholder="Leave a message! Or don't..."
                                        value={this.props.message}
                                        onChange={(event) => this.handleInputChange(event)}
                                        />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                    <ModalFooter>
                        <Button onClick={(event) => this.handleSaveResult(event)}>Save It!</Button>
                        <Button onClick={this.toggle}>Don't Save It!</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
            </div>
        )

    }
}

Button.propTypes = {
    onClick: PropTypes.func
}

Form.propTypes = {
    onSubmit: PropTypes.func
}

Modal.propTypes = {
    onOpened: PropTypes.func,
    onClosed: PropTypes.func
}

export default withRouter(SaveResult);