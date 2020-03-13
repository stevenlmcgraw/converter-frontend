import React from 'react';
import SaveResultButton from '../ResultHistory/SaveResultButton';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class SaveResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            message: '',
            entryDate: Date,
            calculationAttributes: {},
            variableNamesPassed: [],
            modalOpen: false
        }
    }

    componentDidMount() {
        // this.getCalculationAttributes();
        console.log('SaveResult didMount');
    }

    // componentDidUpdate() {
    //     this.getCalculationAttributes();
    // }

    toggle = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    getCalculationAttributes = () => {

        let varValues = this.props.mapVariableNamesToProps;

        this.setState({
            variableNamesPassed: varValues
        });

        console.log('Inside SaveResult getCalcAttr ' + varValues);
    }

    render() {
        console.log('Inside SaveResult ' + this.state.variableNamesPassed);
        return(
            <div>
            <React.Fragment>
                <SaveResultButton currentUser={this.props.currentUser} onClick={this.toggle}/>
                <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Save Result!</ModalHeader>
                        <ModalBody>
                            This is a test.
                        </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.toggle}>Save It!</Button>
                        <Button onClick={this.toggle}>Don't Save It!</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
            </div>
        )

    }
}

export default withRouter(SaveResult);