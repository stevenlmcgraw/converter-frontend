import React from 'react';
import "bootswatch/dist/flatly/bootstrap.min.css";
//import './App.css';
import AppHeader from "./components/Layout/AppHeader";
import Landing from "./components/Layout/Landing";
import { Route, Switch, withRouter } from "react-router-dom";
import NotFound from "./components/Layout/NotFound";
import PoundMassToPoundForce from "./components/Conversions/PoundMassToPoundForce";
import QuadraticFormula from './components/Calculations/QuadraticFormula';
import Register from './components/SiteUser/Register';
import Login from './components/SiteUser/Login';
import ConvertLanding from './components/Layout/ConvertLanding';
import CalculateLanding from './components/Layout/CalculateLanding';
import { getCurrentUser } from './api_utility/ApiCalls';
import { Layout, notification } from 'antd';
import { ACCESS_TOKEN } from './constants';
import UserProfile from "./components/SiteUser/UserProfile";
import LoadingIndicator from './components/Utilities/LoadingIndicator';
import ResultHistoryLanding from './components/ResultHistory/ResultHistoryLanding';

const { Content } = Layout;

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
      top: 70,
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
    }).catch(() => {
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
      message: 'Saturn Hotdog Super Calculator',
      description: "Congratulations! You logged in."
    });
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  handleLogout = (redirectTo="/", 
  notificationType="success", 
  description="You did it - you're logged out.") => {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);

    notification[notificationType]({
      message: 'Saturn Hotdog Super Calculator',
      description: description
    });
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
      return (
        <Layout>
            <AppHeader 
              isAuthenticated={this.state.isAuthenticated}
              currentUser={this.state.currentUser}
              onLogout={this.handleLogout}
            />
              <Content className="container-fluid">
              <div>
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/convert" component={ConvertLanding} />
                <Route exact path="/calculate" component={CalculateLanding} />
                <Route exact path="/register" component={Register} />
                <Route path="/login" render={(props) => 
                  <Login onLogin={this.handleLogin} {...props} />}></Route>
                <Route path="/profile/:username"
                  render={(props) => 
                    <UserProfile isAuthenticated={this.state.isAuthenticated}
                          currentUser={this.state.currentUser}
                          {...props} />
                  }></Route>
                <Route path="/resultHistory"
                        render={(props) =>
                        <ResultHistoryLanding 
                          isAuthenticated={this.state.isAuthenticated}
                          currentUser={this.state.currentUser}
                          {...props} />
                        }></Route>
                <Route exact path="/quadraticFormula" 
                  render={(props) =>
                  <QuadraticFormula
                  isAuthenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  {...props} />
                  }></Route>
                <Route path="/poundmassToPoundforce" 
                  render={(props) => 
                  <PoundMassToPoundForce
                    isAuthenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    {...props} />
                  }></Route>
                
                <Route component={NotFound} />
              </Switch>
              </div>
              </Content>
      </Layout>
    );
  }
}

export default withRouter(App);
