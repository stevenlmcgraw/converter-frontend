import React from "react";
import { Link, withRouter } from "react-router-dom";
import "bootswatch/dist/flatly/bootstrap.min.css";

export class PhysicsLanding extends React.Component {
    render() {
        return (
        <div className="container jumbotron-fluid">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="text-info display-3 mb-4 mt-2">Physics!</h1>
                <div className="text-left">
                <h2 className="text-success display-5 mb-4">Convert!</h2>
                <Link className="btn btn-lg btn-primary mr-2" to="/poundMassToPoundForce">
                  Pound Mass to Pound Force
                </Link>
                </div>
                <div className="text-left">
                <h2 className="text-success display-5 mb-4 mt-4">Energy!</h2>
                <Link className="btn btn-lg btn-primary mr-2" to="/powerToDecibels">
                  Power to Decibels
                </Link>
                </div>
                <div className="text-left">
                <h2 className="text-success display-5 mb-4 mt-4">Wavelengths!</h2>
                <Link className="btn btn-lg btn-primary mr-2" to="/mhzToMeters">
                  MHz to Meters
                </Link>
                </div>
              </div>
            </div>
          </div>
        </div>    
        );
    }
}

export default withRouter(PhysicsLanding);