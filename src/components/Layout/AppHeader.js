import React, { Suspense, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { PropTypes } from 'prop-types';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, 
    Nav, Dropdown, DropdownToggle, 
    DropdownMenu, DropdownItem, ListGroup } from 'reactstrap';
import { notification } from 'antd';
import { getFormulas } from '../../api_utility/ApiCalls';
import "bootswatch/dist/flatly/bootstrap.min.css";
import './AppHeader.css';

const FormulaSearch = React.lazy(() => import('./FormulaSearch'));

// You can destructure your props like this
const AppHeader = ({ isAuthenticated, currentUser, onLogout }) =>  {

    const [ state, setState ] = useState({
        showProfileDropdown: false,
        searchFormulas: [],
        groupedList: []
    })

    // this is the hooks way to do what componentDidMount() used to do
    useEffect(() => {

        let componentIsMounted = true; 

        const loadFormulasForSearch = async () => {

            await getFormulas()
            .then(response => {
                if(response.status !== 200 && componentIsMounted) {
                    setState(s => ({
                        ...s,
                        searchFormulas: []
                    }));
                } else if(componentIsMounted) {
                    setState(s => ({
                        ...s,
                        searchFormulas: response._embedded.formulas
                    }));
                }
            }).catch(error => {
                notification.error({
                    message: 'Saturn Hotdog Super Calculator',
                    description: 'Whoopsies. Something went wrong.' || error.message
                }) ;
            });
        }

        loadFormulasForSearch();
        
        return () => {
            componentIsMounted = false;
        }

    }, [])

    // this is the hooks way to do what componentDidUpdate used to do
    useEffect(() => {
        if(state.searchFormulas.length > 0 &
            state.groupedList.length === 0) {
                assembleSuggestionsByCategory();
            }
    })

    const handleLogout = () => {
        onLogout();
    }

    const toggle = () => {
        setState({
            ...state,
            showProfileDropdown: !state.showProfileDropdown
        });
    }



    const assembleSuggestionsByCategory = () => {

        let tempArray = [];
        let formulasList = [];
        formulasList = state.searchFormulas;
        const titles = 
        [...new Set(formulasList
            .map(formula => formula.category))];
        
        titles.forEach(element => {
            let category = {
                title: element,
                formulas: formulasList
                .filter(formula => 
                    formula.category.localeCompare(element))
                }
            tempArray.push(category);
        });

        setState({
            ...state, 
            groupedList: tempArray  
        });
    }


    let menuItems;
    let dropdownTitle = "";
    if(currentUser) {
        dropdownTitle = currentUser.username;
        menuItems = [             
        <DropdownItem key="item1" className="navbar-dropdown-item text-center">
            <Link  
            to={`/profile/${currentUser.username}`}>Profile</Link>
        </DropdownItem>,
        <DropdownItem key="item2" className="navbar-dropdown-item text-center">
            <Link  
            to="/resultHistory">Result History</Link>
        </DropdownItem>,
        <DropdownItem key="item3" onClick={handleLogout} className="navbar-dropdown-item text-center">
            <Link to="/">Logout!</Link>
        </DropdownItem>
        ];
    }

    else {
        dropdownTitle = "Login/Register";
        menuItems = [
            <DropdownItem key="item4" className="navbar-dropdown-item text-center" >
                <Link to="/login">Login!</Link>
            </DropdownItem>,
            <DropdownItem key="item5" className="navbar-dropdown-item text-center" >
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
        <Collapse isOpen={state.showProfileDropdown} navbar className="dropdown-menu-right">
            <Nav navbar right className="dropdown-menu-right">
            <Dropdown isOpen={state.showProfileDropdown} 
            toggle={toggle}
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
            searchFormulas={state.searchFormulas}
            groupedList={state.groupedList}
            />
        </ListGroup>
        </Suspense>
        </Navbar>
        </div>
    );
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