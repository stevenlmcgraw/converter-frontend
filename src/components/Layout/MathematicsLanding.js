import React from "react";
import { Link, withRouter } from "react-router-dom";
import "bootswatch/dist/flatly/bootstrap.min.css";

export class MathematicsLanding extends React.Component {
    render() {
        return (
        <div className="landing">
         <div className="light-overlay landing-inner text-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Mathematics!</h1>
                <hr />
                <Link className="btn btn-lg btn-primary mr-2" to="/areaRectangle">
                  Area of a Rectangle
                </Link>
                <Link className="btn btn-lg btn-primary mr-2" to="/areaSquare">
                  Area of a Square
                </Link>
                <Link className="btn btn-lg btn-primary mr-2" to="/pythagoreanTheorem">
                  Pythagorean Theorem
                </Link>
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

export default withRouter(MathematicsLanding);