import React from "react";
import { Link, withRouter } from "react-router-dom";
import "bootswatch/dist/flatly/bootstrap.min.css";
//import './Landing.css';

export class Landing extends React.Component {
    render() {
        return (
        <div className="container">
        {
              <div className="jumbotron-fluid">
              <h1 className="text-center text-secondary font-weight-bold">Choose Your Own Adventure</h1>
                <hr />
                <div className="col-auto text-center">
                <Link className="btn btn-lg btn-primary mr-2" to="/mathematics">
                  Mathematics!
                </Link>
                <Link className="btn btn-lg btn-primary mr-2" to="/physics">
                  Physics!
                </Link>
                </div>
              </div>
        }
      </div>           
        );
    }
}

export default withRouter(Landing);