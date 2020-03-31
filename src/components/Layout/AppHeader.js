import React, { Suspense } from "react";
import { Link, withRouter } from "react-router-dom";
import { PropTypes } from 'prop-types';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, 
    Nav, Dropdown, DropdownToggle, 
    DropdownMenu, DropdownItem, FormGroup, ListGroup } from 'reactstrap';
import { notification } from 'antd';
import { getFormulas } from '../../api_utility/ApiCalls';
import "bootswatch/dist/flatly/bootstrap.min.css";
import './AppHeader.css';

const FormulaSearch = React.lazy(() => import('./FormulaSearch'));

class AppHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showProfileDropdown: false,
            searchFormulas: [],
            groupedList: []
        };
    }

    componentDidMount() {
        this.loadFormulasForSearch();
    }

    componentDidUpdate(prevState) {
        if(this.state.searchFormulas.length > 0 &
            this.state.groupedList.length === 0) {
                this.assembleSuggestionsByCategory();
            }
    }

    handleLogout = () => {
        this.props.onLogout();
    }

    toggle = () => {
        this.setState({
            showProfileDropdown: !this.state.showProfileDropdown
        });
    }

    loadFormulasForSearch = async () => {

        await getFormulas()
        .then(response => {
            if(response.status !== 200) {
                this.setState({
                    formulas: []
                });
            }
            this.setState({
                searchFormulas: response._embedded.formulas
            });
        }).catch(error => {
            notification.error({
                message: 'Saturn Hotdog Super Calculator',
                description: 'Whoopsies. Something went wrong.' || error.message
            }) ;
        });
    }

    assembleSuggestionsByCategory = () => {

        let tempArray = [];
        let groupedByTitle = {};
        let formulasList = [];
        formulasList = this.state.searchFormulas;
        const titles = 
        [...new Set(formulasList
            .map(formula => formula.category))];
        
        groupedByTitle = titles.forEach(element => {
            let category = {
                title: element,
                formulas: formulasList
                .filter(formula => 
                    formula.category.localeCompare(element))
                }
            tempArray.push(category);
        });

        this.setState({
            groupedList: tempArray  
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
            <DropdownItem className="navbar-dropdown-item text-center">
                <Link  
                to="/resultHistory">Result History</Link>
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
            <Suspense fallback={null}>
            <ListGroup>
            <FormulaSearch 
                searchFormulas={this.state.searchFormulas}
                groupedList={this.state.groupedList}
                />
            </ListGroup>
            </Suspense>
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