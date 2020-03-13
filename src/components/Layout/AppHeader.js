import React from "react";
import { Link, withRouter } from "react-router-dom";
import { PropTypes } from 'prop-types';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, 
    Nav, NavItem, NavLink, Dropdown, DropdownToggle, 
    DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import "bootswatch/dist/flatly/bootstrap.min.css";

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
            <DropdownItem className="dropdown-item text-center">
                <Link  
                to={`/profile/${this.props.currentUser.username}`}>Profile</Link>
            </DropdownItem>,
            <DropdownItem onClick={this.handleLogout} className="dropdown-item text-center">
                <Link to="/">Logout!</Link>
            </DropdownItem>
            ];
        }
        else {
            dropdownTitle = "Login/Register";
            menuItems = [
                <DropdownItem className="dropdown-item text-center" >
                    <Link to="/login">Login!</Link>
                </DropdownItem>,
                <DropdownItem className="dropdown-item text-center" >
                    <Link to="/register">Register!</Link>
                </DropdownItem>
            ];
        }

        return (
            <div>
            <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="nav nav-pills">
                    <NavbarBrand className="navbar-brand" 
                    href="/">Saturn Hotdog Super Calculator</NavbarBrand>          
            <NavbarToggler />
            <Collapse isOpen={this.state.showProfileDropdown} navbar>
                <Nav navbar>
                <Dropdown isOpen={this.state.showProfileDropdown} 
                toggle={this.toggle}
                nav inNavbar right
                className="dropdown-menu-right">
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
    right: PropTypes.bool
}

Dropdown.propTypes = {
    right: PropTypes.bool
}

export default withRouter(AppHeader);