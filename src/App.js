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
import Login from './components/SiteUser/Login';
import ConvertLanding from './components/Layout/ConvertLanding';
import CalculateLanding from './components/Layout/CalculateLanding';
import { getCurrentUser } from './api_utility/ApiCalls';
import { notification } from 'antd';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }

    notification.config({
      placement: 'topRight',
      top: 80,
      duration: 3
    });
  }

  loadCurrentUser = () => {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogin = () => {
    notification.success({
      message: 'Saturn Hotdog Calculator',
      description: "Congratulations! You logged in."
    });
    this.loadCurrentUser();
    this.props.history.push("/");
  }

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
                <Route exact path="/convert" component={ConvertLanding} />
                <Route exact path="/calculate" component={CalculateLanding} />
                <Route exact path="/register" component={Register} />
                <Route path="/login" render={(props) => 
                  <Login onLogin={this.handleLogin} {...props}/>}></Route>
                <Route exact path="/quadraticFormula" component={QuadraticFormula} />
                <Route exact path="/poundmassToPoundforce" component={PoundMassToPoundForce} />
                
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
