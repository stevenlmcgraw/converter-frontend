import React from 'react';
import Autosuggest from 'react-autosuggest';
import { Link, withRouter } from "react-router-dom";
import { ListGroupItem } from 'reactstrap';
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
      
        return this.props.groupedList
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
        console.log(suggestion.formulaUrl);
        return (
          <ListGroupItem>
          <Link
            to={`${suggestion.formulaUrl}`}
          >{suggestion.displayName}</Link>
          </ListGroupItem>
        );
      }

      renderSectionTitle = (section) => {
        return (
          <strong className="text-light">{section.title}</strong>
        );
      }

      getSectionSuggestions = (section) => {
        return section.formulas;
      }

      render() {
        console.log('FormulaSearch');
        console.log(this.props.groupedList);
        console.log(this.props.searchFormulas);

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