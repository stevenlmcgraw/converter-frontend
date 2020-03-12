import React from "react";
import { Menu, Icon, Layout } from "antd";
import { Link, withRouter } from "react-router-dom";
//import { Dropdown } from 'react-dropdown';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, 
    Nav, NavItem, NavLink, Dropdown, DropdownToggle, 
    DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh } from '@fortawesome/free-solid-svg-icons';
import "bootswatch/dist/flatly/bootstrap.min.css";
//import './AppHeader.css';

const Header = Layout.Header;

class AppHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showProfileDropdown: false
        };
    }

    handleMenuClick = ({ key }) => {
        if(key === "logout") {
            this.props.onLogout();
        }
    }

    handleLogout = () => {
        this.props.onLogout();
    }

    toggle = () => {
        this.setState({
            showProfileDropdown: true
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
            
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.showProfileDropdown} navbar>
                <Nav navbar>

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        {dropdownTitle}
                    </DropdownToggle>
                    <DropdownMenu right>
                        {menuItems}
                    </DropdownMenu>
                </UncontrolledDropdown>
                </Nav>
            </Collapse>

            
            </div>
            </Navbar>
            </div>
        );
    }
}

function UserProfileDropdownMenu(props) {
    const dropdownMenu = (
        <Menu onClick={props.handleMenuClick} >
            
            <Menu.Divider />
            <Menu.Item key="profile" className="dropdown-item">
                <Link to={`/profile/${props.currentUser.username}`}>Profile</Link>
            </Menu.Item>
            <Menu.Item key="logout" className="dropdown-item">
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown
            className="dropdown-menu"
            overlay={dropdownMenu}
            trigger={['click']}
            getPopupContainer = { () => document.getElementsByClassName('profile-menu')[0]}>
        <a className="ant-dropdown-link">
            <Icon type="user" className="nav-icon" style={{marginRight: 0}} /> <Icon type="down" />
        </a>
        </Dropdown>
    );
}

export default withRouter(AppHeader);