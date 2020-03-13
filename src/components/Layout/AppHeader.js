import React from "react";
import { Link, withRouter } from "react-router-dom";
import { PropTypes } from 'prop-types';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, 
    Nav, NavItem, NavLink, Dropdown, DropdownToggle, 
    DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import "bootswatch/dist/flatly/bootstrap.min.css";
import './AppHeader.css';

class AppHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showProfileDropdown: false
        };
    }

    handleLogout = () => {
        this.props.onLogout();
    }

    toggle = () => {
        this.setState({
            showProfileDropdown: !this.state.showProfileDropdown
        });
    }

    render() {
        let menuItems;
        let dropdownTitle = "";
        if(this.props.currentUser) {
            dropdownTitle = this.props.currentUser.username;
            menuItems = [             
            <DropdownItem className="navbar-dropdown-item text-center">
                <Link  
                to={`/profile/${this.props.currentUser.username}`}>Profile</Link>
            </DropdownItem>,
            <DropdownItem onClick={this.handleLogout} className="navbar-dropdown-item text-center">
                <Link to="/">Logout!</Link>
            </DropdownItem>
            ];
        }
        else {
            dropdownTitle = "Login/Register";
            menuItems = [
                <DropdownItem className="navbar-dropdown-item text-center" >
                    <Link to="/login">Login!</Link>
                </DropdownItem>,
                <DropdownItem className="navbar-dropdown-item text-center" >
                    <Link to="/register">Register!</Link>
                </DropdownItem>
            ];
        }

        return (
            <div>
            <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="navbar">
                    <NavbarBrand inverse className="navbar-brand-app" 
                    href="/">Saturn Hotdog Super Calculator</NavbarBrand>          
            <NavbarToggler />
            <Collapse isOpen={this.state.showProfileDropdown} navbar className="dropdown-menu-right">
                <Nav navbar right className="dropdown-menu-right">
                <Dropdown isOpen={this.state.showProfileDropdown} 
                toggle={this.toggle}
                nav inNavbar right
                >
                    <DropdownToggle nav caret>
                        {dropdownTitle}
                    </DropdownToggle>
                    <DropdownMenu right className="dropdown-menu-right">
                        {menuItems}
                    </DropdownMenu>
                </Dropdown>
                </Nav>
            </Collapse>  
            </div>
            </Navbar>
            </div>
        );
    }
}

DropdownMenu.propTypes = {
    right: PropTypes.bool,
    className: PropTypes.string
}

Dropdown.propTypes = {
    right: PropTypes.bool,
    className: PropTypes.string
}

Nav.propTypes = {
    right: PropTypes.bool,
    className: PropTypes.string
}

NavbarBrand.propTypes = {
    inverse: PropTypes.bool
}

export default withRouter(AppHeader);