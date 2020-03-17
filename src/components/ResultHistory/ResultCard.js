import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    ModalHeader, ModalBody, Modal,
    Form, FormGroup, Label, Input, FormText, 
    ModalFooter, ListGroup, ListGroupItem
  } from 'reactstrap';

class ResultCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            resultHistory: {
                username: '',
                title: '',
                message: '',
                entryDate: new Date(),
                calculationAttributes: {}
                }
        }

    }

    toggle = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    render() {
        const cardTitle = this.props.resultHistory.title;
        const cardMessage = this.props.resultHistory.message;

        return (
            <div>
            <React.Fragment>
                <Card body outline color="success">
                    <CardTitle>
                        {this.props.resultHistory.title ? cardTitle : 'No Title!'}
                    </CardTitle>
                    <CardText>
                        {this.props.resultHistory.message ? cardMessage : 'No Message!'}
                    </CardText>
                    <Button onClick={this.toggle}>View It!</Button>
                    <Modal isOpen={this.state.modalOpen}
                            toggle={this.toggle}>

                        <ModalHeader>Upon Closer Inspection</ModalHeader>
                            <ModalBody>
                            <ListGroup>
                                <ListGroupItem>Title: {cardTitle}</ListGroupItem>
                                <ListGroupItem>Description: {cardMessage}</ListGroupItem>
                                <ListGroupItem>Date: `${this.props.resultHistory.entryDate}`</ListGroupItem>
                                <ListGroupItem>Values: `${this.props.resultHistory.calculationAttributes}</ListGroupItem>
                            </ListGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button>Text File</Button>
                                <Button>Update</Button>
                                <Button>Delete</Button>
                                <Button>Go to Formula</Button>
                            </ModalFooter>
                    </Modal>
                </Card>
            </React.Fragment>    
            </div>
        )
    }

}

export default withRouter(ResultCard);