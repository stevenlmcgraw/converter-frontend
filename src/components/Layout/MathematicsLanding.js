import React from "react";
import { Link, withRouter } from "react-router-dom";
import "bootswatch/dist/flatly/bootstrap.min.css";

export class MathematicsLanding extends React.Component {
    render() {
        return (
        <div className="container jumbotron-fluid">
         
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="text-info display-3 mb-4 mt-2">Mathematics!</h1>
                <div className="text-left">
                <h2 className="text-success display-5 mb-4">Algebra!</h2>
                <Link className="btn btn-lg btn-primary mr-2" to="/cubeRoot">
                  Cube Root
                </Link>
                <Link className="btn btn-lg btn-primary mr-2" to="/quadraticFormula">
                  Quadratic Formula
                </Link>
                <Link className="btn btn-lg btn-primary mr-2" to="/squareRoot">
                  Square Root
                </Link>
                </div>
                <div className="text-left">
                <h2 className="text-success display-5 mb-4 mt-4">Geometry!</h2>
                <Link className="btn btn-lg btn-primary mr-2" to="/areaCircle">
                  Area of a Circle
                </Link>
                <Link className="btn btn-lg btn-primary mr-2" to="/areaRectangle">
                  Area of a Rectangle
                </Link>
                <Link className="btn btn-lg btn-primary mr-2" to="/areaSquare">
                  Area of a Square
                </Link>
                <Link className="btn btn-lg btn-primary mr-2" to="/pythagoreanTheorem">
                  Pythagorean Theorem
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