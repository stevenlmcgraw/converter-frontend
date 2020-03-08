import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/Layout/Header";
import Landing from "./components/Layout/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./components/Layout/NotFound";
import { Provider } from "react-redux";
import store from "./store";
import PoundMassToPoundForce from "./components/Conversions/PoundMassToPoundForce";
import QuadraticFormula from './components/Calculations/QuadraticFormula';
import Register from './components/SiteUser/Register';

class App extends React.Component {


  render() {

      return (
        <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <div className="container">
              {
                //The <Switch> will iterate over its children elements (the routes) and only render the first one that matches the current pathname.
                /*
              if you dont put switch, it will all render together inclusively
              */
              }
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/quadraticFormula" component={QuadraticFormula} />
                <Route exact path="/poundmassToPoundforce" component={PoundMassToPoundForce} />
                <Route exact path="/register" component={Register} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
