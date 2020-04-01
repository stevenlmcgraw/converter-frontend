import React from 'react';
import { Button } from 'reactstrap';
import "bootswatch/dist/flatly/bootstrap.min.css";

class SaveResultButton extends React.Component {
constructor(props) {
    super(props);
    this.state = {

    }
}

    render() {
        let saveButton;
        let isLoggedIn = this.props.currentUser;
        if(isLoggedIn) {
            saveButton = [
                <div>
            <React.Fragment>
                <Button
                    onClick={this.props.onClick}
                    type="button"
                    className="btn-dark btn-outline-primary 
                    btn-lg btn-primary mr-2"
                >Save Result!</Button>
            </React.Fragment>
        </div>
        ];
        }
        else {
            saveButton = null;
        }
        return (
        <div>{saveButton}</div>
    );
    }
}

export default SaveResultButton;