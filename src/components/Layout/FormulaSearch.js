import React from 'react';
import Autosuggest from 'react-autosuggest';
import { Link, withRouter } from "react-router-dom";
import { PropTypes } from 'prop-types';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, 
    Nav, NavItem, NavLink, Dropdown, DropdownToggle, 
    DropdownMenu, DropdownItem, UncontrolledDropdown, FormGroup, Input, Label } from 'reactstrap';
import "bootswatch/dist/flatly/bootstrap.min.css";

class FormulaSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: [],
            groupedList: []
        }
    }

    // componentDidMount() {
    //     console.log('FormulaSearch didMount()');
    //     this.assembleSuggestionsByCategory();
    // }

    componentDidUpdate(prevState, prevProps) {
        console.log('FormulaSearch didUpdate()');
        // if(this.state.groupedList !== prevState.groupedList) {
        //     this.assembleSuggestionsByCategory();
        // }
        if(this.props.formulas !== prevProps.formulas) {
            this.assembleSuggestionsByCategory();
        }
        // if(this.state.groupedList === undefined) {
        //     this.assembleSuggestionsByCategory();
        // }

        // if(this.state.groupedList !== undefined && 
        //     this.state.groupedList.length === 0) {
        //     this.assembleSuggestionsByCategory();
        // }
    }

    assembleSuggestionsByCategory = () => {
        // let category = {
        //     title: '',
        //     formulas: []
        // };

        let tempArray = [];
        let groupedByTitle = {};

        const titles = 
        [...new Set(this.props.formulas
            .map(formula => formula.category))];
        
        groupedByTitle = titles.forEach(element => {
            let category = {
                title: element,
                formulas: this.props.formulas
                .filter(formula => 
                    formula.displayName === element)
            }
            tempArray.push(groupedByTitle);
            console.log('Inside assemble');
            console.log(category);
        });

        console.log('assemble()');
        console.log(tempArray);

        // this.setState({
        //     groupedList: tempArray  
        // });  
    }

    handleInput = (event, {newValue, method}) => {
        this.setState({
            value: newValue
        });
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: this.getSuggestions(value)
        });
      }
    
      onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
      }

      escapeRegexCharacters = (str) => {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }

      getSuggestions = (value) => {
        const escapedValue = this.escapeRegexCharacters(value.trim());
        
        if (escapedValue === '') {
          return [];
        }
      
        const regex = new RegExp('^' + escapedValue, 'i');
      
        return this.state.groupedList
          .map(section => {
            return {
              title: section.title,
              formulas: section.formulas.filter(formula => regex.test(formula.displayName))
            };
          })
          .filter(section => section.formulas.length > 0);
      }

      getSuggestionValue = (suggestion) => {
        return suggestion.displayName;
      }

      renderSuggestion = (suggestion) => {
        return (
          <Link
            to={`${suggestion.FormulaUrl}`}
          >{suggestion.displayName}</Link>
        );
      }

      renderSectionTitle = (section) => {
        return (
          <strong>{section.title}</strong>
        );
      }

      getSectionSuggestions = (section) => {
        return section.formulas;
      }

      render() {
        console.log('FormulaSearch');
        console.log(this.state.groupedList);
        console.log(this.props.formulas);

        const { value, suggestions } = this.state;
        const inputProps = {
          placeholder: "Search Formulas",
          value,
          onChange: this.handleInput
        };
    
        return (
        <React.Fragment>
          <Autosuggest 
            multiSection={true}
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            renderSectionTitle={this.renderSectionTitle}
            getSectionSuggestions={this.getSectionSuggestions}
            inputProps={inputProps} />
        </React.Fragment>
        );
      }
}

export default withRouter(FormulaSearch);