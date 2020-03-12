import React from "react";
import { Link, withRouter } from "react-router-dom";
import './Landing.css';

export class Landing extends React.Component {
    render() {
        return (
        <div className="landing-container">
        {
              <div className="link-container">
                <hr />
                <Link className="btn btn-lg btn-primary mr-2" to="/convert">
                  Convert!
                </Link>
                <Link className="btn btn-lg btn-primary mr-2" to="/calculate">
                  Calculate!
                </Link>
              </div>
        }
      </div>           
        );
    }
}

export default withRouter(Landing);