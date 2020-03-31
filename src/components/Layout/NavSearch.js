import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { PropTypes } from 'prop-types';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, 
    Nav, NavItem, NavLink, Dropdown, DropdownToggle, 
    DropdownMenu, DropdownItem, UncontrolledDropdown, FormGroup, Input, Label } from 'reactstrap';
import "bootswatch/dist/flatly/bootstrap.min.css";

class NavSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered = [],
            showFiltered: false
        }
    }

    componentDidMount() {
        this.setState({
            filtered: this.props.formulas
        })
    }

    handleInput = (event) => {
        let currentList = this.props.formulas;
        let newList = [];

        if(event.target.value !== "") {
            newList = currentList.filter(formula => {
                const lowerCase = formula.displayName.toLowerCase();
                const search = event.target.value.toLowerCase();
                return lowerCase.includes(search);
            });
        }
        else {
            newList = this.props.formulas;
        }

        this.setState({
            filtered: newList
        })
    }


}