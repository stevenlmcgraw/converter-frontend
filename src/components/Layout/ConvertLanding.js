import React from "react";
import { Link } from "react-router-dom";
import "bootswatch/dist/flatly/bootstrap.min.css";

export class ConvertLanding extends React.Component {
    render() {
        return (
        <div className="landing">
         <div className="light-overlay landing-inner text-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Convert!</h1>
                <hr />
                <Link className="btn btn-lg btn-primary mr-2" to="/poundMassToPoundForce">
                  Pound Mass to Pound Force
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>         
        );
    }
}

export default ConvertLanding;