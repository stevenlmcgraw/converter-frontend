import React from "react";

class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-3 py-0">
            <div className="container">
                <a href="/" className="navbar-brand">
                    {"Main"}
                </a>
                <a href="/register" className="navbar-brand">{"Register"}</a>

            </div>
            </nav>
        )
    }
}

export default Header;