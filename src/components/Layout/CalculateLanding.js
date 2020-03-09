import React from "react";
import { Link } from "react-router-dom";

export class CalculateLanding extends React.Component {
    render() {
        return (
        <div className="landing">
         <div className="light-overlay landing-inner text-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Calculate!</h1>
                <hr />
                <Link className="btn btn-lg btn-primary mr-2" to="/quadraticFormula">
                  Quadratic Formula
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>          
        );
    }
}

export default CalculateLanding;