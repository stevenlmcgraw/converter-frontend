import React from "react";
import { Menu, Icon, Dropdown, Layout } from "antd";
import { Link, withRouter } from "react-router-dom";
import './AppHeader.css';

const Header = Layout.Header;

class AppHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    handleMenuClick = ({ key }) => {
        if(key === "logout") {
            this.props.onLogout();
        }
    }

    render() {
        let menuItems;
        if(this.props.currentUser) {
            menuItems = [
                <Menu.Item key="/">
                    <Link to="/">
                        <Icon type="home" className="nav-icon"/>
                    </Link>
                </Menu.Item>,
                <Menu.Item key="/profile" className="profile-menu">
                    <UserProfileDropdownMenu
                        currentUser={this.props.currentUser}
                        handleMenuClick={this.handleMenuClick}/>
                </Menu.Item>
            ];
        }
        else {
            menuItems = [
                <Menu.Item key="/login">
                    <Link to="/login">Login!</Link>
                </Menu.Item>,
                <Menu.Item key="/register">
                    <Link to="/register">Register!</Link>
                </Menu.Item>
            ];
        }

        return (
            <Header className="app-header">
            <div className="container">
                <div className="app-title">
                    <Link to="/">Saturn Hotdog Super Calculator</Link>
                </div>
            <Menu
                className="app-menu"
                mode="horizontal"
                selectedKeys={[this.props.location.pathname]}
                style={{ lineHeight: '64px' }} >
                {menuItems}
            </Menu>
            </div>
            </Header>
        );
    }
}

function UserProfileDropdownMenu(props) {
    const dropdownMenu = (
        <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
            <Menu.Item key="user-info" className="dropdown-item" disabled>
                <div className="username-info">
                    @{props.currentUser.username}
                </div>
            </Menu.Item>
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