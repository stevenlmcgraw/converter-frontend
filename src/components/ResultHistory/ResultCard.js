import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    ModalHeader, ModalBody, Modal,
    Form, FormGroup, Label, Input, FormText, 
    ModalFooter, ListGroup, ListGroupItem
  } from 'reactstrap';
  import Result from '../ResultHistory/Result';

class ResultCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false
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

                        <ModalHeader toggle={this.toggle}>Upon Closer Inspection</ModalHeader>
                            <ModalBody>
                            <Result resultHistory={this.props.resultHistory}/>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={this.toggle}>Text File</Button>
                                <Button onClick={this.toggle}>Update</Button>
                                <Button onClick={this.toggle}>Delete</Button>
                                <Button onClick={this.toggle}>Go to Formula</Button>
                            </ModalFooter>
                    </Modal>
                    </Card>
            </React.Fragment>    
            </div>
        )
    }

}

export default withRouter(ResultCard);